import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Autocomplete, Button, TextField } from '@mui/material';
import { prices } from '../Helpers';
import { NavLink } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers';


export default function HomeDatePicker({startDate,dropDate, setStartDate, setDropDate, setMaxPrice}) {

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
            <NavLink to="catalogue"><Button className='button-find' variant="contained">Find it now</Button></NavLink>
        </div>
    )
}