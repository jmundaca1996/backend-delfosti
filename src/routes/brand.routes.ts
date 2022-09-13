// path: api/brand

import { Router } from 'express';
import { create, getAll, getById } from '../controllers/brand.controller';

import { check } from 'express-validator';
import fieldValidator from '../middlewares/fieldValidator.middleware';

const router = Router();

router.post('/', [
	check('name', 'El campo nombre es requerido').notEmpty(),
	fieldValidator
], create);

router.get('/', getAll);
router.get('/:id', getById);

export default router;