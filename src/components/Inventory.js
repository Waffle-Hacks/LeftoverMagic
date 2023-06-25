import { AuthContext } from '../auth';
import Ingredient from './Ingredient';

import React, { useContext, useState } from 'react';
import { Typography, Button} from '@mui/material';

const Inventory = () => {
    const { auth } = useContext(AuthContext);
    const [ingredients, setIngredients] = useState(auth.user.inventory ? (auth && auth.user && auth.user.inventory) : []);

    let user = auth.user.userName ? (auth && auth.user && auth.user.userName) : 'user';
    
    console.log(user);
    console.log(ingredients);

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

    let displayInventory = '';
    let generateRecipeBtn = '';
    
    if(ingredients && ingredients.length > 0){
        displayInventory = <div className='ingredientRows'>
                {ingredients.map((item, index) => (
                    <Ingredient key={index} name={item}/>
                ))}
            </div>
        generateRecipeBtn = <Button variant='outlined' sx={[ btnTheme.basic, btnTheme.outlined ]}>Generate Recipe</Button>
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
                            <Typography variant='h4' fontWeight="bold" sx={fontTheme}>Hi {user}, manage your ingredients inventory here!</Typography>
                        </div>
                        <div className='headerBtn'>
                            <Button variant='contained' sx={[ btnTheme.basic, btnTheme.contained ]}>Add Ingredients</Button>
                            <Button variant='contained' sx={[ btnTheme.basic, btnTheme.contained ]}>Undo</Button>
                            <Button variant='contained' sx={[ btnTheme.basic, btnTheme.contained ]}>Redo</Button>
                            <Button variant='contained' sx={[ btnTheme.basic, btnTheme.contained ]}>Sort By</Button>
                        </div>
                        { generateRecipeBtn }
                </div>
                { displayInventory }
            </div>
        </div>
    )
}
export default Inventory;