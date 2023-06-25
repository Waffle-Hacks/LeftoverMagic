import { Button } from '@mui/material';

const Ingredient = ( props ) => {
    const { name } = props;
    
    return <div className='ingredientRow'>
        <span className='ingredientName'>{name}</span>
        <Button className='deleteIngredient'>Delete</Button>
    </div>
}

export default Ingredient;