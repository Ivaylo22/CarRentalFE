import EvStationIcon from '@mui/icons-material/EvStation';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';

export default function CarCard(props) {
    const {vin, img, fuel, date, gearbox, engine, price} = props;
    return (
        <div className="car-card-wrapper">
            <img src="https://dub01pap001files.storage.live.com/y4mnMC_l2VxAtz_WL1aNC0EKYqRTbrDXag_pUdP0USFLaq-wwLpIPTzW-IvxU9Rj69ixviYymLi1HJKZtd85WAccf-Wjwo1q_TvaUieq7HwXylM5a1UqHYA0p5RfckIgKqdEuV61Juvp5QkEoaD8GprR_xwSZLfBQThDGwn0xT4YTetuuJivRqwgV73HuC9xwjP?width=465&height=600&cropmode=none" alt="Car"/>
            <div className='card-info'>     
                <div className="icons-wrapper">

                    <div className='icon-wrapper'>
                        <div className='icon'>
                            <EvStationIcon/>
                        </div>
                        <div className='icon-text'> 
                            <p>fuel type</p>
                        </div>
                        
                    </div>

                    <div className='icon-wrapper'>
                        <div className='icon'>
                            <CalendarMonthIcon/>
                        </div>
                        <div className='icon-text'>
                            <p>manufacture date</p>
                        </div>
                    </div>

                    <div className='icon-wrapper'>
                        <div className='icon'>
                            <SettingsSuggestIcon/>
                        </div>
                        <div className='icon-text'>
                            <p>type of gearbox </p>
                        </div>                    
                    </div>

                    <div className='icon-wrapper'>
                        <div className='icon'>
                            <SettingsApplicationsIcon/>
                        </div>
                        <div className='icon-text'>
                            <p>engine power</p>
                        </div>    
                    </div>

                    <div className='icon-wrapper'>
                        <div className='icon'>
                            <AttachMoneyIcon/>
                        </div>
                        <div className='icon-text'>
                            <p>price per day</p>
                        </div>
                    </div>

                </div>  
                <div className='button-wrapper'>
                    <Button variant="outlined"><NavLink to={`${"asd"}`}>Show More</NavLink></Button>
                </div>

            </div>      
        </div>
    )
}