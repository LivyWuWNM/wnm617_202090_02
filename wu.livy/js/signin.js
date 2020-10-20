

const makeWarning = (target,message) => {
	$(target).addClass("active")
		.find(".message").html(message);
	setTimeout(()=>{
		$(target).removeClass("active")
	},2000);
}


const checkSigninForm = () => {
	let user = $("#signin-username").val()
	let pass = $("#signin-password").val()

	console.log(user,pass)
	if(user=="" || pass=="") {
		makeWarning("#warning-modal","Type a Username and Password");
		return;
	}

	if(user == 'user' && pass == 'ghost') {
		console.log('success');
		sessionStorage.userId = 3;
		$("#signin-form")[0].reset();
	}
	else {
		console.log('failure');
		sessionStorage.removeItem('userId');

		//if user log in fail, do something 
	}

	checkUserId();
}


const checkUserId = () => {
	let p = ['#signin-page', '#signup-page', ''];

	if(sessionStorage.userId === undefined) {
		if(!p.some(o=>window.location.hash===o))
			$.mobile.navigate("#signin-page");
	}
	else {
		if(p.some(o=>window.location.hash===o))
			$.mobile.navigate("#recent-page")
	}
}