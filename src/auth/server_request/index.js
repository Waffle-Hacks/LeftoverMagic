import axios from 'axios'

// set up backend side
axios.defaults.withCredentials = true;

const serverSide = axios.create({
    baseURL: 'http://localhost:4000/auth',
})

export const registerUser = (userName, email, password, confirmPassword) => {
    return serverSide.post(`/register/`, {
        userName : userName,
        email : email,
        password : password,
        confirmPassword: confirmPassword,
    })
}

export const loginUser = (emailOrPw, password) => {
    return serverSide.post(`/login/`, {
        emailOrPw: emailOrPw,
        password : password,
    })
}

export const logoutUser = () => {
    return serverSide.get(`/logout/`)
}

const server = {
    registerUser,
    loginUser,
    logoutUser,
}

export default server