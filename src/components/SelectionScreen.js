import { AuthContext } from '../auth';
import { UserContext } from '../user';
import CheckBox from './CheckBox';

import React, { useContext } from 'react';
import { Typography, Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

const SelectionScreen = () => {
    const { auth } = useContext(AuthContext);
    const { user } = useContext(UserContext);

    // const navigate = useNavigate();

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

    function handleSubmit(event){
        event.stopPropagation();
        if(user){
            console.log(user.chosenIngredients)
            user.searchRecipe();
        }
    }

    function handleClear(event){
        event.stopPropagation();
        if(user){
            user.clearSelection();
        }
    }

    let displayInventory = '';
    if(user && user.ingredients !== null && user.ingredients.length > 0){
        var arr = Array.from(new Set(user.ingredients.map(obj => obj.ingredient)));

        displayInventory = <div className='columnContainer'>
            <div className='flexContainer' style={{ margin: '5% 0' }}>
                {arr.map((name, index) => (
                    <CheckBox key={index} name={name}/>
                ))}
            </div>
        </div>
    }
    else{
        displayInventory = <div id='emptyInventory'>
            <Typography variant='h5'>No ingredients have added yet.</Typography>
        </div>
    }

    return(
        <div className='homeContainer'>
            <div className='subContainer' style={{ height: '100vh', justifyContent: 'flex-start' }}>
                <div className='container' id='ingredientHeader'>
                    <Typography variant='h2' fontWeight="bold" sx={fontTheme}>Choosing ingredients for recipe</Typography>
                </div>
                { displayInventory }
                <div className='container' style={{ marginTop:'5%', alignSelf: 'flex-end', width:'70vw'}}>
                    <Button variant='outlined' sx={btnTheme} onClick={handleClear}>Clear</Button>
                    <Button disabled={user && user.chosenIngredients !== null && user.chosenIngredients !== []} variant='outlined' sx={btnTheme} onClick={handleSubmit}>Generate recipes →</Button>
                </div>
            </div>
        </div>
    )
}
export default SelectionScreen;