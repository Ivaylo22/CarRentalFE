import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Autocomplete, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { prices } from '../Helpers';
import { NavLink } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';


export default function HomeDatePicker({startDate,dropDate, setStartDate, setDropDate, setMaxPrice}) {
    const [openDialog, setOpenDialog] = useState(false);

    const handleClick = (event) => {
        if (startDate && dropDate && dropDate.isBefore(startDate)) {
          event.preventDefault(); // prevent the NavLink from performing the redirect
          setOpenDialog(true); // show the dialog
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <div className="dates-form">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoItem label="PICK-UP DATE">
                    <DatePicker 
                        onChange={(date) => setStartDate(date)}
                    />
                </DemoItem>
                <DemoItem label="DROP-OFF DATE">
                    <DatePicker 
                        onChange={(date) => setDropDate(date)}
                        minDate={startDate}
                    />
                </DemoItem>
            </LocalizationProvider>
            <DemoItem label="Max price">
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={prices}
                renderInput={(params) => <TextField {...params}/>}       
                onChange={(event, newMaxPrice) => {
                    setMaxPrice(newMaxPrice);
                }}   
            />  
            </DemoItem>
            <NavLink to="catalogue" onClick={handleClick}><Button className='button-find' variant="contained">Find it now</Button></NavLink>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Invalid Date Selection</DialogTitle>
                <DialogContent>
                    <p>The drop date must be after the start date.</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}