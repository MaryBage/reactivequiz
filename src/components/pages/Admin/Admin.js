import React from 'react'
import CustomButton from "../DetailedComponents/Buttons/CustomButton/CustomButton";
import {adminNav } from "../../../StaticContent";
import {Link} from "react-router-dom"
import './Admin.css'

export const Admin = () => {




    return (
        <>
            <div className="header">
                <div className="logoAdmin">reActive</div>
                <button 
                    className='logout' 
                    value='back' 
                    key='back'
                   // onClick = {} 
                    >
                        log out
                    </button>
                
            </div>
            <div className="sidebar-left">
                 <CustomButton component={Link} to="/myQuestions">{adminNav[0]}</CustomButton>
                 <CustomButton component={Link} to="/myQuizes" linear="true">{adminNav[1]}</CustomButton>
                 <CustomButton component={Link} to="/StudetsResults" linear="true">{adminNav[2]}</CustomButton>
                 <CustomButton component={Link} to="/settings" linear="true">{adminNav[3]}</CustomButton>

            </div>
            <div className="mainAdmin">



            </div>

            {/* <div className="footer">Footer</div> */}
        </>
        // <div className='sidenav'>

        //         
        // </div>


    )

}