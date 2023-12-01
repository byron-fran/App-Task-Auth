// import {createSlice, PayloadAction} from '@reduxjs/toolkit';


// interface LoginState {
//     isLoggedIn : boolean,
//     email : string,
//     password : string
// }


// const initialState : LoginState = {
//     isLoggedIn : false,
//     email : '',
//     password : ''
// };


// const LoginSlice = createSlice({
//     name : 'login',
//     initialState,
//     reducers : {
//         login : (state, action : PayloadAction<LoginState>) => {
//             state.email = action.payload.email;
//             state.password = action.payload.password;
//             state.isLoggedIn = true;
//          }  
//     }
// })