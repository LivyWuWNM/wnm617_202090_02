$(()=>{

	checkUserId();

	$(document)

	

	.on("pagecontainerbeforeshow",function(e,ui){
		console.log(ui.toPagep[0].id)


		switch(ui.toPage[0].id) {
			case 'recent-page': RecentPage(); break;
			case 'list-page': ListPage(); break;
			case 'user-profile-page': UserProfilePage(); break;
			case 'animal-profile-page': AnimalProfilePage(); break;
		}
	})

	.on("submit","#signin-form",function(e){
		e.preventDefault();
		checkSigninForm();
	})

	.on("click",".js-logout", function(e){
		sessionStorage.removeItem('userId');
		checkUserId();
	})

	.on("click",".js-animal-jump",function(e){
		sessionStorage.animalId = $(this).data("id");
		$.mobile.navigate("#animal-profile-page");
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