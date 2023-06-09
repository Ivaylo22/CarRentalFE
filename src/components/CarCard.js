import EvStationIcon from '@mui/icons-material/EvStation';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';

import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';

export default function CarCard(props) {
    const {vin, make, model, img, fuel, date, gearbox, engine, price} = props;
    return (
        <div className="car-card-wrapper">
            <img src={img} alt="Car"/>
            <div className='card-info'>  
                <p className='model-info'>{make.toUpperCase()} {model.toUpperCase()}</p>   
                <div className="icons-wrapper">

                    <div className='icon-wrapper'>
                        <div className='icon'>
                            <EvStationIcon/>
                        </div>
                        <div className='icon-text'> 
                            <p>{fuel}</p>
                        </div>
                        
                    </div>

                    <div className='icon-wrapper'>
                        <div className='icon'>
                            <CalendarMonthIcon/>
                        </div>
                        <div className='icon-text'>
                            <p>{date}</p>
                        </div>
                    </div>

                    <div className='icon-wrapper'>
                        <div className='icon'>
                            <SettingsSuggestIcon/>
                        </div>
                        <div className='icon-text'>
                            <p>{gearbox}</p>
                        </div>                    
                    </div>

                    <div className='icon-wrapper'>
                        <div className='icon'>
                            <SettingsApplicationsIcon/>
                        </div>
                        <div className='icon-text'>
                            <p>{engine} конски сили</p>
                        </div>    
                    </div>

                </div>  
                <div className='button-wrapper'>
                    <p className='price'>{price} лв/ден</p>
                    <p className='italic discount'>-10% АКО СТЕ СЕ ВПИСАЛИ</p>
                    <Button variant="outlined"><NavLink to={`${vin}`}>Детайли</NavLink></Button>
                </div>

            </div>      
        </div>
    )
}