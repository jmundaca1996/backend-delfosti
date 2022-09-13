import mongoose from 'mongoose';

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.DB_CONNECTION);
		console.log("Database Successfully connected!");
	} catch (error) {
		throw new Error('Error en la conexión a la base de datos!, contacte al administrador');
	}
};

export default dbConnection;