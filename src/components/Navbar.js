import Button from '@mui/material/Button';
import { NavLink, Outlet } from 'react-router-dom';

import logo from '../images/logo.png'

export default function Navbar(props){
    return(
        <div className='body-wrapper'>
            <nav className="navigation-wrapper">
                <NavLink to="/"><img src={logo} alt="Logo"/></NavLink>
                <div className="buttons-wrapper">
                    <NavLink to="/"><Button variant="text">Home</Button></NavLink>
                    <NavLink to="catalogue"><Button variant="text">Catalogue</Button></NavLink>
                    <NavLink to="/#about-us"><Button variant="text">About Us</Button></NavLink>
                    <NavLink to="contact-us"><Button variant="text">Contact Us</Button></NavLink>
                </div>
            </nav>
            <Outlet />
        </div>

    )
}