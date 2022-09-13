import { Schema, SchemaTypes, model, Model } from 'mongoose';
import { Product } from '../global/interfaces/Product.interface';

const ProductSchema = new Schema<Product, Model<Product>>({
	name: {
		type: String,
		required: true
	},
	category: {
		name : { type : String },
		slug : { type : String }
	},
	brand: {
		name : { type : String },
		slug : { type : String }
	},
	slug: {
		type: String,
		required: true
	},
	status : {
		type : Boolean,
		required : true
	},
	createAT: {
		type: SchemaTypes.Date,
		default: Date.now()
	},
});

export default model('products', ProductSchema);