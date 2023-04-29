import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AboutUs from "./AboutUs";
import HomeDatePicker from "../components/HomeDatePicker";

export default function Home({cars, setCars, setStartDate, setDropDate}){
    const [detailedCars, setDetailedCars] = useState([])

    //Scroll to #about-us
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

    //Fetch cars
    useEffect(() => {
        const fetchCars = async () => {
            const response = await fetch("http://localhost:8081/cars");
            const data = await response.json();

            setCars(data);
        }
        if(!cars.length){
            console.log("FETCH");
            fetchCars();
        }

    }, [setCars, cars.length])

    useEffect(() => {
        const fetchCarDetails = async () => {
            const promises = cars.map(async (car) => {
                const response = await fetch(`https://auto.dev/api/vin/${car.vinNumber}`);
                const data = await response.json();

                return { ...car, ...data };
            });
          const carsDetails = await Promise.all(promises);
          setCars(carsDetails);
          setDetailedCars(carsDetails)
        };
        fetchCarDetails();
    }, [setCars]);
    console.log(cars)
    return(
        <div>
            <main className="home-wrapper">
                <div className="main-advertise">  
                    <h1 className="title">Book Your Car Rental</h1>
                    <p className="hook">Luxury and Comfortable Cars at low-cost, <span className="ad-price">starts $20 / day</span></p>
                    <p className="slogan">Unlock Your Adventure</p>
                </div>
                <div className="date-picker">
                    <HomeDatePicker setStartDate={setStartDate} setDropDate={setDropDate}/>
                </div>
            </main>
            <AboutUs />
        </div>

    )

    
}