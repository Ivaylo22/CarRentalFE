import { Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Confirmation({isLogged, carId, totalPrice, startDate, dropDate, setStartDate, setDropDate, setCarId, setTotalPrice}) {
    const [openDialog, setOpenDialog] = useState(false);
    const [thankYouDialogOpen, setThankYouDialogOpen] = useState(false);
    const [customerEmail, setCustomerEmail] = useState("");

    function sendData() {
        const rentalDto = {};
        rentalDto.carVin = carId;
        rentalDto.price = totalPrice;
        rentalDto.customerEmail = customerEmail;
        rentalDto.startDate = dayjs(startDate).format("YYYY-MM-DD");
        rentalDto.endDate = dayjs(dropDate).format("YYYY-MM-DD");
        
        fetch("http://localhost:8081/rent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(rentalDto)
            })
            .then(response => {
                if (response.ok) {
                    setStartDate(null);
                    setDropDate(null);
                    setTotalPrice(0);
                    setCarId(0);
                    setOpenDialog(false);
                    setThankYouDialogOpen(true);
                    return response.json();
                } 
                else 
                {
                    throw new Error("Request failed.");
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleCloseThankYouDialog = () => {
        setThankYouDialogOpen(false);
    };
   
    function rent(event) {
        const firstName = document.getElementById("first-name-input").value;
        const lastName = document.getElementById("last-name-input").value;
        const email = document.getElementById("email-input").value;
        const phone = document.getElementById("phone-input").value;

        if (firstName && lastName && email && phone) {
            if (phone.length === 10) {
                event.preventDefault();
                setCustomerEmail(email)
                setOpenDialog(true);
            } 
            else {
                event.preventDefault();
                alert("Incorrect phone number");
            }
        } 
        else 
        {
            event.preventDefault();
            alert("Please fill in all fields.");
        }
    }

    return (
        <div className="confirmation-wrapper">
            <div className="confirmation-inputs">
                <DemoItem label="First Name: *" className="input-wrapper">
                    <TextField
                    className="input"
                    id="first-name-input"
                    variant="outlined"
                    defaultValue={isLogged ?"Georgi" : ""}
                    />
                </DemoItem>
                <DemoItem label="Middle Name:">
                    <TextField
                    className="input"
                    id="middle-name-input"
                    variant="outlined"
                    defaultValue={isLogged ?"Georgiev" : ""}
                    />
                </DemoItem>
                <DemoItem label="Last Name: *">
                    <TextField
                    className="input"
                    id="last-name-input"
                    variant="outlined"
                    defaultValue={isLogged ? 'Georgiev' : ''}
                    />
                </DemoItem>
                <DemoItem label="Email: *">
                    <TextField
                    className="input"
                    id="email-input"
                    variant="outlined"
                    type="email"
                    defaultValue={isLogged ? 'geshaskesha@abv.bg' : ''}
                    />
                </DemoItem>
                <DemoItem label="Phone Number: *">
                    <TextField
                    className="input"
                    id="phone-input"
                    variant="outlined"
                    defaultValue={isLogged ? '0884904162' : ''}
                    />
                </DemoItem>
                <DemoItem label="Nationality:">
                    <TextField
                    className="input"
                    id="nationality-input"
                    variant="outlined"
                    defaultValue={isLogged ? 'Bulgarian' : ''}
                    />
                </DemoItem>
                <div className="confirmation-question">
                    <DemoItem label="Additional Information">
                        <textarea className="fixed-textarea" rows={3} />
                    </DemoItem>
                </div>
            </div>
    
            <div className="buttons">
            <NavLink to="/">
                <Button className="button-confirmation" variant="contained" onClick={rent}>RENT</Button>
            </NavLink>
            </div>
            <Dialog open={openDialog} onClose={handleCloseDialog} className="dialog-box">
                <DialogTitle>Rent Summary</DialogTitle>
                <DialogContent>
                    <p className="dialog-text">Total Price: {totalPrice} BGN</p>
                    <p className="dialog-text">Your Email: {customerEmail}</p>
                    <p className="dialog-text">Start Date: {dayjs(startDate).format("YYYY-MM-DD")}</p>
                    <p className="dialog-text">Drop Date: {dayjs(dropDate).format("YYYY-MM-DD")}</p>
                    <div className="dialog-buttons">
                        <Button className='button-login' variant="contained" onClick={handleCloseDialog} >Cancel</Button>
                        <Button className='button-login' variant="contained" onClick={sendData}>RENT</Button>
                    </div>                 
                </DialogContent>
            </Dialog>

            <Dialog open={thankYouDialogOpen} onClose={handleCloseThankYouDialog} className="dialog-box">
                <DialogTitle>Thank You for choosing RIDE HIVE</DialogTitle>
                <DialogContent>
                    <p className="dialog-text">We appreciate your business!</p> 
                    <div className="dialog-buttons">
                        <Button className='button-login' variant="contained" onClick={sendData}><NavLink to={"/"} className="button-text">HOME</NavLink></Button>
                    </div> 
                </DialogContent>
            </Dialog>
        </div>
    );
}