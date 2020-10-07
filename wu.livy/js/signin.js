

const checkSigninForm = () => {
	let user = $("#signin-username").val()
	let pass = $("#signin-password").val()

	if(user == 'tracker' && pass == 'ghost') {
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