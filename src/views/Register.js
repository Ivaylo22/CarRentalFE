import { useState } from "react";
import { NavLink } from "react-router-dom";

import { Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import WarningIcon from '@mui/icons-material/Warning';

export default function Register({isLogged, setIsLogged}) {
    const [openDialog, setOpenDialog] = useState(false);

    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPhone, setErrorPhone] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleEmailChange = (e) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);
    
        if (!validateEmail(inputEmail)) {
            setErrorEmail('Invalid email format');
        } else {
            setErrorEmail('');
        }
      };
    
    const validateEmail = (email) => {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handlePhoneChange = (e) => {
        const inputPhoneNumber = e.target.value;
        setPhoneNumber(inputPhoneNumber);
    
        if (!validatePhoneNumber(inputPhoneNumber)) {
            setErrorPhone('Please enter a 10-digit number.');
        } else {
            setErrorPhone('');
        }
      };
    
      const validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phoneNumber);
      };

      const handlePasswordChange = (e) => {
        const inputPassword = e.target.value;
        setPassword(inputPassword);
    
        if (!validatePassword(inputPassword)) {
            setErrorPassword('Invalid password format. Please enter a password with at least 6 characters, including uppercase, lowercase, and a digit.');
        } else {
            setErrorPassword('');
        }
      };
    
      const validatePassword = (password) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        return passwordRegex.test(password);
      };

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
        
        event.preventDefault();
        setOpenDialog(true);
    }

    return (
        <div className="register-wrapper">
            <div className="register-inputs">
                <DemoItem label="Първо име: *" className="input-wrapper">
                    <TextField className='input' id="first-name-input" variant="outlined" />
                </DemoItem>
                <DemoItem label="Фамилия: *">
                    <TextField className='input' id="last-name-input" variant="outlined"/>
                </DemoItem>
                <DemoItem label="Имейл: *">
                    <TextField className='input' id="email-input" variant="outlined" type="email" onChange={handleEmailChange} value={email}/>
                    {errorEmail && <span className="error-message italic"><WarningIcon className="warning-icon"/>{errorEmail}</span>}
                </DemoItem>
                <DemoItem label="Телефон: *">
                    <TextField className='input' id="phone-input" variant="outlined" value={phoneNumber} onChange={handlePhoneChange} type="tel"/>
                    {errorPhone && <span className="error-message italic"><WarningIcon className="warning-icon"/>{errorPhone}</span>}
                </DemoItem>
                <DemoItem label="Парола: *">
                    <TextField className='input' id="password-input" variant="outlined" type="password" value={password} onChange={handlePasswordChange}/>
                    {errorPassword && <span className="error-message italic"><WarningIcon className="warning-icon"/>{errorPassword}</span>}
                </DemoItem>
                <DemoItem label="Повтори парола: *">
                    <TextField className='input' id="repeat-password-input" variant="outlined" type="password" />
    
                </DemoItem>
            </div>
            <div className="buttons">
                <NavLink to="/">
                    <Button className='button-register' variant="contained" onClick={register}>Регистрирай се</Button>
                </NavLink>
            </div>
        <Dialog open={openDialog} onClose={handleCloseDialog} className="dialog-box">
            <DialogTitle>Успешна регистрация</DialogTitle>
            <DialogContent>
                <p>Вашата регистрация беше успешна, благодарим Ви, че избрахте нас</p>
                <div className="dialog-buttons">
                    <Button className='button-login' variant="contained"><NavLink to={"/"} className="button-text">OK</NavLink></Button>
                </div>
            </DialogContent>
        </Dialog>
      </div>
    )
}