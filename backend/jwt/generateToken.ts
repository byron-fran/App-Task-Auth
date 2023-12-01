import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateToken = (id : number)  => {
    return new Promise((resolve, reject) => {
        const payload = {id};
        //generate tokne
        jwt.sign(payload, process.env.SECRET_KEY!, {expiresIn : '24h'}, (err, token) => {
            if(err) reject('Token not generated');
            resolve(token);
        })
    })
}