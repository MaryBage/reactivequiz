import React, { useContext } from 'react'
import './Admin.css'
import { THEME } from './context/types';


const Settings = ({ setThemeColor, id, theme }) => {

    const handleSelectChange = (e) => {
        e.preventDefault();
        setThemeColor(e.target.value, id)
    }

    return (
        <div className='settings'>
            <select className='themeSelect' onChange={handleSelectChange} name="theme">
                <option value="selectColor">select color</option>
                {Object.keys(THEME).map(color => <option
                    // selected={color == theme ? 'selected' : ''} 
                    value={color}
                    style={{ color: `rgb(${THEME[color]})` }}>
                    &#9670; {color}
                </option>)}
            </select>
        </div>
    )
}

export default Settings;