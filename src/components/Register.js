import React, { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import { Typography, TextField, Button } from "@mui/material";

import { AuthContext } from '../auth';

const Register = () => {
    const { auth } = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const fontTheme = {
        color: 'black',
        margin: '2.5%'
    }

    const textFieldTheme = {
        width: "60vh",
        marginTop: "2.5%"
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
        if(username.length === 0 || email.length === 0 || password.length === 0){
            alert('Warning: cannot leave textfield empty.');
        }
        else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            alert('Warning: please enter valid email.');
        }
        else if(password.length < 8){
            alert('Warning: password length should be at least 8.');
        }
        else if(password !== confirmPassword){
            alert('Warning: password unmatched.');
        }

        if(auth){
            console.log('now register user');
            auth.registerUser(
                username,
                email,
                password
            );
        }
    }
    
    return(
        <div className="subContainer" style={{height: '100vh', justifyContent: 'flex-start'}}>
            <Typography variant='h1' fontWeight="bold" sx={fontTheme}>Register</Typography>
            <div>
                <div className="columnContainer">
                    <TextField
                        variant='filled'
                        placeholder='Username'
                        sx={ textFieldTheme }
                        inputProps={{style: {fontSize: 20}}}
                        onChange={handleUsernameUpdate}
                    />
                    <TextField
                        variant='filled'
                        placeholder='Email'
                        sx={ textFieldTheme }
                        inputProps={{style: {fontSize: 20}}}
                        onChange={handleEmailUpdate}
                    />
                    <TextField
                        variant='filled'
                        placeholder='Password'
                        sx={ textFieldTheme }
                        inputProps={{style: {fontSize: 20}}}
                        onChange={handlePasswordUpdate}
                    />
                    <TextField
                        variant='filled'
                        placeholder='Confirm password'
                        sx={ textFieldTheme }
                        inputProps={{style: {fontSize: 20}}}
                        onChange={handleConfirmPasswordUpdate}
                    />
                    <div style={ {width: '30vw', marginTop: "2.5%" }}>
                        <span style={{ marginRight: "2.5%" }}>
                            Already have an account?
                        </span>
                        <Link href="/login" variant="body2">
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