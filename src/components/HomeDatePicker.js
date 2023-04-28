import dayjs from 'dayjs';

import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Autocomplete, Button, TextField } from '@mui/material';
import { bulgarianCities } from '../Helpers';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';


export default function HomeDatePicker({setDropDate, setStartDate}) {

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleDropDateChange = (date) => {
        setDropDate(date);
    };

    return (
        <div className="dates-form">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoItem label="PICK-UP DATE">
                    <DatePicker 
                        defaultValue={dayjs()} 
                        onChange={handleStartDateChange}
                    />
                </DemoItem>
                <DemoItem label="DROP-OFF DATE">
                    <DatePicker 
                        defaultValue={dayjs()} 
                        onChange={handleDropDateChange}
                    />
                </DemoItem>
            </LocalizationProvider>
            <DemoItem label="City">
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={bulgarianCities}
                renderInput={(params) => <TextField {...params} label="Varna" />}              
            />  
            </DemoItem>
            <NavLink to="catalogue"><Button className='button-find' variant="contained">Find it now</Button></NavLink>
        </div>
    )
}