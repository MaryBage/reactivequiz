import React, { useContext, useEffect } from 'react'
import {Route, Switch} from 'react-router-dom'
import CustomButton from "../DetailedComponents/Buttons/CustomButton/CustomButton";
import { adminNav } from "../../../StaticContent";
import { Link } from "react-router-dom"
import './Admin.css'
import Quizes from './Quizes'
import Questions from "./Question/Questions"
import StuResults from './StuResults'
import Settings from './Settings'
import AddForm from './AddForm'
import { THEME } from './context/types'
import { ThemeContext } from './context/theme/themeContext'
import { UserContext } from './context/user/userContext';
import { DbContext } from './context/database/dbContext';
import Pdf from '../Pdf/Pdf'

const Admin = () => {
    const user = useContext(UserContext)
    const { setThemeColor, theme } = useContext(ThemeContext)
    const db = useContext(DbContext)

    useEffect(() => {
        db.getData();
        db.getQuizes();
        document.body.style.overflow ='visible';
      // eslint-disable-next-line
    }, [])

        
return (
    
      <>
            <div className="header" style={{backgroundColor: `rgba(${THEME[theme]})`}}>
                <div style={{width: '80%'}} ><Link to='/admin' className="logoAdmin">reActive</Link> </div>
                <div>
                   
                    <button 
                    className='logout'
                    value='back' 
                    key='back'
                    onClick = {user.logoutUser} 
                    >
                        log out
                    </button>
                </div>
            </div>
            <div className="sidebar-left" style={{backgroundColor: `rgba(${THEME[theme]},.45)`}}>
                    <CustomButton component={Link} to="/admin/questions">{adminNav[0]}({db.qty})</CustomButton>
                    <CustomButton component={Link} to="/admin/quizes" linear="true">{adminNav[1]}({db.quizesQty})</CustomButton>
                    <CustomButton component={Link} to="/admin/students_results" linear="true">{adminNav[2]}</CustomButton>
                    <CustomButton component={Link} to="/admin/settings" linear="true">{adminNav[3]}</CustomButton>
            </div>
            <div className="mainAdmin" style={{ backgroundColor: `rgba(${THEME[theme]},.15)` }}>
                <Switch >
                    <Route path='/admin/questions/:detail' render={() => <Questions id={user.id} />} />     
                    <Route path='/admin/questions' render={() => <Questions id={user.id} />} />
                    <Route path='/admin/quizes' component={Quizes} />
                    <Route path='/admin/students_results' component={StuResults} />
                    <Route path='/admin/settings' render={() => <Settings setThemeColor={setThemeColor} id={user.id} theme={theme} />} />
                    <Route path='/admin/' exact component={AddForm} />
                    
                </Switch>
            </div>
        </>
    )
}

export default Admin;