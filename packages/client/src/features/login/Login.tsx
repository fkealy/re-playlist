import React from "react";
import LoginSVG from './LoginSvg';

const Login: React.FC<{}> = () => {

	return (
        	<LoginSVG onClick={() => { window.location.href = '/login'}} />
	)
}
export default Login;
