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
                <DemoItem label="ДАТА НА ЗАЕМАНЕ">
                    <DatePicker 
                        onChange={(date) => setStartDate(date)}
                    />
                </DemoItem>
                <DemoItem label="ДАТА НА ВРЪЩАНЕ">
                    <DatePicker 
                        onChange={(date) => setDropDate(date)}
                        minDate={startDate}
                    />
                </DemoItem>
            </LocalizationProvider>
            <DemoItem label="МАКСИМАЛНА ЦЕНА">
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
            <NavLink to="catalogue" onClick={handleClick}><Button className='button-find' variant="contained">Намери</Button></NavLink>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Невалидни дати</DialogTitle>
                <DialogContent>
                    <p>Датата на връщане трябва да е след датата на наемане.</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}