import React, {useContext} from 'react'
import './Admin.css'
import {THEME} from './context/types';
import {connect} from "react-redux";
import {updateSettings} from "../../../redux/user/user.actions"


const Settings = ({setThemeColor, id, theme, updateSettings}) => {

    const handleSelectChange = (e) => {
        e.preventDefault();
        updateSettings({theme: e.target.value})
        setThemeColor(e.target.value, id)
    }

    return (
        <div className='settings'>
            <select className='themeSelect' onChange={handleSelectChange} name="theme">
                <option value="selectColor">select color</option>
                {Object.keys(THEME).map(color => <option
                    // selected={color == theme ? 'selected' : ''} 
                    value={color}
                    style={{color: `rgb(${THEME[color]})`}}>
                    &#9670; {color}
                </option>)}
            </select>
        </div>
    )
}


const mapDispatchToProps = dispatch => ({
    updateSettings: (theme) => dispatch(updateSettings(theme)),
});

export default connect(null, mapDispatchToProps)(Settings);