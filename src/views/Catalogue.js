import { useEffect, useState } from "react";
import Filter from "../components/Filter";
import CarCard from "../components/CarCard";

export default function Catalogue({startDate, dropDate, setStartDate, setDropDate, cars, setCars}){
    return(
        <div>
            <Filter 
                cars={cars}
                startDate={startDate}
                dropDate={dropDate}
                setStartDate={setStartDate} 
                setDropDate={setDropDate}
            />
            <div className="all-cars-wrapper">
            {cars.map(car => (
                <CarCard 
                    vin={car.vinNumber}
                    img={car.imageUrl}
                    fuel={car.engine.type}
                    date={car.years.year}
                    gearbox={car.transmission.transmissionType}
                    engine={car.engine.horsepower}
                    price={car.dailyRate}
                />              
            ))}
            </div>
        </div>

    )
}