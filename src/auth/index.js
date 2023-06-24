import React, { createContext, useState } from "react";
import serverSide from './server_request'

export const AuthContext = createContext({});

export const AuthActionType = {
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false
    });

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.LOGIN_USER: {
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

    auth.registerUser = async function(userName, email, password) {
        console.log("auth.registerUser");
        console.log("userName: " + userName);
        console.log("email: " + email);
        console.log("password: " + password);

        // const response = await serverSide.registerUser(userName, email, password);
        // console.log(response);

        // authReducer({
        //     type: AuthActionType.LOGIN_USER,
        //     payload: {
        //         user: response.data.user
        //     }
        // });
    }


    return (
        <AuthContext.Provider value={{ auth }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };