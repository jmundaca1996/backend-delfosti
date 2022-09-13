import { User } from './../global/interfaces/User.interface';
import { Schema, SchemaTypes, model, Model } from 'mongoose';

const UserSchema = new Schema<User, Model<User>>({
	name: {
		type: String,
		required: true
	},
	last_name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {       
		type: String,
		required: true,
	},
	rol: {       
		type: String,
		required: true,
	},
	age: {
		type: SchemaTypes.Number,
		required: true,
		max: 128,
		min: 0
	},
	birthday: {
		type: SchemaTypes.Date,
	},
	createAT: {
		type: SchemaTypes.Date,
		default: Date.now(),
	}
})

export default model('users', UserSchema);