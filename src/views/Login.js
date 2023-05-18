import { Button, TextField } from "@mui/material";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { NavLink } from "react-router-dom";

export default function Login({isLogged, setIsLogged}){
    function login (event){
        const nameInput = document.getElementById('name-input');
        const passwordInput = document.getElementById('password-input');

        if (nameInput.value.trim() === '' || passwordInput.value.trim() === '') {
            event.preventDefault();
            alert('Please fill in both the name and password fields.');
        } else {
            setIsLogged(true);
        }
        
    }

    function googleLogin (event) {
        setIsLogged(true);
    }

    return (
        <div className="login-wrapper">
            <div className="credentials">
                <DemoItem label="Name:">
                    <TextField className='input' id="name-input" variant="outlined" />
                </DemoItem>
                <DemoItem label="Password:">
                    <TextField className='input' id="password-input" variant="outlined" type="password" />
                </DemoItem>
            </div>
            <div className="buttons">
                <NavLink to="/">
                    <Button className='button-login' variant="contained" onClick={login}>LOG IN</Button>
                </NavLink>
                <NavLink to="/">
                    <Button className='button-google' variant="contained" onClick={googleLogin}>G+ Log In with Google</Button>
                </NavLink>
            </div>
            <NavLink to="/register" className="register">Or Register</NavLink>
        </div>
    )
}