/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Chip from "@mui/material/Chip";

import { CarType } from "../interfaces/Icars";
import { AddCar } from "./AddCar";
import { CarContext } from "../contexts/IcarContext";

import { CarContextType } from "../interfaces/IcarContextType";

export const CarsList = () => {
  const apiUrl = "http://localhost:3001";
  const navigate = useNavigate();
  const [cars, setCars] = useState<CarType[]>([]);
  const { chooseCar } = useContext(CarContext) as CarContextType;

  const fetchCars = async () => {
    try {
      const response = await axios.get(`${apiUrl}/cars`);
      const carsFetched: CarType[] = response.data;
      console.log("carsFetched", carsFetched);
      setCars(carsFetched);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleViewDetails = (car: CarType) => {
    chooseCar(car);
    const id = car._id;
    navigate(`/car/:${id}`);
  };

  const deleteCar = async (id: string) => {
    try {
      await axios.delete(`${apiUrl}/cars/${id}`);
      fetchCars();
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  return (
    <div>
      <AddCar fetchCars={fetchCars} />
      <br />
      <div className="car-grid">
        {cars.map((car) => (
          <div className="card" key={car._id}>
            <img
              className="thumbnail"
              src={`${apiUrl}/uploads/${car.filename}`}
              alt=""
            />
            <h4 style={{ marginBottom: "0px" }}>
              {" "}
              {car.make} - {car.model} (IT)
            </h4>
            <div className="">
              <Chip
                label={car.forSell === "true" ? "For Sale" : "On Hold"}
                color={car.forSell === "true" ? "primary" : "secondary"}
                variant="outlined"
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <p className="year">Year</p>
              <p className="year">2021-12-07</p>
            </div>
            <div className="">
              <p>{car.forSell ? "For sell" : "On hold"}</p>
            </div>
            <div className="btn-container">
              <button
                className="view-details-btn btn"
                onClick={() => handleViewDetails(car)}
              >
                View Details
              </button>
              <button
                className="delete-btn btn"
                onClick={() => {
                  deleteCar(car._id).catch((error) => {
                    console.error("Error deleting car:", error);
                  });
                }}
              >
                Delete
              </button>
            </div>
            <div />
          </div>
        ))}
      </div>
    </div>
  );
};
