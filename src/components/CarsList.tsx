/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion

import { apiUrl } from "../main";

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Chip from "@mui/material/Chip";

import { CarType } from "../interfaces/Icars";
import { AddCar } from "./AddCar";
import { CarContext } from "../contexts/IcarContext";

import { CarContextType } from "../interfaces/IcarContextType";
import { connectionString, containerName } from "../config/config";

export const CarsList = () => {
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
  const bucketName = "namekusein";

  return (
    <div>
      <AddCar fetchCars={fetchCars} />
      <br />
      <div className="car-grid">
        {cars.map((car) => (
          <div className="card" key={car._id}>
            <img
              className="thumbnail"
              src={`https://storage.googleapis.com/${bucketName}/${car.filename}`}
              alt=""
            />
            <div>
              <h4>
                {" "}
                {car.make} - {car.model}
              </h4>
            </div>
            <div className="">
              <Chip
                label={car.forSell === "true" ? "For Sale" : "On Hold"}
                color={car.forSell === "true" ? "primary" : "secondary"}
                variant="outlined"
              />
            </div>
            <div>
              <p className="year">
                <b>Year:</b> {car.year}
              </p>
            </div>
            <div>
              <p className="year">
                <b>Color:</b> {car.color}
              </p>
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
