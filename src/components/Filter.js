import { isAvailableInRange } from "../Helpers";

import { Autocomplete, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import Button from '@mui/material/Button';
import dayjs from "dayjs"

export default function Filter({startDate, dropDate, setStartDate, setDropDate, detailedCars, maxPrice, setMaxPrice, fuelType, setFuelType, setFilteredCars}){ 
    const distinctEngineTypes = [...new Set(detailedCars.map(car => car.fuelType.charAt(0).toUpperCase() + car.fuelType.slice(1)))];

    const handleFilterClick = () => {
        const filtered = detailedCars.filter(car => {
            if(!isAvailableInRange(startDate, dropDate, car.rentDates)){
                return false
            }

            if (maxPrice && car.dailyRate > maxPrice) {
                return false;
            }

            if (fuelType && car.fuelType.toLowerCase() !== fuelType.toLowerCase()) {
                return false;
            }

            return true;
        });
        setFilteredCars(filtered);
    }

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
                            minDate={startDate}
                        />
                    </DemoItem>
                </LocalizationProvider>
                <DemoItem label="FUEL TYPE">
                    <Autocomplete
                        className="filter-autocomplete"
                        disablePortal
                        id="combo-box-demo"
                        options={distinctEngineTypes}
                        onChange={(event, newFuel) => {
                            setFuelType(newFuel);
                        }}  
                        renderInput={(params) => <TextField {...params} label="Select fuel" />}              
                    />  
                </DemoItem>
                <DemoItem label="MAX PRICE">
                    <TextField 
                        className="filter-price" 
                        id="outlined-basic" 
                        label="Maximum daily price" 
                        variant="outlined" 
                        defaultValue={maxPrice}
                        onChange={(event) => {
                            setMaxPrice(event.target.value);
                          }}
                        />
                </DemoItem>
                
            </div>
            <div className="button-wrapper">
                <Button  className='button-filter' variant="contained" onClick={handleFilterClick}>Filter</Button>
            </div>
        </div>
    )
}