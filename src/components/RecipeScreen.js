import { AuthContext } from '../auth';
import { UserContext } from '../user';
import Recipe from './Recipe';

import React, { useContext } from 'react';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RecipeScreen = () => {
    const { auth } = useContext(AuthContext);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const fontTheme = {
        color: 'var(--primary-color)',
        margin: '2.5%'
    }

    const btnTheme = {
        alignSelf: 'center',
        width: '30vw',
        fontSize: '25px',
        borderRadius: '75px',
        margin: '20px 5px',
        padding: '10px 10px',
        textTransform: 'capitalize',
        color: 'var(--primary-color)',
        borderColor: 'var(--primary-color)',
        '&.MuiButton-root:hover':{
            backgroundColor: 'var(--primary-hover-color)',
            color: 'white'
        }
    }

    let recipes = '';
    if(user){
        recipes = user.recipes.map(recipe => (
            <Recipe
                key={recipe.recipe.image} title={recipe.recipe.label}
                calories={recipe.recipe.calories} image = {recipe.recipe.image}
                ingredients = {recipe.recipe.ingredients}
                mealType={recipe.recipe.mealType}
                cuisineType={recipe.recipe.cuisineType}
            />
        ))
    }
    else{
        recipes  = <div id='emptyInventory'>
            <Typography variant='h5'>No recipes found.</Typography>
        </div>
    }

    function handleSelection(event){
        event.stopPropagation();
        navigate('/selection')
    }

    function handleInventory(event) {
        event.stopPropagation();
        navigate('/');
    }

    return(
        <div className='homeContainer'>
            <div className='subContainer' style={{ height: '100vh', justifyContent: 'flex-start' }}>
                <div className='container' id='ingredientHeader'>
                    <Typography variant='h2' fontWeight="bold" sx={fontTheme}>Top 20 recipes</Typography>
                </div>
                <div className='recipes'>
                    {recipes}
                </div>
                <div className='container' style={{ marginTop:'5%', alignSelf: 'flex-end', width:'90vw'}}>
                    <Button variant='outlined' sx={btnTheme} onClick={handleSelection}>← Generate more recipes</Button>
                    <Button variant='outlined' sx={btnTheme}>Bookmark</Button>
                    <Button variant='outlined' sx={btnTheme} onClick={handleInventory}>Manage item inventory</Button>
                </div>
            </div>
        </div>
    )
}
export default RecipeScreen;