import React, { useContext } from 'react';
import Settings from '../Settings';
import { ThemeContext } from '../context/theme/themeContext';
import { UserContext } from '../context/user/userContext';
import { Link } from "react-router-dom";


const SettingsMenu = () => {
    const user = useContext(UserContext);
    const { setThemeColor, theme } = useContext(ThemeContext);

    return (
        <div className="settingsWrapper">
            <div class="settingsContent">
                    <Settings setThemeColor={setThemeColor} id={user.id} theme={theme} />
                    <Link to="/admin/change_password"> <button>change password</button> </Link>
            </div>
        </div>
    )
}

export default SettingsMenu;