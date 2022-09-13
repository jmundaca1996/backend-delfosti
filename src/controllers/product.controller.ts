import { Response, Request } from 'express';
import { Product } from '../global/interfaces/Product.interface';
// import { Product } from '../global/interfaces/Product.interface';
import { networkError, networkSuccess, serverError } from '../middlewares/response.middleware';
// import CategoryModel from '../models/Category.model';
import ProductModel from '../models/Product.model';

const getAll = async (_: Request, res: Response) => {
	try {
		const products = await ProductModel.find().populate('category', 'name').populate('brand', 'name');
		networkSuccess({res, status: 201, message: 'Lista de productos', data: products})
	} catch (error) {
		serverError({res, message: 'Ha ocurrido un error', error});
	}
}

const create = async (req: Request, res: Response) => {
	try {
		// // PARTE 1
		// await category.forEach( async (catId) => {
		// 	const category = await CategoryModel.findById(catId);
			
		// 	if(category){
		// 		categoriesFinded = categoriesFinded + 1
		// 	}
		// });
		
		// console.log({categoriesFinded, tamano: category.length});
		// if(categoriesFinded === category.length){
		// 	const product = new ProductModel(req.body);
		// 	await product.save();
			
		// 	networkSuccess({res, status: 201, message: 'Producto creado correctamente', data: product})
		// }else {
		// 	networkError({res, status: 404, message: 'No todas las categorias han sido encontradas'});
		// }

		const product = new ProductModel(req.body);
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
		const product = await ProductModel.findById(id).populate('category', 'name').populate('brand', 'name');

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