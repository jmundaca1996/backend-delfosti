import { Response, Request } from 'express';
import { Product } from '../global/interfaces/Product.interface';
import { networkError, networkSuccess, serverError } from '../middlewares/response.middleware';
import ProductModel from '../models/Product.model';
import slug from 'slug';

const getAll = async (_: Request, res: Response) => {
	try {
		const products = await ProductModel.find();
		networkSuccess({res, status: 201, message: 'Lista de productos', data: products})
	} catch (error) {
		serverError({res, message: 'Ha ocurrido un error', error});
	}
}

const create = async (req: Request, res: Response) => {
	try {
		const { name , category, brand } = req.body;

		const productData : Product = {
			name,
			category : {
				name : category,
				slug : slug(category)
			},
			brand : {
				name : brand,
				slug : slug(brand)
			},
			status : true,
			slug : slug(name)
		}
		const product = new ProductModel(productData);
		await product.save();
		
		networkSuccess({res, status: 201, message: 'Producto creado correctamente', data: product})

	} catch (error) {
		console.error(error)
		serverError({res, message: 'Ha ocurrido un error', error})
	}
}

const getById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const product = await ProductModel.findById(id);

		return product ? networkSuccess({res, message: 'Producto encontrado', data: product}) : 
		networkError({res, status: 404, message: 'Producto no encontrado o no existe'})

	} catch (error) {
		serverError({res, message: 'Ha ocurrido un error', error})
	}
}

const update = async (req: Request, res: Response) => {
	try {
		const { _id, ...product } = req.body as Partial<Product>;
		// const productDb = await ProductModel.updateOne({_id}, {...product}).populate('category', 'name').populate('brand', 'name');
		// const productDb = await (await ProductModel.findByIdAndUpdate(_id, {...product}).populate('category', 'name')).populate('brand', 'name');
		const productDb = await ProductModel.findByIdAndUpdate(_id, {...product});

		return productDb ? networkSuccess({res, message: 'Producto actualizado'}) : 
		networkError({res, status: 404, message: 'Producto no encontrado'})

	} catch (error) {
		serverError({res, message: 'Ha ocurrido un error', error})
	}
}

export {
	create,
	getAll,
	getById,
	update
}