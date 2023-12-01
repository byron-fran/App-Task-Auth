import { User } from "../interfaces/User";
import axios, {AxiosError} from "axios";
import { createUser } from "./slices/UserSlice";
import { AnyAction, Dispatch } from "redux";
import { setErrors } from "./slices/ErrorSlices";

export  const postUser = (user : User) => {

    return async (dispatch  : Dispatch<AnyAction>) => {
        try {
            const url = `http://localhost:4000/api/user`;
            const {data} = await axios.post(url, user);
            console.log(data);
            dispatch(createUser(data));
        } catch (error : unknown ) {
            if(error instanceof AxiosError) {
                console.log(error.response);
               dispatch(setErrors(error.response?.data.error));
            }
      
        }
        // console.log(data);
        //dispatch(createUser(data));
    }

}