import { Autocomplete, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import Button from '@mui/material/Button';
import dayjs from "dayjs"

export default function Filter({startDate, dropDate, setStartDate, setDropDate, cars}){
    
    const distinctEngineTypes = [...new Set(cars.map(car => car.engine.type.charAt(0).toUpperCase() + car.engine.type.slice(1)))];
console.log(cars)
    return (
        <div className="filter-wrapper">
            <div className="filter-params-wrapper">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoItem label="PICK-UP DATE">
                        <DatePicker 
                            className="filter-date-picker"
                            value={dayjs(startDate)}
                            onChange={(date) => setStartDate(date)}
                        />
                    </DemoItem>
                    <DemoItem label="DROP-OFF DATE">
                        <DatePicker 
                            className="filter-date-picker"
                            value={dayjs(dropDate)}
                            onChange={(date) => setDropDate(date)}
                        />
                    </DemoItem>
                </LocalizationProvider>
                <DemoItem label="FUEL TYPE">
                    <Autocomplete
                        className="filter-autocomplete"
                        disablePortal
                        id="combo-box-demo"
                        options={distinctEngineTypes}
                        renderInput={(params) => <TextField {...params} label="Select fuel" />}              
                    />  
                </DemoItem>
                <DemoItem label="MAX PRICE">
                    <TextField className="filter-price" id="outlined-basic" label="Maximum daily price" variant="outlined" />
                </DemoItem>
                
            </div>
            <div className="button-wrapper">
                    <Button  className='button-filter' variant="contained">Filter</Button>
            </div>
        </div>
    )
}