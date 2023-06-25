import React, { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import { Typography, TextField, Button } from "@mui/material";

import { AuthContext } from '../auth';
import UserInput from './UserInput';

const Register = () => {
    const { auth } = useContext(AuthContext);

    const fontTheme = {
        color: 'black',
        margin: '2.5%'
    }

    const btnTheme = {
        fontSize: '17.5px',
        borderRadius: '75px',
        margin: '2.5%',
        padding: '1vw 2vw',
        minWidth: '20vw',
        textTransform: 'capitalize',
        backgroundColor: 'var(--primary-color)',
        '&.MuiButton-root:hover':{
            backgroundColor: 'var(--primary-hover-color)',
            color: 'white'
        }
    }

    const [emailOrPw, setEmailOrPw] = useState("");
    const [password, setPassword] = useState("");

    function handleEmailOrPwUpdate(event){
        event.stopPropagation();
        setEmailOrPw(event.target.value);
    }

    function handlePasswordUpdate(event){
        event.stopPropagation();
        setPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.stopPropagation();
        if(emailOrPw.length === 0 || password.length === 0){
            alert('Warning: cannot leave textfield empty.');
        }

        if(auth){
            console.log('now login user');
            auth.loginUser(
                emailOrPw,
                password
            );
            setEmailOrPw('');
            setPassword('');
        }
    }
    
    return(
        <div className="subContainer" style={{height: '100vh', justifyContent: 'flex-start'}}>
            <Typography variant='h1' fontWeight="bold" sx={fontTheme}>Login</Typography>
            <div>
                <div className="columnContainer">
                    <UserInput placeholder='Email' handleUpdate={handleEmailOrPwUpdate} value={emailOrPw} />
                    <UserInput placeholder='Password' handleUpdate={handlePasswordUpdate} value={password} />

                    <div style={ {width: '30vw', marginTop: "2.5%" }}>
                        <span style={{ marginRight: "2.5%" }}>
                            Doesn't have an account?
                        </span>
                        <Link to="/register" variant="body2">
                            Register Here
                        </Link>
                    </div>
                </div>

                <Button variant='contained' sx={ btnTheme } onClick={handleSubmit}>Login</Button>
            </div>
        </div>
    )
}

export default Register;