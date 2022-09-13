import { Date } from 'mongoose'

export interface Product {
	_id?: string;
	name: string;
	category: {}; 
	brand: {};
	slug : string;
	status : boolean;
	createAT: Date; 
}