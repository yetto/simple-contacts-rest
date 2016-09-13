const 	mongoose 	= require('mongoose'),
		Schema   	= mongoose.Schema;

/* ## ORG
const userSchema = new Schema({
	'username' : String,
	'password' : String,
	'admin' : Boolean,
	'location' : String,
	'meta' : String
});
END ORG ## */


const userSchema = new Schema({
	name: String,
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	admin: Boolean,
	location: String,
	meta: {
		age: Number,
		website: String
	},
	created_at: Date,
	updated_at: Date
});

module.exports = mongoose.model('user', userSchema);
