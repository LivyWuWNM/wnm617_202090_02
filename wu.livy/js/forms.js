const checkSignupForm = () => {
	let username = $("#signup-username").val();
	let email = $("#signup-email").val();
	let password = $("#signup-password").val();
	let passwordconfirm = $("#signup-password-confirm").val();

	if(password!=passwordconfirm) {
		throw "Passwords don't match";
	}
	else {
		query({type:'insert_user',params:[username,email,password]})
		.then(d=>{
			if(d.error) {
				throw d.error;
			}
			console.log(d.id)
			$.mobile.navigate("#signin-page");
		})
	}

}



const checkUserEditForm = () => {
	let username = $("user-edit-username").val();
	let name = $("user-edit-name").val();
	let email = $("user-edit-email").val();

	query({
		type:'update_user',
		params:[username,name,email,sessionStorage.userId]})
	.then(d=>{
		if(d.error) {
			throw d.error;
		}
		window.history.go(-2);
	})

}



const checkGhostAddForm = () => {
	let name = $("#ghost-add-name").val();
	let type = $("#ghost-add-type").val();
	let color = $("#ghost-add-color").val();
	let description = $("#ghost-add-description").val();

	query({
		type:'insert_ghost',
		params:[sessionStorage.userId,name,type,color,description]})
	.then(d=>{
		if(d.error) {
			throw d.error;
		}
		console.log(d.id)

		$("#ghost-add-form")[0].reset();

		sessionStorage.ghostId = d.id;
		$.mobile.navigate($("#ghost-add-destination").val());
	})
}



const checkGhostEditForm = () => {
	let name = $("#ghost-edit-name").val();
	let type = $("#ghost-edit-type").val();
	let color = $("#ghost-edit-color").val();
	let description = $("#ghost-edit-description").val();

	query({
		type:'update_ghost',
		params:[name,type,color,description,sessionStorage.ghostId]})
	.then(d=>{
		if(d.error) {
			throw d.error;
		}
		window.history.back();
	})
}



const checkGhostDelete = id => {
	
	query({
		type:'delete_ghost',
		params:[id]
	})
	.then(d=>{
		if(d.error) {
			throw d.error;
		}
		window.history.back();
	});
}




const checkLocationAddForm = () => {
	let lat = $("#location-add-lat").val();
	let lng = $("#location-add-lng").val();
	let description = $("#location-add-description").val();

	query({
		type:'insert_location',
		params:[sessionStorage.ghostId,lat,lng,description]})
	.then(d=>{
		if(d.error) {
			throw d.error;
		}
		

		$("#location-add-form")[0].reset();
		window.history.go(-2);
	})
}


