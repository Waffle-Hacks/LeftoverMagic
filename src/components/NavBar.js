// import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';

const NavBar = () => {
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

    return <AppBar sx={ barTheme.appbar }>
        <Toolbar sx={ barTheme.toolbar }>
            <a href="/">
                <img id='logo' src='/assets/logo_horizontal.png' alt='LeftoverMagic logo'/>
            </a>
            <div className='container'>
                <Button variant='outlined' sx={[ btnTheme.basic, btnTheme.outlined ]}>Register</Button>
                <Button variant='contained' sx={[ btnTheme.basic, btnTheme.contained ]}>Login</Button>
            </div>
        </Toolbar>
    </AppBar>
}

export default NavBar;