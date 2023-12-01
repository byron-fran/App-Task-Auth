import * as z from 'zod';

export const registerSchema= z.object({
    name: z.string({
        required_error: 'Name cannot be empty'
    }),
    email: z.string({
        required_error : 'Email cannot be empty'
    }).email({
        message : 'Email is not valid'
    }),
    password : z.string({
        required_error: 'Password cannot be empty'
    }),

});