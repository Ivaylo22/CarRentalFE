import dayjs from 'dayjs';

import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Autocomplete, Button, TextField } from '@mui/material';
import { bulgarianCities } from '../Helpers';
import { NavLink } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers';


export default function HomeDatePicker({setStartDate, setDropDate}) {

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
                    />
                </DemoItem>
            </LocalizationProvider>
            <DemoItem label="City">
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={bulgarianCities}
                renderInput={(params) => <TextField {...params} label="Select City" />}              
            />  
            </DemoItem>
            <NavLink to="catalogue"><Button className='button-find' variant="contained">Find it now</Button></NavLink>
        </div>
    )
}