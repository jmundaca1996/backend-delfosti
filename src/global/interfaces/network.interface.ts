import { Response } from "express";

export interface NetworkResponse {
	message: string;
	res: Response;
	data?: any;
	error?: any;
	status?: number;
}