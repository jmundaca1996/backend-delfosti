import bcrypt from 'bcryptjs';
import { Response, Request } from 'express';
import generateJWT from '../global/utils/generateJWT.util';
import { networkError, networkSuccess, serverError } from '../middlewares/response.middleware';
import UserModel from '../models/User.model';

const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const userDb = await UserModel.findOne({email});

		if(!userDb){
			return networkError({res, message:'El usuario no existe', status:404});
		}

		const validPassword = bcrypt.compareSync(password, userDb.password);

		if( !validPassword ){
			return networkError({res, message:'Usuario o contraseña incorrectas'});
		}
		const token = await generateJWT(email);
		
		const { name, last_name } = userDb;

		networkSuccess({res,message: 'usuario logeado', data: {token, email, name, last_name} });
	} catch (error) {
		serverError({res,message: 'Ha ocurrido un error', error});
	}
};

export {
	login
}