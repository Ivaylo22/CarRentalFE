import { Button, TextField } from "@mui/material";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { NavLink } from "react-router-dom";

export default function Login({isLogged, setIsLogged}){
    function login (){
        setIsLogged(true);
    }

    return (
        <div className="login-wrapper">
            <div className="credentials">
                <DemoItem label="Name:">
                    <TextField className='input' id="outlined-basic" variant="outlined" />
                </DemoItem>
                <DemoItem label="Password:">
                    <TextField className='input' id="outlined-basic" variant="outlined"/>
                </DemoItem>
            </div>
            <div className="buttons">
                <NavLink to="/"><Button className='button-login' variant="contained" onClick={login}>LOG IN</Button></NavLink>
                <NavLink to="/"><Button className='button-google' variant="contained" onClick={login}>G+ Log In with Google</Button></NavLink>
            </div>
                <NavLink to="/register" className="register">Or Register</NavLink>
        </div>
    )
}