import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { User } from '../../interfaces/User';

const initialState : User = {
    name : '',
    password : '',
    password_repeat : '',
    email : '',
    id : 0
};




const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        createUser : (state, action : PayloadAction<User>) => {
            state.name = action.payload.name;
            state.password = action.payload.password;
            state.password_repeat = action.payload.password_repeat;
            state.email = action.payload.email;
         }
    }
});



export const {createUser} = userSlice.actions;

export default userSlice.reducer;