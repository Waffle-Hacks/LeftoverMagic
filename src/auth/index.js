import React, { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom';

import serverSide from './server_request'

export const AuthContext = createContext({});

export const AuthActionType = {
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER"
}

function AuthContextProvider(props) {
    const navigate = useNavigate();

    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false
    });

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.LOGIN_USER: {
                console.log(payload.user)
                return setAuth({
                    user: payload.user,
                    loggedIn: true
                });
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false
                });
            }
            default:
                return auth;
        }
    }

    auth.registerUser = async function(userName, email, password, confirmPassword){
        console.log("auth.registerUser");
        console.log("userName: " + userName);
        console.log("email: " + email);
        console.log("password: " + password);
        console.log("confirmPassword: " + confirmPassword);

        try{
            const response = await serverSide.registerUser(userName, email, password, confirmPassword);

            if(response && response.status === 200){
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user
                    }
                });
                navigate('/')
            }
        }
        catch(err){
            if(err && err.response){
                const errMsg = err.response.data.errorMessage;
                alert(`Error: ${errMsg}`);
            }
        }
    }

    auth.loginUser = async function(emailOrPw, password){
        try{
            console.log("auth.loginUser");
            console.log("emailOrPw: " + emailOrPw);
            console.log("password: " + password);

            const response = await serverSide.loginUser(emailOrPw, password);
            if(response && response.status === 200){
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user
                    }
                });
                navigate('/')
            }
        }
        catch(err){
            if(err && err.response){
                const errMsg = err.response.data.errorMessage;
                alert(`Error: ${errMsg}`);
            }
        }
    }

    auth.logoutUser = async function() {
        try{
            console.log("auth.logoutUser");
            const response = await serverSide.logoutUser();
            if (response && response.status === 200) {
                console.log("logout success");
                authReducer( {
                    type: AuthActionType.LOGOUT_USER,
                    payload: null
                })
                navigate('/login')
            }
        }
        catch(err){
            if(err && err.response){
                const errMsg = err.response.data.errorMessage;
                alert(`Error: ${errMsg}`);
            }
        }
    }

    return (
        <AuthContext.Provider value={{ auth }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };