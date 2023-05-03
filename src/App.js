import React, { useEffect, useState } from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import Navbar from "./components/Navbar";
import DetailedCarCard from "./components/DetailedCarCard";

import Home from "./views/Home"
import Catalogue from "./views/Catalogue";
import AboutUs from "./views/AboutUs";
import ContactUs from "./views/ContactUs";

import "./styles/global.css"
import "./styles/variables.css"
import "./styles/navbar.css"
import "./styles/home.css"
import "./styles/about-us.css"
import "./styles/catalogue.css"
import "./styles/car-card.css"
import "./styles/detailed-car-card.css"
import "./styles/calendar.css"
import "./styles/contact-us.css"


export default function App() {
    const [cars, setCars] = useState([]);
    const [detailedCars, setDetailedCars] = useState([]);
    const [maxPrice, setMaxPrice] = useState(null);
    const [startDate, setStartDate]  = useState(null);
    const [dropDate, setDropDate] = useState(null);

    useEffect(() => {
        const fetchCars = async () => {
        const response = await fetch("http://localhost:8081/cars");
        const data = await response.json();

        setCars(data);
        };

        fetchCars();
    }, []);

    useEffect(() => {
        const fetchCarDetails = async () => {
        const promises = cars.map(async (car) => {
            const response = await fetch(`https://auto.dev/api/vin/${car.vinNumber}`);
            const data = await response.json();

            return { ...car, ...data };
        });
        const carsDetails = await Promise.all(promises);
        setDetailedCars(carsDetails);
        };

        if (cars.length) {
        fetchCarDetails();
        }
    }, [cars]);

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route 
                path="/" 
                element={<Navbar/>}>
                    <Route
                        index
                        element=
                            {<Home 
                                startDate={startDate}
                                dropDate={dropDate}
                                setStartDate={setStartDate}
                                setDropDate={setDropDate}
                                setMaxPrice={setMaxPrice}
                            />} >
                    </Route>
                    <Route
                        path="catalogue"
                        element={<Catalogue
                                    startDate={startDate}
                                    dropDate={dropDate}
                                    setStartDate={setStartDate}
                                    setDropDate={setDropDate}
                                    detailedCars={detailedCars}
                                    maxPrice={maxPrice}
                                    setMaxPrice={setMaxPrice}
                                />} >
                    </Route>
                    <Route
                        path="catalogue/:vin"
                        element=
                        {
                            <DetailedCarCard
                                detailedCars={detailedCars}
                                startDate={startDate}
                                dropDate={dropDate}
                            />}
                        />
                    <Route
                        path="about-us"
                        element={<AboutUs/>} >
                    </Route>
                    <Route
                        path="contact-us"
                        element={<ContactUs/>} >
                    </Route>
            </Route>
        )
    )

    return (
        <div className="global-wrapper">
            <RouterProvider router={router} />
        </div>
    )
}