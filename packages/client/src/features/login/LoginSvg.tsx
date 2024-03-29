import React from "react";
import LoginSvgProps from "./LoginSvgProps";
import { useColorScheme } from "@mui/joy/styles";

export const LoginSvg = (props: LoginSvgProps) => {
  const { onClick, ...otherProps } = props;
  const colorScheme = useColorScheme();

  const bgColor = colorScheme.mode === "dark" ? "#FFFFFF" : "#000000";
  const fillColor = colorScheme.mode === "dark" ? "#000000" : "#FFFFFF";

  return (
	<div className="login" onClick={onClick}>
	<svg
		version="1.1"
		id="Layer_1"
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		viewBox="0 0 270 50"
		preserveAspectRatio="xMidYMid meet"
		style={{ width: '100%', height: '100%' }}
		xmlSpace="preserve"
	>
        <g className="spotify-btn">
          <path
            className="main"
            d="M270,25c0,13.8-11.2,25-25,25H25C11.2,50,0,38.8,0,25l0,0C0,11.2,11.2,0,25,0h220C258.8,0,270,11.2,270,25
                    L270,25z"
            fill={bgColor}
          />
          <g>
            <g>
              <g>
                <g>
                  <path
                    fill={fillColor} d="M40.9,13.1c-6.3,0-11.4,5.1-11.4,11.4c0,6.3,5.1,11.4,11.4,11.4c6.3,0,11.4-5.1,11.4-11.4
						C52.2,18.2,47.1,13.1,40.9,13.1z M46.1,29.5c-0.2,0.3-0.6,0.4-1,0.2c-2.7-1.6-6-2-10-1.1c-0.4,0.1-0.8-0.2-0.8-0.5
						c-0.1-0.4,0.2-0.8,0.5-0.8c4.3-1,8-0.6,11,1.3C46.2,28.7,46.3,29.1,46.1,29.5z M47.5,26.4c-0.3,0.4-0.8,0.5-1.2,0.3
						c-3.1-1.9-7.7-2.4-11.3-1.3c-0.5,0.1-1-0.1-1.1-0.6c-0.1-0.5,0.1-1,0.6-1.1c4.1-1.3,9.3-0.6,12.8,1.5
						C47.6,25.4,47.7,26,47.5,26.4z M47.6,23.2c-3.7-2.2-9.7-2.4-13.2-1.3c-0.6,0.2-1.2-0.1-1.3-0.7c-0.2-0.6,0.1-1.2,0.7-1.3
						c4-1.2,10.7-1,14.9,1.5c0.5,0.3,0.7,1,0.4,1.5C48.7,23.3,48.1,23.5,47.6,23.2z"/>
				</g>
			</g>
		</g>
		<g>
			<path fill={fillColor} d="M63.2,30.6V19.9h1.9v9h4.7v1.6H63.2z"/>
			<path fill={fillColor} d="M71.3,25.3c0-3.2,2.3-5.5,5.5-5.5c3.2,0,5.5,2.3,5.5,5.5s-2.3,5.5-5.5,5.5C73.6,30.8,71.3,28.5,71.3,25.3
				z M80.3,25.3c0-2.2-1.4-3.9-3.5-3.9c-2.2,0-3.5,1.6-3.5,3.9c0,2.2,1.4,3.9,3.5,3.9C78.9,29.1,80.3,27.5,80.3,25.3z"/>
			<path fill={fillColor} d="M84.4,25.3c0-3.4,2.5-5.5,5.6-5.5c2.1,0,3.4,1,4.3,2.2l-1.5,0.9c-0.6-0.8-1.6-1.4-2.8-1.4
				c-2.1,0-3.7,1.6-3.7,3.9c0,2.2,1.6,3.9,3.7,3.9c1.1,0,2-0.5,2.5-1v-1.6h-3.2v-1.6h5.1v4c-1,1.2-2.5,2-4.4,2
				C86.9,30.8,84.4,28.6,84.4,25.3z"/>
			<path fill={fillColor} d="M102,30.6V19.9h1.9v10.7H102z"/>
			<path fill={fillColor} d="M114.4,30.6l-5.6-7.6v7.6H107V19.9h1.9l5.5,7.4v-7.4h1.9v10.7H114.4z"/>
			<path fill={fillColor} d="M132.4,30.6l-2.1-7.9l-2.1,7.9h-2l-3-10.7h2.1l2.1,8.2l2.2-8.2h1.5l2.2,8.2l2.1-8.2h2.1l-3.1,10.7H132.4z
				"/>
			<path fill={fillColor} d="M139.5,30.6V19.9h1.9v10.7H139.5z"/>
			<path fill={fillColor} d="M147,30.6v-9h-3.2v-1.6h8.3v1.6h-3.2v9H147z"/>
			<path fill={fillColor} d="M161.9,30.6v-4.7h-5.6v4.7h-1.9V19.9h1.9v4.4h5.6v-4.4h1.9v10.7H161.9z"/>
			<path fill={fillColor} d="M171,29.1l1.1-1.5c0.7,0.8,1.9,1.5,3.4,1.5c1.5,0,2.1-0.8,2.1-1.5c0-2.2-6.2-0.8-6.2-4.8
				c0-1.8,1.5-3.1,3.9-3.1c1.6,0,3,0.5,4,1.5l-1.1,1.4c-0.8-0.8-2-1.2-3.1-1.2c-1.1,0-1.8,0.5-1.8,1.3c0,2,6.2,0.8,6.2,4.7
				c0,1.8-1.3,3.3-4.1,3.3C173.4,30.8,172,30.1,171,29.1z"/>
			<path fill={fillColor} d="M182,30.6V19.9h4.7c2.2,0,3.5,1.5,3.5,3.3c0,1.8-1.2,3.3-3.5,3.3h-2.8v4H182z M188.3,23.3
				c0-1-0.8-1.7-1.8-1.7h-2.6V25h2.6C187.5,25,188.3,24.3,188.3,23.3z"/>
			<path fill={fillColor} d="M192.1,25.3c0-3.2,2.3-5.5,5.5-5.5c3.2,0,5.5,2.3,5.5,5.5s-2.3,5.5-5.5,5.5
				C194.4,30.8,192.1,28.5,192.1,25.3z M201.1,25.3c0-2.2-1.4-3.9-3.5-3.9c-2.2,0-3.5,1.6-3.5,3.9c0,2.2,1.4,3.9,3.5,3.9
				C199.7,29.1,201.1,27.5,201.1,25.3z"/>
			<path fill={fillColor} d="M207.8,30.6v-9h-3.2v-1.6h8.3v1.6h-3.2v9H207.8z"/>
			<path fill={fillColor} d="M215.3,30.6V19.9h1.9v10.7H215.3z"/>
			<path fill={fillColor} d="M220.2,30.6V19.9h7.3v1.6h-5.4v2.8h5.3V26h-5.3v4.6H220.2z"/>
			<path fill={fillColor} d="M233.1,30.6v-4.4l-4.1-6.2h2.1l2.9,4.6l2.9-4.6h2.1l-4.1,6.2v4.4H233.1z"/>
		</g>
	</g>
</g>
</svg>
</div>
	)
}
export default LoginSvg;