import { useEffect } from "react";

export default function Home({cars, setCars}){
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
    console.log(cars);

    return(
        <div>
            <main className="home-wrapper">
                <div className="main-advertise">  
                    <h1 className="title">Book Your Car Rental</h1>
                    <p className="hook">Luxury and Comfortable Cars at low-cost, <span className="ad-price">starts $20 / day</span></p>
                    <p className="slogan">Unlock Your Adventure</p>
                </div>
                <div className="date-picker">
                    <h1>Unlock Your Adventure</h1>
                </div>
            </main>
            <div>
                <h1 className="test">asdasd</h1>
            </div>
        </div>

    )
}