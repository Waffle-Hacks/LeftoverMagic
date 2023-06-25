import React, { useContext, useState } from 'react';
import { ControllerContext } from '../controller';
import UserInput from './UserInput';

import { Modal, Button, Typography, TextField } from '@mui/material';
import axios from 'axios'

export default function AddIngredientModal() {
    const [ingredient, setIngredient] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);

    const { controller } = useContext(ControllerContext);

    
    function handleIngredientUpdate(event){
        event.stopPropagation();
        setIngredient(event.target.value);
    }

    const handleConfirm = async(event)=>{
        event.preventDefault();
        event.stopPropagation();
        console.log(ingredient);
        console.log(selectedDate);
        //Post request
        controller.hideModal();
    }

    function handleCloseModal(event) {
        event.stopPropagation();
        console.log("close modal")
        controller.hideModal();
    }

    // const handleDateSelect = (date) => {
    //     setSelectedDate(date);
    // };

    

    return (
        <Modal
            open={controller && controller.isAddModalOpen}
        >
            <div className='modalContainer'>
                <div className='modal'>
                    <div className='container' id='modal-item'>
                        <Typography variant='h4'>Enter ingredient:</Typography>
                        <UserInput placeholder='Ingredient Name' handleUpdate={handleIngredientUpdate} value={ingredient}/>
                    </div>
                    {/* <div className='container' id='modal-item'>
                        <Typography variant='h4'>Choose purchase date:</Typography>
                    </div> */}
                    <div className='container'>
                        <Button onClick={handleConfirm}>Confirm</Button>
                        <Button onClick={handleCloseModal}>Close</Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}