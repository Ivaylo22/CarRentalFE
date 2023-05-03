import Filter from "../components/Filter";
import CarCard from "../components/CarCard";
import { useEffect, useState } from "react";

export default function Catalogue({startDate, dropDate, setStartDate, setDropDate, detailedCars, maxPrice, setMaxPrice}){
    const [filteredCars, setFilteredCars] = useState([]);
    const [fuelType, setFuelType] = useState(null);

    useEffect(() => {
        setFilteredCars(detailedCars)
    }, [detailedCars])

    console.log(filteredCars.length)

    return(
        <div className="catalogue-wrapper">
            <div className="all-cars-wrapper">
            {         
            filteredCars.length !== 0 ? filteredCars.map(car => (
                <CarCard 
                    key={car.vinNumber}
                    make={car.make.name}
                    model={car.model.name}
                    vin={car.vinNumber}
                    img={car.imageUrl}
                    fuel={car.fuelType}
                    date={car.years[0].year}
                    gearbox={car.transmission.transmissionType}
                    engine={car.engine.horsepower}
                    price={car.dailyRate}
                />   
                        
                )
            )
            : <p className="no-cars-found">No cars found.</p>   }
            </div>
            <Filter 
                detailedCars={detailedCars}
                startDate={startDate}
                dropDate={dropDate}
                setStartDate={setStartDate} 
                setDropDate={setDropDate}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                fuelType={fuelType}
                setFuelType={setFuelType}
                setFilteredCars={setFilteredCars}
            />          
        </div>

    )
}