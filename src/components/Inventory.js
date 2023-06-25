import { AuthContext } from '../auth';
import { UserContext } from '../user';
import Ingredient from './Ingredient';
import AddIngredientModal from './AddIngredientModal';

import { useNavigate, Link } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { Typography, Button, Menu, MenuItem } from '@mui/material';

const Inventory = () => {
    const { auth } = useContext(AuthContext);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const openMenu = (event) => {
        console.log("Choose a sorting");
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const closeMenu = () => {
        setAnchorEl(null);
    };

    const handleSortAtoZ = (event) => {
        console.log("Changing to ATOZ");
        user.sort("A_TO_Z");
        closeMenu();
    }

    const handleSortZtoA = (event) => {
        console.log("Changing to ZTOA");
        user.sort("Z_TO_A");
        closeMenu();
    }

    const handleSortFresh = (event) => {
        console.log("Changing to Fresh");
        user.sort("MOST_FRESH");
        closeMenu();
    }

    const handleSortExpired = (event) => {
        console.log("Changing to expire days");
        user.sort("LEAST_FRESH");
        closeMenu();
    }

    const handleDefault = (event) => {
        console.log("Changing to Default");
        user.sort("Default");
        closeMenu();
    }

    const menuId = 'sorting-menu';
    const sortingMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top',  horizontal: 'right', }}
            open={isMenuOpen}
            onClose={closeMenu}
        >
            <MenuItem onClick={handleDefault}><Link to='/'>Default</Link></MenuItem>
            <MenuItem onClick={handleSortAtoZ}><Link to='/'>Ingredient Name (A - Z)</Link></MenuItem>
            <MenuItem onClick={handleSortZtoA}><Link to='/'>Ingredient Name (Z - A)</Link></MenuItem>
            <MenuItem onClick={handleSortFresh}><Link to='/'>Freshness (Fresh - Old)</Link></MenuItem>
            <MenuItem onClick={handleSortExpired}><Link to='/'>Freshness (Old - Fresh)</Link></MenuItem>
        </Menu>
    );

    useEffect(() => {
        user.loadInventory();
    }, []);

    let username = auth.user.userName ? (auth && auth.user && auth.user.userName) : 'user';
    
    console.log(username);

    const fontTheme = {
        color: 'var(--primary-color)',
        margin: '2.5%'
    }
    const btnTheme = {
        basic: {
            borderRadius: '75px',
            margin: '20px 5px',
            padding: '10px 10px',
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

    function handleSelection(event){
        event.stopPropagation();
        if(user)
            user.clearSelection();
        navigate('/selection')
    }

    function handleAddIngredient(event){
        event.stopPropagation();
        user.openAddModal();
    }

    let displayInventory = '';
    let generateRecipeBtn = '';
    
    if(user && user.ingredients !== null && user.ingredients.length > 0){
        displayInventory = <div className='columnContainer' style={{ margin: '5% 0' }}>
                {user.ingredients.map((object, index) => (
                    <Ingredient key={index} name={object.ingredient} date={object.boughtSince}/>
                ))}
            </div>
        generateRecipeBtn = <Button variant='outlined' onClick={handleSelection} sx={[ btnTheme.basic, btnTheme.outlined ]}>Generate Recipe</Button>
    }
    else{
        displayInventory = <div id='emptyInventory'>
            <Typography variant='h5'>No ingredients have added yet.</Typography>
        </div>
        generateRecipeBtn = '';
    }

    return(
        <div className='homeContainer'>
            <div className='subContainer' style={{ height: '100vh', justifyContent: 'flex-start' }}>
                <div className='container' id='ingredientHeader'>
                        <div className='ingredientTitle'>
                            <Typography variant='h4' fontWeight="bold" sx={fontTheme}>Hi {username}, manage your ingredients inventory here!</Typography>
                        </div>
                        <div className='headerBtn'>
                            <Button variant='contained' sx={[ btnTheme.basic, btnTheme.contained ]} onClick={handleAddIngredient}>Add Ingredients</Button>
                            <Button variant='contained' onClick={openMenu} sx={[ btnTheme.basic, btnTheme.contained ]}>Sort By</Button>
                            {sortingMenu}
                        </div>
                </div>
                { displayInventory }
                <div>
                    { generateRecipeBtn }
                </div>
                <AddIngredientModal/>
            </div>
        </div>
    )
}
export default Inventory;