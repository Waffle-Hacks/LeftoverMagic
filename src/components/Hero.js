import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Hero = () => {
    const fontTheme = {
        color: 'black',
        margin: '2.5%'
    }

    const btnTheme = {
        fontSize: '25px',
        borderRadius: '75px',
        padding: '1% 40%',
        margin: '4% 0',
        textTransform: 'capitalize',
        backgroundColor: 'var(--primary-color)',
        '&.MuiButton-root:hover':{
            backgroundColor: 'var(--primary-hover-color)',
            color: 'white'
        }
    }

    return (
        <div className='subContainer'>
            <div className='container'>
                <div id='introduction'>
                    <Typography variant='h1' fontWeight="bold" sx={fontTheme}> Reduce Food and <span style={{ color: 'var(--primary-color)' }}>Save the Earth!</span></Typography>
                    <Typography variant='h6' sx={fontTheme}>
                        Every year, there is approximately 1.3 billion tons of food wasted worldwide.<br/>
                        We aim to help individuals or household to reduce food waste by providing effective meal-planning suggestions based on
                        providing ingredients they have on hand.<br/>
                        LeftoverMagic encourages sustainable consumption habits, minimizes food waste, and promotes mindful cooking and
                        grocery shopping practices.
                    </Typography>
                    <Link to="/register" style={{ textDecoration: 'none', color: 'inherit'}}><Button variant='contained' sx={ btnTheme }>Start Now</Button></Link>
                </div>
                <div style={{ backgroundColor: 'var(--primary-hover-color)', minWidth: '37.5vw', color: 'white'}}>
                    going to be a picture
                </div>
                {/* <img src='' alt='food picture'/> */}
            </div>
        </div>
    )
}

export default Hero;