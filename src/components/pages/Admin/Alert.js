import React, {useContext} from 'react'
import { AlertContext } from './context/alert/alertContext'

export const Alert = () => {

    const {alert, hide} = useContext(AlertContext);
    if(!alert) return null

    return (
        // <button onClick = {hide}>alert</button>
    )
}