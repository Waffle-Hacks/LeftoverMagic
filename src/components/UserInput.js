import { TextField } from '@mui/material';

const UserInput = ( props ) => {
    const { placeholder, handleUpdate, value } = props;
    const textFieldTheme = {
        width: "60vh",
        marginTop: "2.5%"
    }
    
    return <TextField
        variant='filled'
        placeholder={placeholder}
        sx={ textFieldTheme }
        inputProps={{style: {fontSize: 20}}}
        onChange={handleUpdate}
        value={value}
    />
}

export default UserInput;