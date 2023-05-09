import { Button, TextField } from "@mui/material";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { NavLink } from "react-router-dom";

export default function Register({isLogged, setIsLogged}) {

    function login() {
        setIsLogged(true);
    }

    return (
    <div className="register-wrapper">
        <div className="register-inputs">
            <DemoItem label="First Name:" className="input-wrapper">
                <TextField className='input' id="outlined-basic" variant="outlined" />
            </DemoItem>
            <DemoItem label="Last Name:">
                <TextField className='input' id="outlined-basic" variant="outlined"/>
            </DemoItem>
            <DemoItem label="Email:">
                <TextField className='input' id="outlined-basic" variant="outlined"/>
            </DemoItem>
            <DemoItem label="Phone Number:">
                <TextField className='input' id="outlined-basic" variant="outlined" />
            </DemoItem>
            <DemoItem label="Password:">
                <TextField className='input' id="outlined-basic" variant="outlined"/>
            </DemoItem>
            <DemoItem label="Repeat Password:">
                <TextField className='input' id="outlined-basic" variant="outlined" />
            </DemoItem>
        </div>
        <div className="buttons">
            <NavLink to="/"><Button className='button-register' variant="contained" onClick={login}>Register</Button></NavLink>
        </div>
    </div>
    )
}