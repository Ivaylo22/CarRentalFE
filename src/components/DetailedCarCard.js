import { useParams } from "react-router-dom";

import { convertMpgToLitersPer100km } from "../Helpers";

import EvStationIcon from '@mui/icons-material/EvStation';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';

import GasMeterIcon from '@mui/icons-material/GasMeter';
import SensorDoorIcon from '@mui/icons-material/SensorDoor';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AnimationIcon from '@mui/icons-material/Animation';

import MyCalendar from "./MyCalendar";

export default function DetailedCarCard({detailedCars, startDate, dropDate}) {
    const { vin } = useParams();

    const exactCar = detailedCars.find(car => car.vinNumber === vin)

    const listItems = [];
    const arrayOfExtras = exactCar.options[0].options.map(item => item.name);

    for (let i = 0; i < 9 && i < arrayOfExtras.length; i++) {
        listItems.push(<li key={i} className="extra-li">{arrayOfExtras[i]}</li>);
    }

    return (
            





        <div className="detailed-car-wrapper">
            <p className='model-info'>{exactCar.make.name.toUpperCase()} {exactCar.model.name.toUpperCase()}</p>  
            <div className="img-wrapper">
                    <img className="picture" src={exactCar.imageUrl} alt="Car"/>
            </div> 
            <div className="main-extras-wrapper">
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
                        <AttachMoneyIcon/>
                    </div>
                    <div className='icon-text'>
                        <p>DAILY RATE {exactCar.dailyRate} BGN</p>
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
                            <GasMeterIcon/>
                        </div>
                        <div className='icon-text'>
                            <p>{convertMpgToLitersPer100km(exactCar.mpg.city)} LITERS/100KM</p>
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
                            <AnimationIcon/>
                        </div>
                        <div className='icon-text'>
                            <p>{exactCar.engine.cylinder} CYLINDERS</p>
                        </div>
            </div>  
            </div>
            <div className="main-info-wrapper">
                <div className="main-info">
                                                        
                </div>
                
            </div>
            <div className="extras-wrapper">
                <h1>Extras</h1>
                <div>
                    <ul className="extras-ul">
                        {listItems}
                    </ul>
                </div>
                <div>
                    <MyCalendar markedDates={exactCar.rentDates} />
                </div>
            </div>
        </div>
    )
}