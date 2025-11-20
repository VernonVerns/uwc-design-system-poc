// a reusable component for loading state
import React from 'react';
import UWCWhiteLogo from '../assets/UWC-2025-trilingual-vertical-white.png';
import UWCDarkLogo from '../assets/UWC-2025-trilingual-vertical-alpha.png'

interface UWCLoaderProps {
    kind: "primary" | "secondary";
    glassy: boolean;

}

const UWCLoader: React.FC<UWCLoaderProps> = ({
    kind = "secondary",
    glassy = true,
}) => {

    const kindClasses: Record<"primary" | "secondary", string> = {
		primary: "light-color",
		secondary: "dark-color",
	};
    return (
        <div id="uwc_loader" 
            className={`
                ${kindClasses[kind]}
                ${glassy ? "glassy-bg" : ""}
            `}
        >
            <div className="loading-circle">
                {kind !== "primary" ? <img src={UWCWhiteLogo} alt="UWC Logo" className="uwc-spinner-logo" /> : <img src={UWCDarkLogo} alt='UWC Dark Logo' className="uwc-spinner-logo" />}
                <div className='spinner'>
                    <div className="spinner-line"></div>
                </div>
            </div>
            {/* <p>Loading...</p> */}
        </div>
    );
}
export default UWCLoader;