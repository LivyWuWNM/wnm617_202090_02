$(()=>{

	checkUserId();

	$(document)


	.on("pagecontainerbeforeshow",function(e,ui){
		console.log(ui.toPage[0].id)

		switch(ui.toPage[0].id) {
			case 'recent-page': RecentPage(); break;
			case 'list-page': ListPage(); break;

			case 'user-profile-page': UserProfilePage(); break;
			case 'user-edit-page': UserEditPage(); break;
			case 'user-upload-page': UserUploadPage(); break;

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
	.on("submit","#list-search-form",function(e){
		e.preventDefault();
		checkSearchForm();
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
		//query({type:'delete-ghost',params:[$(this).data("id")]})
		//.mobile.navigate("ghost-profile-page");
		checkGhostDelete($(this).data("id"));
	})
	.on("click","js-user-upload",function(e){
		checkUserUpload();
	})


	.on("click",".filter",function(e){
		checkListFilter($(this).data());
	})
	.on("change",".image-uploader input",function(e){
		checkUpload(this.files[0])
		.then(d=>{
			console.log(d)
			$("#user-upload-image").val('uploads/'+d.result);
			$("#user-upload-page .image-uploader")
				.css({'background-image':`url('uploads/${d.result}')`})
			//makeUploaderImage(this,d.result,'uploads/')
			//makeUploaderImage({
			//	namespace:'user-upload',
			//	folder:'uploads/',
			//	name:d.result
			//})
		})
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