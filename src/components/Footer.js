import { NavLink } from 'react-router-dom'
import logo from '../images/logo.png'

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Footer() {
    return (
        <div className="footer-wrapper">
            <NavLink to="/"><img src={logo} alt="Logo"/></NavLink>
            <div className='socials-wrapper'>
                <p>Find us on social media</p>
                <div className='socials'>
                    <a href='https://www.facebook.com'><FacebookIcon className='social' fontSize='large'/></a>
                    <a href='https://www.instagram.com'><InstagramIcon  className='social' fontSize='large'/></a>
                    <a href='https://www.linkedin.com'><LinkedInIcon  className='social' fontSize='large'/></a>
                    <a href='https://www.twitter.com'><TwitterIcon  className='social' fontSize='large'/></a>
                </div>
            </div>
            <p className='rights-reserved'>All rights reserved © 2023</p>

        </div>
    )
}