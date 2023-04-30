import { useParams } from "react-router-dom";

export default function DetailedCarCard(detailedCars, startDate, dropDate) {
    const { vin } = useParams();
    return (
        <div>
            <p>{vin}</p>
        </div>
    )
}