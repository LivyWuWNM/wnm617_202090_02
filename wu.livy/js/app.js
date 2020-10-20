$(()=>{

	checkUserId();

	$(document)

	.on("submit","#signin-form",function(e){
		e.preventDefault();
		checkSigninForm();
	})

	.on("click",".js-logout", function(e){
		sessionStorage.removeItem('userId');
		checkUserId();
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