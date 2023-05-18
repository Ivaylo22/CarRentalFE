import { NavLink, useParams } from "react-router-dom";

import { convertMpgToLitersPer100km, isAvailableInRange, locations } from "../Helpers";
import MyCalendar from "./MyCalendar"

import EvStationIcon from '@mui/icons-material/EvStation';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import GasMeterIcon from '@mui/icons-material/GasMeter';
import SensorDoorIcon from '@mui/icons-material/SensorDoor';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AnimationIcon from '@mui/icons-material/Animation';
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function DetailedCarCard({detailedCars, startDate, dropDate, setStartDate, setDropDate, location, setLocation, addPrice, setAddPrice, setTotalPrice, setCarId}) {
    const [errorType, setErrorType] = useState("");
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        return () => {   
          setAddPrice("0.00");
          setLocation("");
        };
    }, [setAddPrice, setLocation]);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleRentClick = (event) => {
        if (location.length===0) {
            event.preventDefault();
            setErrorType("noLocation");
            setOpenDialog(true);
        }
        if(startDate === null || dropDate === null) {
            event.preventDefault();
            setErrorType("invalidDate");
            setOpenDialog(true);
        }
        if (startDate && dropDate && dropDate.isBefore(startDate)) {
            event.preventDefault();
            setErrorType("invalidDate");
            setOpenDialog(true);
        } 

        if (dayjs(startDate).isBefore(dayjs(), "day")) {
            event.preventDefault();
            setErrorType("invalidDate");
            setOpenDialog(true);
        } 

        if(!isAvailableInRange(startDate, dropDate, exactCar.rentDates)) {
            event.preventDefault();
            setErrorType("invalidDate");
            setOpenDialog(true);
        }
        setTotalPrice((parseFloat(exactCar.dailyRate) + parseFloat(addPrice)).toFixed(2))
        setCarId(exactCar.vinNumber)
    }
    
    const { vin } = useParams();

    const exactCar = detailedCars.find(car => car.vinNumber === vin)

    const listItems = [];
    const arrayOfExtras = exactCar.options[0].options.map(item => item.name);

    function calculateExtraTaxes() {
        var price = 0;

        const check1 = document.getElementById("price1");
        const check2 = document.getElementById("price2");
        const check3 = document.getElementById("price3");
        const radioButtons = document.querySelectorAll('input[name="myRadio"]');

        let selectedOption = '';
        radioButtons.forEach((radioButton) => {
            if (radioButton.checked) {
            selectedOption = radioButton.value;
            }
        });

        if(check1.checked) {
            price += 15.99;
        }

        if(check2.checked) {
            price += 17.99;
        }

        if(check3.checked) {
            price += 20.99;
        }
        setAddPrice((parseFloat(price) + parseFloat(selectedOption)).toFixed(2))

        return (parseFloat(price) + parseFloat(selectedOption)).toFixed(2);
    };

    for (let i = 0; i < 9 && i < arrayOfExtras.length; i++) {
        listItems.push(<li key={i} className="extra-li">{arrayOfExtras[i]}</li>);
    }
    
    return (
        <div className="detailed-car-wrapper">
            <div className="general-info">
                <div className="main-content">
                    <div className="full-icons-wrapper">
                        <div className="icons-wrapper">
                            <div className='icon-wrapper'>
                                <div className='icon'>
                                    <EvStationIcon/>
                                </div>
                                <div className='icon-text'> 
                                    <p>{exactCar.fuelType}</p>
                                </div>                      
                            </div>

                            <div className='icon-wrapper'>
                                <div className='icon'>
                                    <CalendarMonthIcon/>
                                </div>
                                <div className='icon-text'>
                                    <p>{exactCar.years[0].year}</p>
                                </div>
                            </div>

                            <div className='icon-wrapper'>
                                <div className='icon'>
                                    <SettingsSuggestIcon/>
                                </div>
                                <div className='icon-text'>
                                    <p>{exactCar.transmission.transmissionType}</p>
                                </div>                    
                            </div>

                            <div className='icon-wrapper'>
                                <div className='icon'>
                                    <SettingsApplicationsIcon/>
                                </div>
                                <div className='icon-text'>
                                    <p>{exactCar.engine.horsepower} HP</p>
                                </div>    
                            </div>

                            <div className='icon-wrapper'>
                                <div className='icon'>
                                    <DirectionsCarIcon/>
                                </div>
                                <div className='icon-text'>
                                    <p>{exactCar.categories.vehicleType.toUpperCase()}</p>
                                </div>
                            </div>

                            <div className='icon-wrapper'>
                                <div className='icon'>
                                    <SensorDoorIcon/>
                                </div>
                                <div className='icon-text'>
                                    <p>{exactCar.numOfDoors} DOORS</p>
                                </div>
                            </div>

                            <div className='icon-wrapper'>
                                <div className='icon'>
                                    <GasMeterIcon/>
                                </div>
                                <div className='icon-text'>
                                    <p>{convertMpgToLitersPer100km(exactCar.mpg.city)} LITERS/100KM</p>
                                </div>
                            </div>

                            <div className='icon-wrapper'>
                                <div className='icon'>
                                    <AnimationIcon/>
                                </div>
                                <div className='icon-text'>
                                    <p>{exactCar.engine.cylinder} CYLINDERS</p>
                                </div>
                            </div>  

                            <div className='icon-wrapper price'>
                                <div className='icon-text'>
                                    <p>DAILY RATE: {exactCar.dailyRate} BGN</p>
                                </div>
                            </div>

                        </div>  

                        
                    </div>
                    <div className="img-wrapper">
                        <img className="picture" src={exactCar.imageUrl} alt="Car"/>
                    </div> 

                </div>
                <div className="additions">
                    <h1>EXTRAS OF THE CAR</h1>
                    <div>
                        <ul className="extras-ul">
                            {listItems}
                        </ul>
                    </div>
                </div>

                <div className="conditions">
                    <h1>RENTAL CONDITIONS</h1>
                    <ul>
                        <li>
                            YOU HAVE TO FUEL UP THE CAR
                        </li>
                        <li>
                            YOU HAVE TO PICK-UP THE CAR FROM THE CHOSEN LOCATION AT THE GIVEN TIME
                        </li>
                        <li>
                            YOU HAVE TO DROP-OFF THE CAR AT THE CHOSEN LOCATION AND TIME
                        </li>
                        <li>
                            YOU HAVE TO PAY FOR THE ACCIDENTS YOU HAVE CAUSED IF THEY ARE NOT INCLUDED IN THE INSURANCE PLAN YOU HAD CHOSEN
                        </li>
                        <li>
                            YOU HAVE TO FUEL UP THE CAR
                        </li>
                        <li>
                            YOU HAVE TO PICK-UP THE CAR FROM THE CHOSEN LOCATION AT THE GIVEN TIME
                        </li>
                        <li>
                            YOU HAVE TO DROP-OFF THE CAR AT THE CHOSEN LOCATION AND TIME
                        </li>
                        <li>
                            YOU HAVE TO PAY FOR THE ACCIDENTS YOU HAVE CAUSED IF THEY ARE NOT INCLUDED IN THE INSURANCE PLAN YOU HAD CHOSEN
                        </li>
                    </ul>
                </div>
            </div>

            <div className="right-side">
                <div className="calendar-wrapper">
                    <MyCalendar markedDates={exactCar.rentDates} />
                    <div className="legend">
                        <div className="circle"></div>
                        <p>TAKEN DATES</p>
                    </div>
                </div>
                <h3 className="wrapper-title">YOUR RENTAL DETAIL</h3>
                <div className="detail-dates">
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
                    <DemoItem label="LOCATION">
                        <Autocomplete
                            className="filter-autocomplete"
                            disablePortal
                            id="combo-box-demo"
                            options={locations}
                            onChange={(event, newLocation) => {
                                setLocation(newLocation);
                            }}  
                            renderInput={(params) => <TextField {...params}/>}              
                        />  
                    </DemoItem>
                </div>
                <h3 className="wrapper-title">ADDITIONAL FEATURES</h3>
                <div className="features">
                    <label>
                        <input type="checkbox" id="price1" value="15.99" onClick={calculateExtraTaxes}/>
                        GPS (<span className="price-italic">+15,99 BGN </span>)
                    </label>
                    <label>
                        <input type="checkbox" id="price2" value="17.99" onClick={calculateExtraTaxes}/>
                        Детско столче (<span className="price-italic">+17.99 BGN </span>)
                    </label>
                    <label>
                        <input type="checkbox" id="price3" value="20.99" onClick={calculateExtraTaxes}/>
                        Втори шофьор (<span className="price-italic">+20.99 BGN </span>)
                    </label>
                </div>
                <h3 className="wrapper-title">SELECT INSURANCE PLAN</h3>
                <div className="insurance">
                    <label>
                        <input type="radio" name="myRadio" value="0" onClick={calculateExtraTaxes} defaultChecked  />
                        <div>
                            <p className="plan-name">PLAN 1 (<span className="price-italic">DEFAULT </span>)</p>
                            <p className="plan-description"> plan description: includes this and this</p>
                        </div>
                    </label>
                    <label>
                        <input type="radio" name="myRadio" value="17.99" onClick={calculateExtraTaxes}/>
                        <div>
                            <p className="plan-name">PLAN 2 (<span className="price-italic">+17.99 BGN </span>)</p>
                            <p className="plan-description"> plan description: includes this and this</p>
                        </div>
                    </label>
                    <label>
                        <input type="radio" name="myRadio" value="49.99" onClick={calculateExtraTaxes}/>
                        <div>
                            <p className="plan-name">PLAN 3 (<span className="price-italic">+49.99 BGN </span>)</p>
                            <p className="plan-description"> plan description: includes this and this</p>
                        </div>
                    </label>
                </div>
                <div className="final-prices">
                    <h2>TOTAL PRICE:</h2>
                    <h2><span className="price-italic">{(parseFloat(exactCar.dailyRate) + parseFloat(addPrice)).toFixed(2)} BGN </span></h2>
                </div>
                
                <div className="button-wrapper">
                    <NavLink to={'../confirmation'}> <Button className='button-filter' variant="contained" onClick={handleRentClick}>RENT NOW</Button></NavLink>
                </div>
                
            </div>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Incorect input</DialogTitle>
                {errorType === "invalidDate" && (
                <DialogContent>
                    <p>Please chose valid dates.</p>
                </DialogContent>
                )}
                {errorType === "noLocation" && (
                <DialogContent>
                    <p>Please write your location.</p>
                </DialogContent>
                )}
                
                <DialogActions>
                    <Button onClick={handleCloseDialog}>OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}