import { Date } from 'mongoose'

export interface Product {
	_id?: string;
	name: string;
	category: category; 
	brand: brand;
	slug : string;
	status : boolean;
	createAT?: Date; 
}

interface category {
	name : string;
	slug : string;
}

interface brand {
	name : string;
	slug : string;
}