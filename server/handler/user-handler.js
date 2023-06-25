const User = require('../schema/user')
const dotenv = require('dotenv')
dotenv.config();
const axios = require('axios');

addIngredient = async function(req, res){
    const {email, ingredient, date} = req.body;
    console.log("Find user with email: " + JSON.stringify(email));

    const user = await User.findOne({ email: email });

    if(user){
        console.log(user);

        const newIngredient = {
            ingredient: ingredient,
            boughtSince: date,
        };

        let newInventory = user.inventory.slice();
        newInventory.push(newIngredient);

        user.inventory = newInventory;
        const updatedUser = await user.save();

        if(updatedUser){
            console.log('User updated:', updatedUser);
            return res.status(200).json({
                success: true,
                user: updatedUser
            })
        }
    }
    return res.status(400).json({
        success: false,
        errorMessage: 'Add ingredients failed.'
    })
}

removeIngredient = async function(req, res){
    const {email, ingredient, date} = req.body;
    console.log("Find user with email: " + JSON.stringify(req.body));

    const user = await User.findOne({ email: email });

    if(user && user.inventory){
        let inventory = user.inventory.slice();

        for(var i = 0; i < inventory.length; i++){
            if(inventory[i].ingredient === ingredient && inventory[i].boughtSince.toDateString() === new Date(date).toDateString()){
                break;
            }
        }

        if(i < inventory.length){
            inventory.splice(i, 1);
            user.inventory = inventory;
            const updatedUser = await user.save();

            if(updatedUser){
                return res.status(200).json({
                    success: true,
                    user: updatedUser
                })
            }
        }

        return res.status(200).json({
            success: true,
            user: user,
        })
    }

    return res.status(400).json({
        success: false,
        errorMessage: 'Remove ingredient failed.'
    })
}

getIngredients = async function(req, res){
    console.log("Find ingredients with email: " + JSON.stringify(req.params.email));

    const user = await User.findOne({ email: req.params.email });
    if(user){
        console.log(user);

        return res.status(200).json({
            success: true,
            inventory: user.inventory
        })
    }
    return res.status(400).json({
        success: false,
        errorMessage: 'No ingredient found.'
    })
}

searchRecipe = async function(req, res){
    console.log("Search: " + JSON.stringify(req.params.query));

    try{
        const API_ID = process.env.RECIPE_API_ID;
        const API_KEY = process.env.RECIPE_API_KEY;

        console.log(req.params.query)
        console.log(API_ID)
        console.log(API_KEY)

        axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${req.params.query}&app_id=${API_ID}&app_key=${API_KEY}`)
            .then(response => {
                const data = response.data;
                return res.status(200).json({
                    success: true,
                    data: data
                })
            })
            .catch(error => {
                console.log(error);
                return res.status(500).json({ 
                    success: false,
                    errorMsg: err
                });
            });
        }
    catch(err){
        console.error(err);
        return res.status(500).json({ 
            success: false,
            errorMessage: err
        });
    }
}

module.exports = {
    addIngredient,
    removeIngredient,
    getIngredients,
    searchRecipe
}