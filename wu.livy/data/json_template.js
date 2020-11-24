//user template
[
	'{{repeat(10)}}',
	{
		id: '{{index(1)}}',
		name: '{{firstName()}} {{surname()}}',
		username: function(){
			return 'user' + this.id;
		},
		email: function(){
			return this.username + '@gmail.com';
		},
		password: 'md5(pass)',



		img: function(tags) {
			return 'https://via.placeholder.com/400/' +
				tags.integer(700,999) +
				'fff/?text=' +
				this.username;
		},
		date_create: '{{date(new Data(2020, 0, 1), new Date(),"YYYY-MM-dd hh:mm:ss")}}'
	}
]


//animal template
[
	'{{repeat(50)}}',
	{
		id: '{{index(1)}}',
		user_id: '{{integer(1,10)}}',

		name: '{{company()}}',


		type: '{{random("float","dark","psychic")}}',
		color: function(tags) {
			var colors = {
				"float":["white","orange","pink","blue"],
				"dark":["black","gray","red"],
				"psychic":["invisible","colorful","noise"]
			};
			var chosen_type = colors[this.type];
			var chosen_index = tags.integer(0,chosen_type.length-1);
			return chosen_type[chosen_index];
		},

		description: '{{lorem(3, "sentences")}}',

		img: function(tags) {
			return 'https://via.placeholder.com/400/' +
				tags.integer(700,999) +
				'/fff/?text=' +
				this.name;
		},
		date_create: '{{date(new Date(2020, 0, 1), new Date(), "YYYY-MM-dd hh:mm:ss")}}'
	}
]


//location template
[
	'{{repeat(250)}}',
	{
		id: '{{index(1)}}',
		ghost_id: '{{integer(1,50)}}',


		lat: '{{floating(37.795613,37.703208)}}',
		lng: '{{floating(-122.508764,-122.381666)}}',


		description: '{{lorem(3, "sentences")}}',

		photo: 'https://via.placeholder.com/400/',
		icon: 'https:via.placeholder.com/100/?text=ICON',

		date_create: '{{date(new Date(2020, 0, 1), new Date(), "YYYY-MM-dd hh:mm:ss")}}'
	} 
]