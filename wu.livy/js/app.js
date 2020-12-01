$(()=>{

	console.dir($("#user-edit-form")[0])

	checkUserId();

	$(document)

	

	.on("pagecontainerbeforeshow",function(e,ui){
		console.log(ui.toPage[0].id)


		switch(ui.toPage[0].id) {
			case 'recent-page': RecentPage(); break;
			case 'list-page': ListPage(); break;

			case 'user-profile-page': UserProfilePage(); break;
			case 'user-edit-page': UserEditPage(); break;

			case 'ghost-profile-page': GhostProfilePage(); break;
			case 'ghost-edit-page': GhostEditPage(); break;

			case 'location-add-page': LocationAddPage(); break;
		}
	})

	.on("submit","#signin-form",function(e){
		e.preventDefault();
		checkSigninForm();
	})
	.on("submit","#signup-form",function(e){
		e.preventDefault();
		checkSignupForm();
	})



	.on("click",".js-ghost-add",function(e){
		checkGhostAddForm();
	})
	.on("click",".js-ghost-edit",function(e){
		checkGhostEditForm();
	})
	.on("click",".js-user-edit",function(e){
		checkUserEditForm();
	})
	.on("click",".js-location-add",function(e){
		checkLocationAddForm();
	})





	.on("click",".js-logout", function(e){
		sessionStorage.removeItem('userId');
		checkUserId();
	})

	.on("click",".js-ghost-jump",function(e){
		sessionStorage.ghostId = $(this).data("id");
		$.mobile.navigate("#ghost-profile-page");
	})

	.on("click",".js-location-jump",function(e){
		sessionStorage.ghostId = $(this).data("id");
		$.mobile.navigate("#location-profile-page");
	})
	.on("click",".js-ghost-delete",function(e){
		checkGhostDelete($(this).data("id"));
	})






	.on("click","[data-activate]",function(){
		let target = $(this).data('activate');
		$(target).addClass("active");
	})

	.on("click","[data-deactivate]",function(){
		let target = $(this).data('deactivate');
		$(target).removeClass("active");
	})

	.on("click","[data-toggle]",function(){
		let target = $(this).data('toggle');
		$(target).toggleClass("active");
	})
	;


	$("[data-template]").each(function(){
		let target = $(this).data("template");
		let template = $(target).html();
		$(this).html(template);
	})
})