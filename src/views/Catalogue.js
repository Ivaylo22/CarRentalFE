import Filter from "../components/Filter";
import CarCard from "../components/CarCard";

export default function Catalogue({startDate, dropDate, setStartDate, setDropDate, detailedCars, maxPrice, setMaxPrice}){
    return(
        <div>
            <Filter 
                cars={detailedCars}
                startDate={startDate}
                dropDate={dropDate}
                setStartDate={setStartDate} 
                setDropDate={setDropDate}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
            />
            <div className="all-cars-wrapper">
            {detailedCars.map(car => (
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
            ))}
            </div>
        </div>

    )
}