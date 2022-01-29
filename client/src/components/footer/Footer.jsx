import React from 'react';
import './footer.css'
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';


const Footer = () =>  {
    return (
        <footer>
            <h2>Made with ❤️ by Rishi Srivastava.</h2>
            {/* <a href='https://youtube.com'><GitHubIcon/></a>
            <a href='https://youtube.com'><LinkedInIcon/></a> */}
            
            
            
            <a className="github" href="https://github.com/SrivastavaRishi" target="_blank" rel="noreferrer">
            <GitHubIcon/>
            </a>
            <a className="linkedIn" href="https://www.linkedin.com/in/rishi-srivastava-b60107185/" target="_blank" rel="noreferrer">
            <LinkedInIcon/>
            </a>
        </footer>
    )
}

export default Footer;