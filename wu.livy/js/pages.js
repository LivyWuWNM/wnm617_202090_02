
const RecentPage = async() => {
	
	let d = await query({
		type:'recent_locations',
		params:[sessionStorage.userId]
	});

	console.log(d)

	let valid_ghosts = d.result.reduce((r,o)=>{
		o.icon = o.img;
		if(o.lat && o.lng) r.push(o);
		return r;
	},[])


	let map_el = await makeMap("#recen-page .map");

	makeMarkers(map_el,valid_ghosts);

	map_el.data("markers").forEach((o,i)=>{
		o.addListener("click",function(){

			/*
			sessionStorage.ghostId = valid_ghosts[i].ghost_id;
			$.mobile.navigate("#ghost-profile-page");
			*/

			$("#recent-ghost-modal").addClass("active");
			$("#recent-ghost-modal .modal-body")
				.html(makeGhostPopup(valid_ghosts[i]))
		})
	})
}


const ListPage = async() => {
	let d = await query({
		type:'ghosts_by_user_id',
		params:[sessionStorage.userId]
	});

	console.log(d)

	$("#list-page .ghostlist")
		.html(d.result.length?makeGhostList(d.result):'Hey,add a ghost.');
}

const UserProfilePage = async() => {
	let d = await query({
		type:'user_by_id',
		params:[sessionStorage.userId]
	});

	console.log(d)

	$("#user-profile-page .profile")
		.html(makeUserProfile(d.result));
}
const UserEditPage = async() => {
	query({
		type:'user_by_id',
		params:[sessionStorage.userId]
	}).then(d=>{
		console.log(d)

		$("#user-edit-form")
			.html(makeUserEditForm(d.result[0]));
	});
}




const GhostProfilePage = async() => {
	query({
		type:'ghost_by_id',
		params:[sessionStorage.ghostId]
	}).then(d=>{

		console.log(d)

		$("#ghost-profile-page .profile")
			.html(makeGhostProfile(d.result));
	});

	query({
		type:'locations_by_ghost_id',
		params:[sessionStorage.ghostId]
	}).then(d=>{
		makeMap("#ghost-profile-page .map").then(map_el=>{
			makeMarkers(map_el,d.result);
		})
	})
}
const GhostEditPage = async() => {
	query({
		type:'ghost_by_id',
		params:[sessionStorage.animalId]
	}).then(d=>{
		console.log(d)

		$("#ghost-edit-form")
			.html(makeGhostEditForm(d.result[0]));
	});
}



const LocationAddPage = async() => {
	let map_el = await makeMap("#location-add-page .map");
	makeMarkers(map_el,[]);

	let map = map_el.data("map");

	map.addListener("click",function(e){
		console.log(e, map.getCenter())

		let posFromClick = {
			lat:e.latLng.lat(),
			lng:e.latLng.lng(),
			icon:"image/marker.svg"
		};
		let posFromCenter = {
			lat:map.getCneter().lat(),
			lng:map.getCenter().lng(),
			icon:"image/marker.svg"
		};

		$("#location-add-lat").val(posFromClick.lat)
		$("#location-add-lng").val(posFromClick.lng)

		makeMarkers(map_el,[posFromClick])
	})
}