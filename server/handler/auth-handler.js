const auth = require('../auth')
const User = require('../schema/user')
const bcrypt = require('bcryptjs')

registerUser = async (req, res) => {
    console.log("registerUser");
    try {
        const { userName, email, password, confirmPassword} = req.body;
        console.log(userName);
        console.log(email);
        console.log(password);
        console.log(confirmPassword);

        if (!userName || !email || !password) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter all required fields."
                });
        }
        else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: 'Please enter valid email.'
                })
        }
        else if(password.length < 8){
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: 'Password length should be at least 8.'
                })
        }
        else if(password !== confirmPassword){
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: 'Password unmatched.'
                })
        }

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            console.log("existingUser: " + existingUser);
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this email address already exists."
                })
        }

        // ensure unique userName
        const existingUserName = await User.findOne({ userName: userName });
        console.log("existingUserName: " + existingUserName);
        if (existingUserName) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this user name already exists."
                })
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            userName, email, passwordHash
        });

        const savedUser = await newUser.save();
        console.log("new user saved: " + savedUser);

        const token = auth.signToken(savedUser._id);
        console.log("token:" + token);

        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            user: {
                userName: savedUser.userName,
                email: savedUser.email              
            }
        })
    }
    catch (err) {
        console.error(err);
        return res.status(500)
                .json({
                    success: false,
                    errorMessage: "please re-login again."
                })
    }
}

loginUser = async (req, res) => {
    console.log("loginUser");
    console.log(req.body);
    try {
        const { emailOrPw, password } = req.body;

        if(!emailOrPw || !password) {
            return res
                .status(400)
                .json({errorMessage: "Please enter all required fields." });
        }

        const existingEmailUser = await User.findOne({ email: emailOrPw });
        const existingUser = await User.findOne({ username: emailOrPw });

        if(!existingEmailUser && !existingUser){
            return res
                .status(401)
                .json({
                    success: false,
                    errorMessage: "Wrong login information provided."
                })
        }

        console.log("provided password: " + password);
        
        if(existingEmailUser){
            const passwordCorrect = await bcrypt.compare(password, existingEmailUser.passwordHash);
            if (!passwordCorrect) {
                console.log("Incorrect password");
                return res
                    .status(401)
                    .json({
                        errorMessage: "Wrong login information provided."
                    })
            }

            const token = auth.signToken(existingEmailUser._id);
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: true
            }).status(200).json({
                success: true,
                user: {
                    userName: existingEmailUser.userName,
                    email: existingEmailUser.email              
                }
            })
        }
        else{
            const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
            if (!passwordCorrect) {
                console.log("Incorrect password");
                return res
                    .status(401)
                    .json({
                        errorMessage: "Wrong login information provided."
                    })
            }

            const token = auth.signToken(existingUser._id);
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: true
            }).status(200).json({
                success: true,
                user: {
                    userName: existingUser.userName,
                    email: existingUser.email              
                }
            })
        }
    }
    catch (err) {
        console.error(err);
        return res.status(500)
                .json({
                    success: false,
                    errorMessage: "please re-login again."
                })
    }
}

logoutUser = async (req, res) => {
    console.log("logoutUser");
    console.log(req);

    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none"
    }).send();
}

// getLoggedIn = async (req, res) => {
//     console.log("getLoggedIn");
//     if(req && req.body)
//         console.log(req.body);
//     try {
//         let userId = auth.verifyUser(req);
//         if (!userId) {
//             console.log("userId does not exist");
//             return res.status(200).json({
//                 loggedIn: false,
//                 user: null,
//                 errorMessage: "?"
//             })
//         }

//         const loggedInUser = await User.findOne({ _id: userId });
//         console.log("loggedInUser: " + loggedInUser);

//         return res.status(200).json({
//             loggedIn: true,
//             user: {
//                 userName: loggedInUser.userName,
//                 firstName: loggedInUser.firstName,
//                 lastName: loggedInUser.lastName,
//                 email: loggedInUser.email
//             }
//         })
//     } catch (err) {
//         console.log("err: " + err);
//         res.json(false);
//     }
// }

module.exports = {
    registerUser,
    loginUser,
    logoutUser
}