import { useEffect, useState } from "react";
import Filter from "../components/Filter";
import CarCard from "../components/CarCard";

export default function Catalogue({startDate, dropDate, setStartDate, setDropDate, cars, setCars}){
    const [detailedCars, setDetailedCars] = useState([])

    //MOVE TO HOME
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
    
    return(
        <div>
            <Filter 
                cars={detailedCars}
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