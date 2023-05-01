import { isAvailableInRange } from "../Helpers";

import { Autocomplete, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import Button from '@mui/material/Button';
import dayjs from "dayjs"
import { useState } from "react";

export default function Filter({startDate, dropDate, setStartDate, setDropDate, detailedCars, maxPrice, setMaxPrice, fuelType, setFuelType, setFilteredCars}){ 
    const distinctEngineTypes = [...new Set(detailedCars.map(car => car.fuelType.charAt(0).toUpperCase() + car.fuelType.slice(1)))];
    const [openDialog, setOpenDialog] = useState(false);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleFilterClick = () => {
        const filtered = detailedCars.filter(car => {
            if (startDate && dropDate && dropDate.isBefore(startDate)) {
                setOpenDialog(true);
            } else {
                if(!isAvailableInRange(startDate, dropDate, car.rentDates)){
                    return false
                }
    
                if (maxPrice && car.dailyRate > maxPrice) {
                    return false;
                }
    
                if (fuelType && car.fuelType.toLowerCase() !== fuelType.toLowerCase()) {
                    return false;
                }
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
                            defaultValue={null}
                            value={dayjs(startDate)}
                            onChange={(date) => setStartDate(date)}
                        />
                    </DemoItem>
                    <DemoItem label="DROP-OFF DATE">
                        <DatePicker 
                            className="filter-date-picker"
                            defaultValue={null}
                            value={dayjs(dropDate) ? dayjs(dropDate) : null}
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