import { UserContext } from '../user';
import { useContext } from 'react';
import { Button, Typography } from '@mui/material';

const Ingredient = ( props ) => {
    const { name, date } = props;
    const { user } = useContext(UserContext);

    const btnTheme = {
        fontSize: '30px',
        borderRadius: '75px',
        textTransform: 'capitalize',
        backgroundColor: 'var(--primary-color)',
        color: 'white',
        '&.MuiButton-root:hover':{
            backgroundColor: 'var(--primary-hover-color)',
        }
    }

    function handleRemoveIngredients(event){
        event.stopPropagation();
        if(user){
            user.removeIngredient(name, date);
        }
    }

    return <div className='ingredientRow'>
        <div className='ingredientName'>
                <Typography variant='h5'>{name}</Typography>
                <Typography sx={{marginLeft:'10vw'}}>Since {new Date(date).toDateString()}</Typography>
        </div>
        <Button sx={btnTheme} onClick={handleRemoveIngredients}>✖</Button>
    </div>
}

export default Ingredient;