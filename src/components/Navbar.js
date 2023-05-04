import Button from '@mui/material/Button';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

import logo from '../images/logo.png'

export default function Navbar(props){
   const location = useLocation();
    return(
        <div className='body-wrapper'>
            <nav className="navigation-wrapper">
                <NavLink to="/"><img src={logo} alt="Logo"/></NavLink>
                <div className="buttons-wrapper">
                    <NavLink to="/" className={location.pathname === "/" ? "active" : "non-active"}><Button variant="text">Home</Button></NavLink>
                    <NavLink to="catalogue" className={location.pathname === "/catalogue" ? "active" : "non-active"}><Button variant="text">Catalogue</Button></NavLink>
                    <NavLink to="/#about-us"  className={location.pathname === "/" ? "non-active" : ""}><Button variant="text">About Us</Button></NavLink>
                    <NavLink to="/#contact-us"  className={location.pathname === "/" ? "non-active" : ""}><Button variant="text">Contact Us</Button></NavLink>
                </div>
            </nav>
            <Outlet />
        </div>

    )
}