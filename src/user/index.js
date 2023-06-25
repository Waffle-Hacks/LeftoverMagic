import React, { createContext, useState, useContext } from "react";
// import { useNavigate } from 'react-router-dom';
import serverSide from './server_request';

import AuthContext from '../auth'
export const UserContext = createContext({});

export const UserActionType = {
    OPEN_MODAL: "OPEN_MODAL",
    CLOSE_MODAL: "CLOSE_MODAL",
    ADD_INGREDIENTS: "ADD_INGREDIENTS",
    UPDATE_INVENTORY: "UPDATE_INVENTORY",
    CHOOSE_INGREDIENT: "CHOOSE_INGREDIENT",
    UPDATE_RECIPES: "UPDATE_RECIPES",
    UPDATE_SORT: "UPDATE_SORT",
}

export const SortType = {
    DEFAULT: "DEFAULT",
    A_TO_Z: "A_TO_Z",
    Z_TO_A: "Z_TO_A",
    MOST_FRESH: "MOST_FRESH",
    LEAST_FRESH: "LEAST_FRESH",
}

function UserContextProvider(props) {
    const { auth } = useContext(AuthContext);
    console.log("auth: " + JSON.stringify(auth));

    const [user, setUser] = useState({
        ingredients: [],
        isAddModalOpen: false,
        chosenIngredients: [],
        recipes: [],
        sortMethod: 'DEFAULT'
    });

    const userReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case UserActionType.OPEN_MODAL: {
                return setUser(prevUser => ({
                    ...prevUser,
                    isAddModalOpen: true
                }));
            }
            case UserActionType.CLOSE_MODAL: {
                return setUser(prevUser => ({
                    ...prevUser,
                    isAddModalOpen: false
                }));
            }
            case UserActionType.ADD_INGREDIENTS: {
                console.log(user.ingredients);
                return setUser({
                    ingredients: payload,
                    isAddModalOpen: false
                });
            }
            case UserActionType.UPDATE_INVENTORY: {
                return setUser(prevUser => ({
                    ...prevUser,
                    ingredients: payload
                }));
            }
            case UserActionType.CHOOSE_INGREDIENT: {
                return setUser(prevUser => ({
                    ...prevUser,
                    chosenIngredients: payload
                }));
            }
            case UserActionType.UPDATE_RECIPES: {
                return setUser(prevUser => ({
                    ...prevUser,
                    chosenIngredients: [],
                    recipes: payload
                }));
            }
            case UserActionType.UPDATE_SORT: {
                return setUser(prevUser => ({
                    ...prevUser,
                    sortMethod: payload
                }));
            }
            default:
                return user;
        }
    }

    user.openAddModal = function () {
        userReducer({
            type: UserActionType.OPEN_MODAL,
            payload: {}
        });
    }

    user.hideModal = function () {
        userReducer({
            type: UserActionType.CLOSE_MODAL,
            payload: {}
        });
    }

    user.addIngredient = async function(ingredient, date){
        try{
            if(auth && auth.user){
                const response = await serverSide.addIngredient(auth.user.email, ingredient, date);
                if (response.status === 200 && response.data.user) {
                    console.log(response)
                    userReducer({
                        type: UserActionType.ADD_INGREDIENTS,
                        payload: response.data.user.inventory
                    });
                }
            }
        }
        catch(err){
            if(err && err.response){
                const errMsg = err.response.data.errorMessage;
                alert(`Error: ${errMsg}`);
            }
        }
    }

    user.removeIngredient = async function(ingredient, date){
        try{
            if(auth && auth.user){
                console.log("removeIngredient")
                console.log(ingredient, date)
                console.log(auth.user.email)
                const response = await serverSide.removeIngredient(auth.user.email, ingredient, date);
                console.log(response)
                if (response.status === 200 && response.data.user) {
                    console.log(response)
                    userReducer({
                        type: UserActionType.UPDATE_INVENTORY,
                        payload: response.data.user.inventory
                    });
                }
            }
        }
        catch(err){
            if(err && err.response){
                const errMsg = err.response.data.errorMessage;
                alert(`Error: ${errMsg}`);
            }
        }
    }

    user.loadInventory = async function () {
        try{
            console.log("user.loadInventory")
            if(auth && auth.user){
                console.log(auth.user.email)
                const response = await serverSide.loadInventory(auth.user.email);
                if (response.status === 200) {
                    console.log(response)
                    let inventory = response.data.inventory;
                    userReducer({
                        type: UserActionType.UPDATE_INVENTORY,
                        payload: inventory
                    });
                }
            }
        }
        catch(err){
            if(err && err.response){
                const errMsg = err.response.data.errorMessage;
                console.log(`Error: ${errMsg}`);
            }
        }
    }

    user.clearSelection = async function () {
        try{
            userReducer({
                type: UserActionType.CHOOSE_INGREDIENT,
                payload: []
            });
        }
        catch(err){
            if(err && err.response){
                const errMsg = err.response.data.errorMessage;
                console.log(`Error: ${errMsg}`);
            }
        }
    }

    user.select = async function(ingredient){
        try{
            if(user.chosenIngredients !== null){
                console.log('user.select');
                console.log(ingredient);
                console.log(user.chosenIngredients);

                if(!user.chosenIngredients.includes(ingredient)){
                    console.log('shud add');
                    console.log([...user.chosenIngredients, ingredient]);

                    userReducer({
                        type: UserActionType.CHOOSE_INGREDIENT,
                        payload: [...user.chosenIngredients, ingredient]
                    });
                }
            }
        }
        catch(err){
            if(err && err.response){
                const errMsg = err.response.data.errorMessage;
                alert(`Error: ${errMsg}`);
            }
        }
    }

    user.deselect = async function(given_ingredient){
        try{
            if(user.chosenIngredients !== null){
                console.log('user.deselect');
                console.log(given_ingredient);
                console.log(user.chosenIngredients);

                if(user.chosenIngredients.includes(given_ingredient)){
                    userReducer({
                        type: UserActionType.CHOOSE_INGREDIENT,
                        payload: user.chosenIngredients.filter(ingredient => ingredient !== given_ingredient)
                    });
                }
            }
        }
        catch(err){
            if(err && err.response){
                const errMsg = err.response.data.errorMessage;
                alert(`Error: ${errMsg}`);
            }
        }
    }

    user.chosen = function(name){
        if(user.chosenIngredients !== null && user.chosenIngredients.length > 0 && user.chosenIngredients.includes(name)){
            return true;
        }
        return false;
    }

    user.searchRecipe = async function(){
        if(user.chosenIngredients !== null && user.chosenIngredients.length > 0){
            const query = user.chosenIngredients.join(', ');
            console.log(query);
            const response = await serverSide.searchRecipe(query);
            if (response.status === 200) {
                console.log(response.data);
                const top20recipes = response.data.data.hits;
                console.log(top20recipes);
                userReducer({
                    type: UserActionType.UPDATE_RECIPES,
                    payload: top20recipes
                });
            }
        }
    }

    user.sort = async function(type){
        try{
            console.log("user.loadInventory")
            if(auth && auth.user){
                console.log(auth.user.email)
                const response = await serverSide.loadInventory(auth.user.email);
                if (response.status === 200) {
                    console.log(response)
                    let inventory = response.data.inventory;
                    console.log(inventory)
                    console.log("type " + type)
                    
                    if(type === SortType.A_TO_Z){
                        inventory = inventory.sort((a, b) => a.ingredient.localeCompare(b.ingredient));
                    }
                    else if(type === SortType.Z_TO_A){
                        inventory = inventory.sort((a, b) => b.ingredient.localeCompare(a.ingredient));
                    }
                    else if(type === SortType.MOST_FRESH){
                        inventory = inventory.sort((a, b) => new Date(b.boughtSince) - new Date(a.boughtSince));
                    }
                    else if(type === SortType.LEAST_FRESH){
                        inventory = inventory.sort((a, b) => new Date(a.boughtSince) - new Date(b.boughtSince));
                    }

                    userReducer({
                        type: UserActionType.UPDATE_INVENTORY,
                        payload: inventory
                    });
                }
            }
        }
        catch(err){
            if(err && err.response){
                const errMsg = err.response.data.errorMessage;
                console.log(`Error: ${errMsg}`);
            }
        }
    }

    return (
        <UserContext.Provider value={{ user }}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContext;
export { UserContextProvider };