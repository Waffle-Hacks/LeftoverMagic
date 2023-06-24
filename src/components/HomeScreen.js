import { Typography } from '@mui/material';
import Hero from './Hero';

const HomeScreen = () => {
    const fontTheme = {
        color: 'black',
        margin: '2.5%'
    }

    return(
        <div className='homeContainer'>
            <div className='homeSubContainer'>
                <Hero/>
                <hr id='divider'/>
                <div>
                    <Typography variant='h3' fontWeight="bold" sx={fontTheme}>Usage</Typography>
                </div>
            </div>
        </div>
    )
}
export default HomeScreen;