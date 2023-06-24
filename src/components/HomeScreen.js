import Hero from './Hero';
import DescriptionBox from './DescriptionBox';

import { Typography } from '@mui/material';

const HomeScreen = () => {
    const fontTheme = {
        color: 'black',
        margin: '2.5%'
    }

    const titles = ["Food Invetory", "Recipe Generator"]
    const descriptions = ["Keep track of food items you have at house", "Generate recipes based on your food inventory & preference!"]

    return(
        <div className='homeContainer'>
            <div className='subContainer'>
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
        </div>
    )
}
export default HomeScreen;