import React from "react";
import { IconButton } from "@mui/joy";
import LogoutSharpIcon from '@mui/icons-material/Logout';
import { useAppDispatch } from "../../app/hooks";


const Logout: React.FC<{}> = () => {
    const dispatch = useAppDispatch();
	return (
        <div className="logout">
            <IconButton aria-label="logout" color="neutral" variant="plain" onClick={() => { 
                    dispatch({type: 'auth/setToken', payload: '' });
                    window.location.href = '/logout'}}>
                <LogoutSharpIcon />
            </IconButton>
        </div>	)
}
export default Logout;