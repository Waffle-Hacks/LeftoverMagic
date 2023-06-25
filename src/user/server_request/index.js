import axios from 'axios'

// set up backend side
axios.defaults.withCredentials = true;

const serverSide = axios.create({
    baseURL: 'http://localhost:4000/user',
})

export const addIngredient = (email, ingredient, date) => {
    return serverSide.post(`/addIngredient`, {
        email: email,
        ingredient: ingredient,
        date: date
    })
}

export const loadInventory = (email) => serverSide.get(`/getIngredients/${email}`)

export const removeIngredient = (email, ingredient, date) => {
    return serverSide.put(`/removeIngredient`, {
        email: email,
        ingredient: ingredient,
        date: date
    })
}

export const searchRecipe = (query) => serverSide.get(`/searchRecipe/${query}`)

const server = {
    addIngredient,
    removeIngredient,
    loadInventory,
    searchRecipe
}

export default server