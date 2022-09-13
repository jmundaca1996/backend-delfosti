// api/auth
import { Router } from 'express';
import { check } from 'express-validator';
import { login } from '../controllers/auth.controller';
import fieldValidator from '../middlewares/fieldValidator.middleware';

const router = Router();

router.post('/', [
	check('email', 'El campo email es requerido').isEmail(),
	check('password', 'El campo password es requerido').notEmpty(),
	fieldValidator
],login); // api/auth
export default router;