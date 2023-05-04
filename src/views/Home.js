import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import HomeDatePicker from "../components/HomeDatePicker";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";

export default function Home({startDate, dropDate, setStartDate, setDropDate, setMaxPrice}){
    //Smooth scroll
    const location = useLocation();
    useEffect(() => {
        if (location.hash) {
        setTimeout(() => {
            const element = document.querySelector(location.hash);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 0);
        }
    }, [location]);

    //Refresh url when scroll to top
    function handleScroll() {
        if (window.pageYOffset === 0) {
          const url = new URL(window.location.href);
          url.hash = '';
          window.history.pushState(null, '', url.toString());
        }
    }

    window.addEventListener('scroll', handleScroll);

    return(
        <div>
            <main className="home-wrapper">
                <div className="main-advertise">  
                    <h1 className="title">Book Your Car Rental</h1>
                    <p className="hook">Luxury and Comfortable Cars at low-cost, <span className="ad-price">starts 70 BGN / day</span></p>
                    <p className="slogan">Unlock Your Adventure</p>
                </div>
                <div className="date-picker">
                    <HomeDatePicker startDate={startDate} dropDate={dropDate}setStartDate={setStartDate} setDropDate={setDropDate} setMaxPrice={setMaxPrice}/>
                </div>
            </main>
            <AboutUs />
            <ContactUs />
        </div>

    )

    
}