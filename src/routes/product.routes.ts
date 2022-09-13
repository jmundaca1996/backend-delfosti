// path: api/product

import { Router } from 'express';
import { create, getAll, getById, update } from '../controllers/product.controller';

import { check } from 'express-validator';
import fieldValidator from '../middlewares/fieldValidator.middleware';
//import validateJWT, { validateByRol } from '../middlewares/validateJWT.middelware';

const router = Router();

router.post('/', [
	//validateJWT,
	//validateByRol,
	check('name', 'El campo nombre es requerido').notEmpty(),
	check('category', 'El campo categoria es inválido').notEmpty(),
	check('brand', 'El campo marca es requerido').notEmpty(), 
	fieldValidator
], create);

router.get('/', getAll);
router.get('/:id', getById);

router.patch('/', update)

export default router;