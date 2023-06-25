const express = require('express')
const router = express.Router()

const AuthHandler = require('../handler/auth-handler')

router.post('/register', AuthHandler.registerUser)
router.post('/login', AuthHandler.loginUser)
router.get('/logout', AuthHandler.logoutUser)
router.get('/loggedIn', AuthHandler.stayLoggedIn)

module.exports = router