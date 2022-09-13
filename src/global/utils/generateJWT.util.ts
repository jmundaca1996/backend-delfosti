import jwt from 'jsonwebtoken';

const generateJWT = (uid: string) => {
	return new Promise((resolve, reject) => {
		const payload = { uid };
		jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '7d' }, (err, encoded) => {
			if(err){
				reject(err);
				return;
			}
			resolve(encoded);
			return;
		} );
	});
}

export default generateJWT;