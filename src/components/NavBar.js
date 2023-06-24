// import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();

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

    return <AppBar sx={ barTheme.appbar }>
        <Toolbar sx={ barTheme.toolbar }>
            <a href="/">
                <img id='logo' src='/assets/logo_horizontal.png' alt='LeftoverMagic logo'/>
            </a>
            <div className='container'>
                <Button variant='outlined' sx={[ btnTheme.basic, btnTheme.outlined ]} onClick={handleRegister}>Register</Button>
                <Button variant='contained' sx={[ btnTheme.basic, btnTheme.contained ]}><Link to="/login">Login</Link></Button>
            </div>
        </Toolbar>
    </AppBar>
}

export default NavBar;