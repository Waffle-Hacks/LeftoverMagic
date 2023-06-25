import React, { useContext } from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../auth';

const NavBar = () => {
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);

    const barTheme = {
        appbar: {
            background: 'white',
            position: 'sticky'
        },
        toolbar: {
            display: 'flex',
            justifyContent: 'space-between'
        }
    };

    const btnTheme = {
        basic: {
            borderRadius: '75px',
            margin: '0 2.5%',
            padding: '6.5px 25px',
            textTransform: 'capitalize',
            '&.MuiButton-root:hover':{
                backgroundColor: 'var(--primary-hover-color)',
                color: 'white'
            }
        },
        outlined: {
            color: 'var(--primary-color)',
            borderColor: 'var(--primary-color)'
        }, 
        contained:{
            backgroundColor: 'var(--primary-color)'
        }
    }

    function handleRegister(event) {
        event.stopPropagation();
        navigate('/register');
    }

    function handleLogin(event) {
        event.stopPropagation();
        navigate('/login');
    }

    function handleLogout(event){
        event.stopPropagation();
        if(auth){
            console.log('now login user');
            auth.logoutUser();
        }
    }

    let btnGrp = '';

    if(auth && auth.user && auth.loggedIn){
        btnGrp = <Button variant='outlined' sx={[ btnTheme.basic, btnTheme.outlined ]} onClick={handleLogout}>Logout</Button>;
    }
    else{
        btnGrp = <>
            <Button variant='outlined' sx={[ btnTheme.basic, btnTheme.outlined ]} onClick={handleRegister}>Register</Button>
            <Button variant='contained' sx={[ btnTheme.basic, btnTheme.contained ]} onClick={handleLogin}>Login</Button>
        </>;
    }

    return <AppBar sx={ barTheme.appbar }>
        <Toolbar sx={ barTheme.toolbar }>
            <Link to="/">
                <img id='logo' src='/assets/logo_horizontal.png' alt='LeftoverMagic logo'/>
            </Link>
            <div className='container'>
                { btnGrp }
            </div>
        </Toolbar>
    </AppBar>
}

export default NavBar;