import Button from '@mui/material/Button';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import logo from '../images/logo.png'
import Footer from './Footer';

export default function Navbar({isLogged, setIsLogged}){
   const location = useLocation();

    function logout() {
        setIsLogged(false)
    }

    return(
        <div className='body-wrapper'>
            <nav className="navigation-wrapper">
                <NavLink to="/"><img src={logo} alt="Logo"/></NavLink>
                <div className="buttons-wrapper">
                    <NavLink to="/" className={location.pathname === "/" ? "active" : "non-active"}><Button variant="text">Начало</Button></NavLink>
                    <NavLink to="catalogue" className={location.pathname === "/catalogue" ? "active" : "non-active"}><Button variant="text">Каталог</Button></NavLink>
                    <NavLink to="/#about-us"  className={location.pathname === "/" ? "non-active" : ""}><Button variant="text">За нас</Button></NavLink>
                    <NavLink to="/#contact-us"  className={location.pathname === "/" ? "non-active" : ""}><Button variant="text">Контакти</Button></NavLink>
                    {!isLogged 
                        ? <NavLink to="/login" className={location.pathname === "/" ? "non-active" : ""}><Button>Впиши се <p>&nbsp;&nbsp;</p> <LoginIcon fontSize='small' className='log-icon'/></Button></NavLink> 
                        : <NavLink to="/" className={location.pathname === "/" ? "non-active" : ""}><Button onClick={logout}>Излез <p>&nbsp;&nbsp;</p> <LogoutIcon fontSize='small' className='log-icon'/></Button></NavLink> }
                    
                </div>
            </nav>
            <Outlet />
            <Footer/>
        </div>

    )
}