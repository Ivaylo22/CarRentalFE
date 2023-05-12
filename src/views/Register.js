import { Button, TextField } from "@mui/material";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { NavLink } from "react-router-dom";

export default function Register({isLogged, setIsLogged}) {
    function register(event) {
      
        const firstNameInput = document.getElementById('first-name-input');
        const lastNameInput = document.getElementById('last-name-input');
        const emailInput = document.getElementById('email-input');
        const phoneInput = document.getElementById('phone-input');
        const passwordInput = document.getElementById('password-input');
        const repeatPasswordInput = document.getElementById('repeat-password-input');

        if (
            firstNameInput.value.trim() === '' ||
            lastNameInput.value.trim() === '' ||
            emailInput.value.trim() === '' ||
            phoneInput.value.trim() === '' ||
            passwordInput.value.trim() === '' ||
            repeatPasswordInput.value.trim() === ''
        ){
            alert('Please fill in all fields.');
            event.preventDefault();
            return;
        }
      
        // Check if passwords match
        if (passwordInput.value !== repeatPasswordInput.value) {
            alert('Passwords do not match.');
            event.preventDefault();
            return;
        }
      
        // Check if email is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            alert('Invalid email address.');
            event.preventDefault();
            return;
        }
      
        // Check if phone number is valid
        const phoneNumber = phoneInput.value.trim();
        if (!/^\d{10}$/.test(phoneNumber)) {
            alert('Invalid phone number. Please enter a 10-digit number.');
            event.preventDefault();
            return;
        }
      
        setIsLogged(true);

        firstNameInput.value = '';
        lastNameInput.value = '';
        emailInput.value = '';
        phoneInput.value = '';
        passwordInput.value = '';
        repeatPasswordInput.value = '';
      
        alert('Registration successful!');
    }

    return (
        <div className="register-visual-height">
            <div className="register-wrapper">
                <div className="register-inputs">
                    <DemoItem label="First Name:" className="input-wrapper">
                        <TextField className='input' id="first-name-input" variant="outlined" />
                    </DemoItem>
                    <DemoItem label="Last Name:">
                        <TextField className='input' id="last-name-input" variant="outlined"/>
                    </DemoItem>
                    <DemoItem label="Email:">
                        <TextField className='input' id="email-input" variant="outlined" type="email" />
                    </DemoItem>
                    <DemoItem label="Phone Number:">
                        <TextField className='input' id="phone-input" variant="outlined" />
                    </DemoItem>
                    <DemoItem label="Password:">
                        <TextField className='input' id="password-input" variant="outlined" type="password" />
                    </DemoItem>
                    <DemoItem label="Repeat Password:">
                        <TextField className='input' id="repeat-password-input" variant="outlined" type="password" />
                    </DemoItem>
                </div>
                <div className="buttons">
                    <NavLink to="/">
                        <Button className='button-register' variant="contained" onClick={register}>Register</Button>
                    </NavLink>
                </div>
        </div>
      </div>
    )
}