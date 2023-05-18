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
                                    <p>{exactCar.engine.horsepower} КОНСКИ СИЛИ</p>
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
                                    <p>{exactCar.numOfDoors} ВРАТИ</p>
                                </div>
                            </div>

                            <div className='icon-wrapper'>
                                <div className='icon'>
                                    <GasMeterIcon/>
                                </div>
                                <div className='icon-text'>
                                    <p>{convertMpgToLitersPer100km(exactCar.mpg.city)} РАЗХОД</p>
                                </div>
                            </div>

                            <div className='icon-wrapper'>
                                <div className='icon'>
                                    <AnimationIcon/>
                                </div>
                                <div className='icon-text'>
                                    <p>{exactCar.engine.cylinder} ЦИЛИНДРИ</p>
                                </div>
                            </div>  

                            <div className='icon-wrapper price'>
                                <div className='icon-text'>
                                    <p>ЦЕНА ЗА ДЕН: {exactCar.dailyRate} лв</p>
                                </div>
                            </div>

                        </div>  

                        
                    </div>
                    <div className="img-wrapper">
                        <img className="picture" src={exactCar.imageUrl} alt="Car"/>
                    </div> 

                </div>
                <div className="additions">
                    <h1>ЕКСТРИ</h1>
                    <div>
                        <ul className="extras-ul">
                            {listItems}
                        </ul>
                    </div>
                </div>

                <div className="conditions">
                    <h1>УСЛОВИЯ ЗА НАЕМАНЕ</h1>
                    <ul>
                        <li>
                            ВИЕ ЗАРЕЖДАТЕ КОЛАТА
                        </li>
                        <li>
                            ТРЯБВА ДА ВЗЕМЕТЕ АВТОМОБИЛА ОТ ИЗБРАНОТО МЯСТО И ЧАС
                        </li>
                        <li>
                            ТРЯБВА ДА ВЪРНЕТЕ АВТОМОБИЛА НА ИЗБРАНОТО МЯСТО И ЧАС
                        </li>
                        <li>
                            ТРЯБВА ДА ПЛАТИТЕ ЗА ЩЕТИТЕ, КОИТО СТЕ НАПРАВИЛИ, АКО ТЕ НЕ СА ВКЛЮЧЕНИ В ЗАСТРАХОВАТЕЛНИЯ ПЛАН, КОЙТО СТЕ ИЗБРАЛИ
                        </li>
                        <li>
                            ВИЕ ЗАРЕЖДАТЕ КОЛАТА
                        </li>
                        <li>
                            ТРЯБВА ДА ВЗЕМЕТЕ АВТОМОБИЛА ОТ ИЗБРАНОТО МЯСТО И ЧАС
                        </li>
                        <li>
                            ТРЯБВА ДА ВЪРНЕТЕ АВТОМОБИЛА НА ИЗБРАНОТО МЯСТО И ЧАС
                        </li>
                        <li>
                            ТРЯБВА ДА ПЛАТИТЕ ЗА ЩЕТИТЕ, КОИТО СТЕ НАПРАВИЛИ, АКО ТЕ НЕ СА ВКЛЮЧЕНИ В ЗАСТРАХОВАТЕЛНИЯ ПЛАН, КОЙТО СТЕ ИЗБРАЛИ
                        </li>
                    </ul>
                </div>
            </div>

            <div className="right-side">
                <div className="calendar-wrapper">
                    <MyCalendar markedDates={exactCar.rentDates} />
                    <div className="legend">
                        <div className="circle"></div>
                        <p>ЗАЕТИ ДАТИ</p>
                    </div>
                </div>
                <h3 className="wrapper-title">ДАННИ ЗА НАЕМАНЕ</h3>
                <div className="detail-dates">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoItem label="ДАТА НА НАЕМАНЕ">
                            <DatePicker 
                                className="filter-date-picker"
                                defaultValue={null}
                                value={dayjs(startDate)}
                                onChange={(date) => setStartDate(date)}
                            />
                        </DemoItem>
                        <DemoItem label="ДАТА НА ВРЪЩАНЕ">
                            <DatePicker 
                                className="filter-date-picker"
                                defaultValue={null}
                                value={dayjs(dropDate) ? dayjs(dropDate) : null}
                                onChange={(date) => setDropDate(date)}
                                minDate={startDate}
                            />
                        </DemoItem>
                    </LocalizationProvider>
                    <DemoItem label="ЛОКАЦИЯ">
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
                <h3 className="wrapper-title">ДОПЪЛНИТЕЛНИ ЕКСТРИ</h3>
                <div className="features">
                    <label>
                        <input type="checkbox" id="price1" value="15.99" onClick={calculateExtraTaxes}/>
                        GPS (<span className="price-italic">+15,99 лв </span>)
                    </label>
                    <label>
                        <input type="checkbox" id="price2" value="17.99" onClick={calculateExtraTaxes}/>
                        Детско столче (<span className="price-italic">+17.99 лв</span>)
                    </label>
                    <label>
                        <input type="checkbox" id="price3" value="20.99" onClick={calculateExtraTaxes}/>
                        Втори шофьор (<span className="price-italic">+20.99 лв</span>)
                    </label>
                </div>
                <h3 className="wrapper-title">ЗАСТРАХОВАТЕЛЕН ПЛАН</h3>
                <div className="insurance">
                    <label>
                        <input type="radio" name="myRadio" value="0" onClick={calculateExtraTaxes} defaultChecked  />
                        <div>
                            <p className="plan-name">ПЛАН 1 (<span className="price-italic">ПО ПОДРАЗБИРАНЕ </span>)</p>
                            <p className="plan-description"> описание: включва това и това</p>
                        </div>
                    </label>
                    <label>
                        <input type="radio" name="myRadio" value="17.99" onClick={calculateExtraTaxes}/>
                        <div>
                            <p className="plan-name">ПЛАН 2 (<span className="price-italic">+17.99 лв </span>)</p>
                            <p className="plan-description"> описание: включва това и това</p>
                        </div>
                    </label>
                    <label>
                        <input type="radio" name="myRadio" value="49.99" onClick={calculateExtraTaxes}/>
                        <div>
                            <p className="plan-name">ПЛАН 3 (<span className="price-italic">+49.99 лв</span>)</p>
                            <p className="plan-description"> описание: включва това и това</p>
                        </div>
                    </label>
                </div>
                <div className="final-prices">
                    <h2>КРАЙНА ЦЕНА:</h2>
                    <h2><span className="price-italic">{(parseFloat(exactCar.dailyRate) + parseFloat(addPrice)).toFixed(2)} лв </span></h2>
                </div>
                
                <div className="button-wrapper">
                    <NavLink to={'../confirmation'}> <Button className='button-filter' variant="contained" onClick={handleRentClick}>НАЕМИ</Button></NavLink>
                </div>
                
            </div>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Невалидни данни</DialogTitle>
                {errorType === "invalidDate" && (
                <DialogContent>
                    <p>Моля, изберете валидни дати.</p>
                </DialogContent>
                )}
                {errorType === "noLocation" && (
                <DialogContent>
                    <p>Моля, изберете вашата локация.</p>
                </DialogContent>
                )}
                
                <DialogActions>
                    <Button onClick={handleCloseDialog}>OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}