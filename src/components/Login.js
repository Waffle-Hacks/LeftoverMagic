
import { Typography } from '@mui/material';

const Login= () => {
    const fontTheme = {
        color: 'black',
        margin: '2.5%'
    }
    return(
        <div className="loginForm" style={{
            backgroundColor: 'var(--primary-color)',
            padding: ' 50 px',
            borderRadius: '5px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            maxWidth: '400px',
            textAlign: 'center',
            margin: 'auto'
          }}>
            <Typography variant='h4' fontWeight="bold" sx={fontTheme}>Login</Typography>
            <form>
                <input
                type="text"
                placeholder="Username"
                />
                <br />
                <input
                type="password"
                placeholder="Password"
                />
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;