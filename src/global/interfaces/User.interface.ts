import { Date } from "mongoose";

export interface User {
	_id?: string;
	name: string;
	last_name: string;
	email: string;
	password: string;
	age: number;
	birthday:Date;
	createAT: Date;
	rol: UserRoles;
}

export enum UserRoles {
	admin = 'admin',
	client = 'client',
	root = 'root'
}