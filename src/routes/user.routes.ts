// path: api/users

import { Router } from 'express';
import { create, getAll, getById, getByName } from '../controllers/user.controller';

import { check } from 'express-validator';
import fieldValidator from '../middlewares/fieldValidator.middleware';

const router = Router();

router.post('/', [
	check('name', 'El campo nombre es requerido').notEmpty(),
	check('last_name', 'El campo apellido es requerido').notEmpty(),
	check('email', 'El campo email no es válido').isEmail(),
	check('age', 'El campo edad esta inválido').isInt(),
	check('password', 'La contraseña es requerida').notEmpty(),
	fieldValidator
], create);

router.get('/', getAll);
router.get('/:id', getById);
router.get('/search/:name', getByName) // api/users/search/UNNOMBRE
export default router;