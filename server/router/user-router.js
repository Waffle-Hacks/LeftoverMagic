const express = require('express')
const router = express.Router()

const UserHandler = require('../handler/user-handler')

router.post("/addIngredient", UserHandler.addIngredient);
router.put("/removeIngredient", UserHandler.removeIngredient);
router.get('/getIngredients/:email', UserHandler.getIngredients);
router.get('/searchRecipe/:query', UserHandler.searchRecipe);

module.exports = router