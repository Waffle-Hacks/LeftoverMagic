import { Typography, Button} from '@mui/material';
import { Link } from 'react-router-dom';

const Ingredients = () => {
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

    return(
        <div className='subContainer'>
            <div className='ingredientHeader'>
                    <div className='ingredientTitle'>
                        <Typography variant='h5' fontWeight="bold" sx={fontTheme}>Manage Ingredients</Typography>
                    </div>
                    <div className='headerBtn'>
                        <Button variant='contained' sx={[ btnTheme.basic, btnTheme.contained ]}>Add Ingredients</Button>
                        <Button variant='contained' sx={[ btnTheme.basic, btnTheme.contained ]}>Undo</Button>
                        <Button variant='contained' sx={[ btnTheme.basic, btnTheme.contained ]}>Redo</Button>
                        <Button variant='contained' sx={[ btnTheme.basic, btnTheme.contained ]}>Sort By</Button>
                    </div>
            </div>
        </div>
    )
}
export default Ingredients;