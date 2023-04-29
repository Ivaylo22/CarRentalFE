import { useEffect, useState } from "react";
import Filter from "../components/Filter";

export default function Catalogue({startDate, dropDate, setStartDate, setDropDate, cars, setCars}){
    const [detailedCars, setDetailedCars] = useState([])

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
        <Filter 
            cars={detailedCars}
            startDate={startDate}
            dropDate={dropDate}
            setStartDate={setStartDate} 
            setDropDate={setDropDate}
        />
    )
}