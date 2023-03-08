import React from "react";
import LoginSVG from './LoginSvg';
import LogoSvg from './LogoSvg';

const Login: React.FC<{}> = () => {

	return (
		<div className="login">
			<LogoSvg/>
        	<LoginSVG onClick={() => { window.location.href = '/login'}} />
      	</div>
	)
}
export default Login;
