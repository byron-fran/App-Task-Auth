
import Cookie from 'js-cookie';
import { registerUser, loginUser, tokenVerify } from '../api/auth';

import { createContext, useState, useEffect, ReactNode, SetStateAction, Dispatch } from 'react';
import { User } from '../interfaces/User';
import { AxiosError } from 'axios';

export type AuthContextType = {
  user: User;
  resfreshData: boolean;
  isAuthenticathed : boolean;
  setIsAuthenticathed : Dispatch<SetStateAction<boolean>>;
  setRefreshData: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<User>>;
  SignUp: (newUser: User) => void
  Login : (user : User) => void;
  LogOut : () => void;
  errorRegister : string;
  setErrorRegister : Dispatch<SetStateAction<string>>;
  errorLogin : string;
  setErrorLogin  : Dispatch<SetStateAction<string>>
};

const defaultContextValue: AuthContextType = {
  user: {
    name: '',
    email: '',
    password: ''
  },
  resfreshData: false,
  setRefreshData: () => { },
  setUser: () => { },
  SignUp: () => { },
  Login: () => {},
  LogOut : () => {},
  setIsAuthenticathed : () => {},
  isAuthenticathed : false,
  errorLogin : '',
  setErrorLogin  : () => {},
  errorRegister : '',
  setErrorRegister : () => {}
}

export const AuthContext = createContext<AuthContextType>(defaultContextValue);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>(defaultContextValue.user);
  const [resfreshData, setRefreshData] = useState<boolean>(defaultContextValue.resfreshData)
  const [isAuthenticathed, setIsAuthenticathed] = useState<boolean>(defaultContextValue.isAuthenticathed)
  const [errorRegister, setErrorRegister] = useState<string>(defaultContextValue.errorRegister);
  const [errorLogin, setErrorLogin] = useState<string>(defaultContextValue.errorLogin);
  
  const SignUp = async (newUser: User) => {
    try {
      const res = await registerUser(newUser);
      setUser(res.data)
      setIsAuthenticathed(true)
    }
    catch (error) {
      console.log(error)
    }

  };
  const Login = async (user : User) => {
    try {
      const res = await loginUser(user);
      setUser(res.data);
      setIsAuthenticathed(true)
    }

    catch(error) {
      console.log(error)
    }
  }
  const LogOut = () => {
    setUser({
      name : '',
      email : '',
      password : '',
      id : '',
      isAuthenticathed : false
    })
    setIsAuthenticathed(false)
    Cookie.remove('token')
  };

  useEffect(() => {
    const checkToken = async () => {
      const cookie = Cookie.get();
      console.log(cookie.token)
      if(!cookie.token) {
        setIsAuthenticathed(false);
        setUser({
          name : '',
          email : '',
          password : '',
          id : '',
          isAuthenticathed : false
        });
        return
      }
      try {

        const res = await tokenVerify(cookie.token)
        console.log(res)
      }
      catch(error : unknown) {
        if(error instanceof AxiosError){
          console.log(error)
        }
      }
    };
    checkToken();
  }, [])
  return (
    <AuthContext.Provider value={{  
        user, 
        setUser, 
        setRefreshData, 
        resfreshData, 
        SignUp,
        isAuthenticathed,
        setIsAuthenticathed,
        Login,
        LogOut,
        errorLogin,
        setErrorLogin,
        errorRegister,
        setErrorRegister }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
