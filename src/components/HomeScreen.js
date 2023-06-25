import Hero from './Hero';
import { AuthContext } from '../auth';
import Ingredients from './Ingredients';
import DescriptionBox from './DescriptionBox';

import React, { useContext } from 'react';
import { Typography } from '@mui/material';

const HomeScreen = () => {
    const { auth } = useContext(AuthContext);
    
    const fontTheme = {
        color: 'black',
        margin: '2.5%'
    }

    const titles = ["Food Invetory", "Recipe Generator"]
    const descriptions = ["Keep track of food items you have at house", "Generate recipes based on your food inventory & preference!"]

    let content = '';
    if(auth && auth.user && auth.loggedIn){
        content = <div className='subContainer'>
            Hello
            {/* <Ingredients/> */}
        </div>
    }
    else{
        content = <div className='subContainer'>
            <Hero/>
            <hr id='divider'/>
            <div className='columnContainer'>
                <Typography variant='h3' fontWeight="bold" sx={fontTheme}>Usage</Typography>
                <div className='container' id='descriptionContainer'>
                    {titles.map((item, index) => (
                        <DescriptionBox key={index} title={item} description={descriptions[index]}/>
                    ))}
                </div>
            </div>
        </div>
    }

    return(
        <div className='homeContainer'>
            {content}
        </div>
    )
}
export default HomeScreen;