

const makeGhostList = templater(o=>`
	<div class="ghostlist-item js-ghost-jump" data-id="${o.id}">
		<div class="ghostlist-image">
			<img src="${o.img}" alt="">
		</div>
		<div class="ghostlist-description">
			<div class="ghostlist-name">${o.name}</div>
			<div class="ghostlist-type"><strong>type</strong> ${o.type}</div>
			<div class="ghostlist-color"><strong>color</strong> ${o.color}</div>
		</div>
	</div>
`);


const makeUserProfile = templater(o=>`
	<div class="profile-image">
		<img src="${o.img}" alt="">
	</div>
	<div class="profile-body">
		<div class="profile-name">${o.name}</div>
		<div class="profile-email"><strong>Email</strong>: ${o.email}</div>
	</div>
	<p><a href="#settings-page">Settings</a></p>
`);

const makeGhostProfile = templater(o=>`
	<div class="profile-image">
		<img src="${o.img}" alt="">
	</div>
	<div class="profile-body">
		<div class="profile-name">${o.name}</div>
		<div class="profile-type"><strong>Type</strong>: ${o.type}</div>
		<div class="profile-color"><strong>Color</strong>: ${o.color}</div>
	</div>
	<div>
		<a href="#" class="js-ghost-delete" data-id="${o.id}">Delete</a>
	</div>
`);


const makeGhostPopup = o=>`
	<div class="display-flex">
	<div>
		<img src="${o.img}" alt="" style="width:100px;height:100px">
	</div>
	<div style="padding-left:1em">
		<div class="profile-name">${o.name}</div>
		<div><strong>Type</strong>: ${o.type}</div>
		<div><strong>Color</strong>: ${o.color}</div>
	</div>
	</div>
	<div>
	<a href="#" class="form-button js-ghost-jump" data-id="${o.ghost_id}">Visit</a>
	</div>
`;





const FormControl = ({namespace,name,displayname,type,placeholder,value}) => {
	return `<div class="form-control">
		<label for="${namespace}-${name}" class="form-label">${displayname}
		</label>
		<input id="${namespace}-${name}" type="${type}" class="form-input" data-role="none" placeholder="${placeholder}" value="${value}">
	</div>`;
}


const makeGhostProfileUpdateForm = o => `
	${FormControl({
		namespace:"ghost-edit",
		name:"name",
		displayname:"Name",
		type:"text",
		placeholder:"Type A Ghost Name",
		value:o.name
	})}
	${FormControl({
		namespace:"ghost-edit",
		name:"type",
		displayname:"Type",
		type:"text",
		placeholder:"Choose A Ghost Type",
		value:o.type
	})}
	${FormControl({
		namespace:"ghost-edit",
		name:"color",
		displayname:"Color",
		type:"text",
		placeholder:"Type Ghost Color",
		value:o.color
	})}
	<div class="form-control">
		<label for="ghost-edit-description" class="form-label">Description</label>
		<textarea id="ghost-edit-description" class="form-input" data-role="none" placeholder="Type ghost description">${o.description}</textarea>
	</div>
`;


const makeUserEditForm = o => `
	${FormControl({
		namespace:"user-edit",
		name:"username",
		displayname:"Username",
		type:"text",
		placeholder:"Type Your Username",
		value:o.username
	})}
	${FormControl({
		namespace:"user-edit",
		name:"name",
		displayname:"Full Name",
		type:"text",
		placeholder:"Type Your Full Name",
		value:o.name
	})}
	${FormControl({
		namespace:"user-edit",
		name:"email",
		displayname:"Email",
		type:"text",
		placeholder:"Type Your Email",
		value:o.email
	})}
	</form>
`;