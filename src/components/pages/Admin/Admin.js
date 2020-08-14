import React, { useContext } from 'react'
import { Route, Switch } from 'react-router-dom'
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

const Admin = () => {
    const user = useContext(UserContext)
    const { setThemeColor, theme } = useContext(ThemeContext)
    const db = useContext(DbContext)

    return (
        <>
            <div className="header" style={{ backgroundColor: `rgba(${THEME[theme]})` }}>
                <div className="logoAdmin">reActive</div>
                    hello, {user.displayName}<button
                        className='logout'
                        value='back'
                        key='back'
                        onClick={user.logoutUser}
                    >
                        log out
                    </button>
            </div>
            <div className="sidebar-left" style={{ backgroundColor: `rgba(${THEME[theme]},.45)` }}>
                <CustomButton component={Link} to="/admin/questions">{adminNav[0]}</CustomButton>
                <CustomButton component={Link} to="/admin/quizes" linear="true">{adminNav[1]}</CustomButton>
                <CustomButton component={Link} to="/admin/students_results" linear="true">{adminNav[2]}</CustomButton>
                <CustomButton component={Link} to="/admin/settings" linear="true">{adminNav[3]}</CustomButton>
            </div>
            <div className="mainAdmin" style={{ backgroundColor: `rgba(${THEME[theme]},.15)` }}>
                <Switch >
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