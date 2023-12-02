import { request, response } from 'express'
import User from '../models/User'
import { User as UserInterface } from '../interfaces/User';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { generateToken } from '../jwt/generateToken';
import dotenv from 'dotenv';
dotenv.config();


const register = async (req = request, res = response) => {
    const { password, email, } : UserInterface = req.body;
    try {

        //check if user already exists
        const userExists = await User.findOne({where : { email }});
        if(userExists){
            res.clearCookie('token', {secure : true,})
            return res.status(400).json({ message: 'User already exists' })
        };
        //hash password
        const passwordHash = await bcryptjs.hash(password, 10);
        // const passwordRepeaitHash = await bcryptjs.hash(password_repeat, 10);
        //verify password match with hashed password
    
        const user = await User.create({...req.body, password : passwordHash} );
        // verify password match with hashed password
  
        //generate token
        if(!user) return res.status(400).json({ message: 'User not created' });

        // const token = jwt.sign({id : user.id}, process.env.SECRET_KEY!, {expiresIn : '24h'});
        // res.cookie('token', token, {httpOnly : true, maxAge : 24 * 60 * 60 * 1000, secure : true,}, );
        const token = await generateToken(user.id);
        res.cookie('token', token, {httpOnly : true, maxAge : 24 * 60 * 60 * 1000, secure : true,}, );

          // Exclude sensitive data from response

        return res.status(201).json(user)
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(400).json({
                message: error.message
            })
        };
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
};

const login = async (req =request, res = response) => {
    const {email, password} : UserInterface= req.body;
  
    try {
        //check if user exists
        const userFound = await User.findOne({where : {email}, });
        if(!userFound) return res.status(400).json({message : 'User not found'});
        //check password
        const matchPassword = await bcryptjs.compare(password, userFound.password);
        if(!matchPassword) return res.status(400).json({message : 'Incorrect password'});
        //generate token
        const token = await generateToken(userFound.id);
        // return a cookie
        res.cookie('token', token, {httpOnly : true, maxAge : 24 * 60 * 60 * 1000, secure : true,}, );
        return res.status(200).json(userFound);
        
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(400).json({
                message: error.message
            })
        };
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
}

const logout = async (req = request, res = response) => {   
    try {
        //clear cookie and logout
        res.clearCookie('token', {secure : true,},);
        return res.status(200).json({message : 'User logged out successfully'});

    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(400).json({
                message: error.message
            })
        };
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
};

const verifyToken = async (req = request, res = response) => {
    const {token} = req.cookies;
   
    try {
        //check if token exists
        if(!token) return res.status(404).json({message : 'No token provided'});
        const user = jwt.verify(token, process.env.SECRET_KEY!) as UserInterface;
        //check if user exists
        const userFound = await User.findOne({where : {id : user.id}}, );
        if(!userFound) return res.status(401).json({message : 'Unauthorized'});
        return res.status(200).json({message : 'Authorized', userFound});

    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(400).json({
                message: error.message
            })
        };
        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
}
export {
    register,
    login,
    logout,
    verifyToken
}