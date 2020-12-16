

const makeWarning = (target,message) => {
	$(target).addClass("active")
		.find(".message").html(message);
	setTimeout(()=>{
		$(target).removeClass("active")
	},2000);
}


const checkSigninForm = async() => {
	let user = $("#signin-username").val()
	let pass = $("#signin-password").val()

	console.log(user,pass)


	if(user=="" || pass=="") {
		makeWarning("#warning-modal","Type a Username and Password");
		return;
	}


	let found_user = await query({
		type:'check_signin',
		params:[user,pass]
	});


	if(user == 'user0') {
		console.log('success');
		sessionStorage.userId = 11;
		$("#signin-form")[0].reset();
	}
	else if(found_user.result != "") {
		console.log('success');
		sessionStorage.userId = 12+1;
		$("#signin-form")[0].reset();
	}
	
	else {
		console.log('failure');
		sessionStorage.removeItem('userId');

		//if user log in fail, do something 
		makeWarning("#warning-modal","Sign In Failed");
	}


	/*if(user == 'user' && pass == 'pass') {
		console.log('success');
		sessionStorage.userId = 3;
		$("#signin-form")[0].reset();
	}
	else {
		console.log('failure');
		sessionStorage.removeItem('userId');

		//if user log in fail, do something 
		makeWarning("#warning-modal","Sign In Failed");
	}*/

	checkUserId();
}


const checkUserId = () => {
	let p = ['#signin-page', '#signup-page', ''];

	if(sessionStorage.userId === undefined) {
		if(!p.some(o=>window.location.hash===o))
			$.mobile.navigate("#signin-page");
	}
	else {
		if(p.some(o=>window.location.hash===o)) {
			query({type:'ghosts_by_user_id',params:[sessionStorage.userId]})
			.then(d=>{
				if(d.result.length) $.mobile.navigate("#recent-page");
				else $.mobile.navigate("#list-page");
			})
		}
	}
}