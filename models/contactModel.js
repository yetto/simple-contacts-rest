const 	mongoose 	= require('mongoose'),		Schema   	= mongoose.Schema;/* ## ORGconst contactSchema = new Schema({	'name' : String,	'photo' : String,	'nickname' : String,	'company' : String,	'jobtitle' : String,	'home' : Number,	'email' : Array,	'mobile' : Number,	'address' : String,	'birthday' : String,	'notes' : String,	'owner' : String});END ORG ## */let contactSchema = new Schema({	name: {		type: String,		required: true,	},	// https://gist.github.com/aheckmann/2408370	// http://menge.io/2015/03/24/storing-small-images-in-mongodb/	photo: Buffer,	nicknamme: String,	company : String,	job_title: String,	home: Number,	email: Array,	mobile: Number,	phone: Number,	address: String,	birthday: String,	notes: String,	_users: [{ username : String, type : String, user_id: Schema.Types.ObjectId }]},{    timestamps: true});module.exports = mongoose.model('contact', contactSchema);