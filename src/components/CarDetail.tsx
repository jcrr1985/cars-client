/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CarContext } from "../contexts/IcarContext";
import axios from "axios";

export const CarDetail = () => {
  const { selectedCar, chooseCar } = useContext(CarContext);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  const updateCarProperty = async (
    property: string,
    value: string | boolean
  ): Promise<void> => {
    try {
      if (selectedCar) {
        const updatedCar = { ...selectedCar, [property]: value };
        const response = await axios.put(
          `http://localhost:3000/cars/${selectedCar._id}`,
          updatedCar
        );
        if (response.status === 200) {
          chooseCar(updatedCar);
        }
      }
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  return (
    <>
      {selectedCar && (
        <div className="detail-section">
          <div className="medium-img-div">
            <img
              className="medium-img"
              src={`http://localhost:3000/uploads/${selectedCar.filename}`}
              alt=""
            />
            <p
              className="year"
              style={{
                background: selectedCar.forSell ? "none" : "orange",
                borderRadius: "4px",
                padding: ".5rem",
              }}
            >
              {selectedCar.forSell ? "" : "On hold"}
            </p>
          </div>

          <div style={{ display: "flex" }}>
            <div className="left">
              <div>
                <p className="year" style={{ marginBottom: "0px" }}>
                  {selectedCar.make} - {selectedCar.model}
                </p>
                <br />
                <h3 className="year"> Year</h3>
                <p className="year"> {selectedCar.year}</p>
              </div>
            </div>
          </div>
          <div className="year-div">
            <button
              className="set-status-button"
              style={{
                background: selectedCar.forSell ? "orange" : "yellowgreen",
              }}
              onClick={() =>
                updateCarProperty("forSell", !selectedCar?.forSell)
              }
            >
              {selectedCar.forSell ? "Hold" : "Sell"}
            </button>
          </div>
          <div />
        </div>
      )}
      <button onClick={handleBack}>Go Back</button>
    </>
  );
};
