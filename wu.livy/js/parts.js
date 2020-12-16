

const drawGhostList = (a,empty_phrase='Hey, add a ghost.')=> {
	$("#list-page .ghostlist")
		.html(a.length?makeGhostList(a):empty_phrase);
} 



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
		<div class="floater right bottom">
			<a href="#user-upload-page"><img class="icon" src="image/pencil.png"></a>
		</div>
	</div>
	<div class="profile-body">
		<div class="profile-name">${o.name}</div>
		<div class="profile-email"><strong>Username</strong>: ${o.username}</div>
		<div class="profile-email"><strong>Email</strong>: ${o.email}</div>
	</div>
`);



const makeGhostProfile = templater(o=>`
	<div class="ghost-image">
		<img src="${o.img}" alt="">
	</div>
	<div class="ghost-body">
		<div class="ghost-name">${o.name}</div>
		<div class="ghost-type"><strong>${o.type}</strong></div>
		<div class="ghost-color"><strong>${o.color}</strong></div>
		<div class="ghost-description">${o.description}</div>
	

	</div>
	<div class="ghost-delete">
		<a href="#" class="js-ghost-delete" data-id="${o.id}">Delete</a>
	</div>

`);


const makeGhostPopup = o =>`
	<div class="display-flex">
	<div>
		<img src="${o.img}" alt="" style="border-radius:50%;width:100px;height:100px">
	</div>
	<div style="padding-left:1em">
		<div class="profile-name">${o.name}</div>
		<div><strong>Type</strong>: ${o.type}</div>
		<div><strong>Color</strong>: ${o.color}</div>
	</div>
	</div>
	<div>
	<a href="#" class="form-button js-ghost-jump" data-id="${o.ghost_id}" style="border-radius: 25px;background-color:#7f7d71">Info</a>
	</div>
`;


const FormControl = ({namespace,name,displayname,type,placeholder,value}) => {
	return `<div class="form-control">
		<label for="${namespace}-${name}" class="form-label">${displayname}
		</label>
		<input id="${namespace}-${name}" type="${type}" class="form-input" data-role="none" placeholder="${placeholder}" value="${value}">
	</div>`;
}


const makeGhostEditForm = o => `

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
		placeholder:"Type A Ghost Type",
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
	
`;


const filterList = (ghosts,type) => {
	let a = [...(new Set(ghosts.map(o=>o[type])))];
	return templater(o=>`<div class="filter" data-field="${type}" data-value="${o}">${o[0].toUpperCase()+o.substr(1)}</div>`)(a);
}

const makeFilterList = (ghosts) => {
	return`
	<div class="filter" data-field="type" data-value="all">All</div> |
	${filterList(ghosts, 'type')} |
	${filterList(ghosts, 'color')}
	`;
}



const makeUploaderImage = ({namespace,folder,name}) => {
	$(`#${namespace}-image`).val(folder+name);
	$(`#${namespace}-page .image-uploader`)
		.css({'background-image':`url('${folder+name}')`})
}