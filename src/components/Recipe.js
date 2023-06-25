import React from 'react';
import style from '../style/recipe.module.css';

// import Checkbox from '@mui/material/Checkbox';
// import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
// import BookmarkIcon from '@mui/icons-material/Bookmark';

const Recipe = ({title, calories, image, ingredients, mealType, cuisineType}) => {
    return (
        <div className={style.recipe} style={{width: '10vw'}}>
            <div className='container'>
                <div className={style.title}>
                    {title}
                    <span className={style.popup}>{Math.round(calories)} calories; {mealType}</span>
                </div>
                <button>
                    Bookmark
                </button>
            </div>
            <ol>
                <p className={style.text}>Ingredients:</p>
                {ingredients.map(ingredient => (
                    <li className={style.steps}>{ingredient.text}</li>
                ))}
            </ol>
            <img className={style.image} src={image} alt='Recipe food showcase'/>
            <div className='container' style={{marginTop: '2.5%'}}>
                {cuisineType.map(type => (
                    <span style={{ backgroundColor: 'var(--primary-color)', color: 'white', padding: '1vh 2vh', borderRadius:'75px', margin: "2.5%" }}>{type}</span>
                ))}
            </div>
        </div>
    );
}

export default Recipe;