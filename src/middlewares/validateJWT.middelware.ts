import { NextFunction, Request, Response } from 'express';
import { networkError, serverError } from './response.middleware';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User.model';
import { UserRoles } from '../global/interfaces/User.interface';

const validateJWT = (req: Request, res: Response, next: NextFunction) => {
	try {
		const { authorization } = req.headers;
		if(!authorization){
			return networkError({
				res, status: 401, 
				message: 'Faltan credenciales o usuario no conocido, pillin no me vas a hackear'
			});
		}

		const { uid }: any = jwt.verify(authorization, process.env.JWT_KEY)
		
		//@ts-ignore
		req.uid = uid;

		next();
		
	} catch (error) {
		serverError({res, message: 'Ha ocurrido un error', error});
	}
}

const validateByRol = async (req: Request, res: Response, next: NextFunction) => {
	try {
		//@ts-ignore
		const { uid } = req;

		const user = await UserModel.findOne({email: uid});
		const roles = [ UserRoles.admin, UserRoles.root ];

		if(roles.includes(user.rol)){
			return next();
		}

		networkError({status: 403, message: 'Pillin no eres ni root ni admin', res})

	} catch (error) {
		serverError({res, message: 'Ha ocurrido un error', error});
	}
}

export default validateJWT;
export { validateByRol }