import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export const ControllerContext = createContext({});

export const ControllerActionType = {
    OPEN_ADD_INGREDIENTS_MODAL: "OPEN_ADD_INGREDIENTS_MODAL",
    CLOSE_ADD_INGREDIENTS_MODAL: "CLOSE_ADD_INGREDIENTS_MODAL",
}

function ControllerContextProvider(props) {
    const navigate = useNavigate();

    const [controller, setController] = useState({
        isAddModalOpen: false
    });

    const controllerReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case ControllerActionType.OPEN_ADD_INGREDIENTS_MODAL: {
                return setController({
                    isAddModalOpen: true
                });
            }
            case ControllerActionType.CLOSE_MODAL: {
                return setController({
                    isAddModalOpen: false
                });
            }
            default:
                return controller;
        }
    }

    controller.openAddModal = function () {
        controllerReducer({
            type: ControllerActionType.OPEN_ADD_INGREDIENTS_MODAL,
            payload: {}
        });
    }

    controller.hideModal = function () {
        controllerReducer({
            type: ControllerActionType.CLOSE_MODAL,
            payload: {}
        });
    }


    return (
        <ControllerContext.Provider value={{ controller }}>
            {props.children}
        </ControllerContext.Provider>
    );
}

export default ControllerContext;
export { ControllerContextProvider };