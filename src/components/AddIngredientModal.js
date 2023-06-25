import React, { useContext, useState } from 'react';
import { UserContext } from '../user';
import UserInput from './UserInput';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Modal, Button, Typography } from '@mui/material';

export default function AddIngredientModal() {
    const [ingredient, setIngredient] = useState('');
    const [date, setDate] = useState(new Date());

    const { user } = useContext(UserContext);

    const btnTheme = {
        basic: {
            fontSize: '30px',
            padding: '0 5vw',
            margin: '0 5%',
            borderRadius: '75px',
            textTransform: 'capitalize',
            '&.MuiButton-root:hover':{
                backgroundColor: 'var(--primary-hover-color)',
                color: 'white'
            }
        },
        outlined: {
            color: 'var(--primary-color)',
            borderColor: 'var(--primary-color)'
        }, 
        contained:{
            backgroundColor: 'var(--primary-color)'
        }
    }
    
    function handleIngredientUpdate(event){
        event.stopPropagation();
        setIngredient(event.target.value);
    }

    function handleConfirm(event) {
        event.stopPropagation();
        if(ingredient && ingredient !== null && ingredient.length > 0){
            user.addIngredient(ingredient, date);
            setIngredient('');
            setDate(new Date());
        }
    }

    function handleCancel(event) {
        event.stopPropagation();
        console.log("close modal")
        user.hideModal();
    }

    return (
        <Modal
            open={user && user.isAddModalOpen}
        >
            <div className='modalContainer'>
                <div className='modal'>
                    <div className='container' id='modal-item'>
                        <Typography variant='h4'>Enter ingredient:</Typography>
                        <UserInput placeholder='Ingredient Name' handleUpdate={handleIngredientUpdate} value={ingredient}/>
                    </div>
                    <div className='container' id='modal-item'>
                        <Typography variant='h4'>Choose purchase date:</Typography>
                        <DatePicker selected={date} onChange={(date) => setDate(date)} />
                    </div>
                    <div className='container'>
                        <Button variant='outlined' sx={[ btnTheme.basic, btnTheme.outlined ]} onClick={handleCancel}>Cancel</Button>
                        <Button variant='contained' sx={[ btnTheme.basic, btnTheme.contained ]} onClick={handleConfirm}>Confirm</Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}