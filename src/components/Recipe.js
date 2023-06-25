import React from 'react';
import style from '../style/recipe.module.css';

const Recipe = ({title, calories, image, ingredients, mealType}) => {
    return (
        <div className={style.recipe}>
  
            <div className={style.title}>
                {title}
                <span className={style.popup}>{Math.round(calories)} calories; {mealType}</span>
            </div>
            <ol>
                <p className={style.text}>Ingredients:</p>
                {ingredients.map(ingredient => (
                    <li className={style.steps}>{ingredient.text}</li>
                ))}
            </ol>
            <img className={style.image} src={image} alt='Recipe food showcase'/>
        </div>
    );
}

export default Recipe;