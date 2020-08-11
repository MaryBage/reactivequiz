import React, { useReducer, useContext } from 'react'
import { ThemeContext } from './themeContext'
import { themeReducer } from './themeReducer'
import { THEME } from "../types";
import { UserContext } from '../user/userContext';
import axios from '../../../../../axios/axios-quiz'


export const ThemeState = ({children})  => {
     const {theme} = useContext(UserContext)
    const [state, dispatch] = useReducer(themeReducer, theme)
   
    const setThemeColor = async (newTheme, id) => {
        console.log('from themestate',newTheme, id)
        axios.post('/theme.php',btoa(JSON.stringify({theme: newTheme, id: id })))
        .then(res => {
            let payload = res.data.user.theme;
            dispatch({type: THEME, payload})

        })
    }
    return (
        <ThemeContext.Provider value={{setThemeColor, theme: state}}>
            {children}
        </ThemeContext.Provider>
    )
}