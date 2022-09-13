import { Request, Response } from 'express';
import { networkSuccess, serverError, networkError } from '../middlewares/response.middleware';
import bcrypt from 'bcryptjs';
import User from '../models/User.model';

const getAll = async (_: Request, res: Response) => {
	try {
		const users = await User.find(); // EN SQL: SELECT * FROM USERS 
		networkSuccess({res,message: 'Lista de usuarios obtenida', data: users})
		return;
	} catch (error) {
		serverError({res, message: 'Ha ocurrido un problema', error});
	}
};

const create = async (req: Request, res: Response) => {
	try {
		const checkEmail = await User.findOne({email: req.body.email});
		if(checkEmail){
			networkError({res, message: 'El email ya existe', status: 400, error: {} } );
			return;
		}
		const user = new User(req.body); 
		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync(req.body.password, salt);

		await user.save();
		networkSuccess({res,message: 'Usuario creado correctamente', status: 201, data: user});
		return;
	} catch (error) {
		console.error("user-controller-create", error)
		serverError({res, message: 'Ha ocurrido un problema', error});
	}
};

const getById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params; // --> const id = req.params.id
		/**
		 * En mongooose seria:
		 * find({_id: ObjectId($id)});
		 * 
		 * SQL:
		 * Select * from users where id = $id;
		 */
		const user = await User.findById(id);
		if(user){
			networkSuccess({res,message: 'Usuario creado correctamente', data: user}) 
			return;
		}else {
			networkError({res, message: 'El usuario no ha sido encontrado', status: 404});
		}
	} catch (error) {
		serverError({res, message: 'Ha ocurrido un problema', error});
	}
}

const getByName = async (req: Request, res: Response) => {
	try {
		const { name } = req.params;
		// const users = await User.findOne({name, age: 23}); // User.find({name: name, age: 23 }) // Select * from users where name = $name and age = 23
		const users = await User.findOne({name}); // User.find({name: name})
		if(users){
			networkSuccess({res,message: 'Usuario creado correctamente',data: users}) 
		}else {
			networkError({res, message: 'El usuario no ha sido encontrado', status: 404});
		}
	} catch (error) {
		serverError({res, message: 'Ha ocurrido un problema', error});
	}
}

export {
	getAll, create, getById, getByName
}