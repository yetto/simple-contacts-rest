const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

let userSchema = new Schema({
	name: String,
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	perms: {
		type: Array,
		default: ["user:read","user:write"],
	},
	location: String,
	meta: {
		age: Number,
		website: String
	},
	_contacts: [{
		name: String,
		contact_id: {
			type: Schema.Types.ObjectId,
			ref: 'contact'
		}
	}]
}, {
	timestamps: true
});

module.exports = mongoose.model('user', userSchema);