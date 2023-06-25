import { UserContext } from '../user';
import { Typography } from '@mui/material';
import { useContext, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';

const CheckBox = (props) => {
    const { name } = props;
    const { user } = useContext(UserContext);
    const [checked, setChecked] = useState(false);

    function handleChange(event){
        event.stopPropagation();
        console.log(checked);
        if(user){
            if(!checked){
                user.select(name);
            }
            else{
                user.deselect(name);
            }
        }
        setChecked(!checked);
    }

    return <div className='container' id='checkbox-container'>
        <Checkbox
            checked={user && user.chosen(name)}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
            sx={{ '& .MuiSvgIcon-root': { fontSize: 75 } }}
        />
        <Typography variant='h4'>{name}</Typography>
    </div>
}
export default CheckBox;