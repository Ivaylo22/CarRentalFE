import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./views/Home"
import Catalogue from "./views/Catalogue";
import AboutUs from "./views/AboutUs";
import ContactUs from "./views/ContactUs";

import "./styles/global.css"
import "./styles/variables.css"
import "./styles/navbar.css"
import "./styles/home.css"

export default function App() {
    const [cars, setCars] = React.useState([]);

        const router = createBrowserRouter(
            createRoutesFromElements(
                <Route 
                    path="/" 
                    element={<Navbar/>}>
                        <Route
                            index
                            element={<Home cars={cars} setCars={setCars}/>} >
                        </Route>
                        <Route
                            path="catalogue"
                            element={<Catalogue/>} >
                        </Route>
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