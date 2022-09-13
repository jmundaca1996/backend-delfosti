import { NetworkResponse } from '../global/interfaces/network.interface';

const networkSuccess = ( { res,status, message, data }: NetworkResponse) => {
	res.status(status ?? 200).send({
		message,
		success: true,
		data
	});
}

const networkError = ( { res,status, message, error }: NetworkResponse) => {

	res.status(status ?? 400).send({
		message,
		success: false,
		error
	});
}

const serverError = ( { res,status, message, error }: NetworkResponse) => {
	res.status(status ?? 500).send({
		message,
		success: false,
		error
	});
}

export {
	networkSuccess, networkError, serverError
}