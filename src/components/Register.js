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

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function handleUsernameUpdate(event){
        event.stopPropagation();
        setUsername(event.target.value);
    }

    function handleEmailUpdate(event){
        event.stopPropagation();
        setEmail(event.target.value);
    }

    function handlePasswordUpdate(event){
        event.stopPropagation();
        setPassword(event.target.value);
    }

    function handleConfirmPasswordUpdate(event){
        event.stopPropagation();
        setConfirmPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.stopPropagation();
        if(auth){
            console.log('now register user');
            auth.registerUser(
                username,
                email,
                password,
                confirmPassword
            );

            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        }
    }
    
    return(
        <div className="subContainer" style={{height: '100vh', justifyContent: 'flex-start'}}>
            <Typography variant='h1' fontWeight="bold" sx={fontTheme}>Register</Typography>
            <div>
                <div className="columnContainer">
                    <UserInput placeholder='Username' handleUpdate={handleUsernameUpdate} value={username} />
                    <UserInput placeholder='Email' handleUpdate={handleEmailUpdate} value={email} />
                    <UserInput placeholder='Password' handleUpdate={handlePasswordUpdate} value={password} />
                    <UserInput placeholder='Confirm password' handleUpdate={handleConfirmPasswordUpdate} value={confirmPassword} />
                    
                    <div style={ {width: '30vw', marginTop: "2.5%" }}>
                        <span style={{ marginRight: "2.5%" }}>
                            Already have an account?
                        </span>
                        <Link to="/login" variant="body2">
                            Login Here
                        </Link>
                    </div>
                </div>

                <Button variant='contained' sx={ btnTheme } onClick={handleSubmit}>Register</Button>
            </div>
        </div>
    )
}

export default Register;