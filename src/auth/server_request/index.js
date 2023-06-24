import axios from 'axios'

// set up backend side
axios.defaults.withCredentials = true;
const serverSide = axios.create({
    baseURL: 'http://localhost:4000/auth',
})

export const registerUser = (userName, email, password) => {
    return serverSide.post(`/register/`, {
        userName : userName,
        email : email,
        password : password,
    })
}
// const server = {
//     registerUser,
// }

// export default server
