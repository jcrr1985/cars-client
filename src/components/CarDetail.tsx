/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CarContext } from "../contexts/IcarContext";
import axios from "axios";
import { apiUrl } from "../main";
import { connectionString, containerName } from "../config/config";

export const CarDetail = () => {
  const { selectedCar, chooseCar, updateCarInContext } = useContext(CarContext);
  console.log("selectedCar", selectedCar);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  const updateCarProperty = async (
    property: string,
    value: string
  ): Promise<void> => {
    if (!selectedCar) {
      alert("no car");
      return;
    }
    try {
      if (selectedCar) {
        const updatedCar = { ...selectedCar, [property]: value };
        console.log("updatedCar", updatedCar);
        const response = await axios.put(
          `${apiUrl}/cars/${selectedCar._id}`,
          updatedCar
        );
        if (response.status === 200) {
          chooseCar(updatedCar);
          updateCarInContext(response.data);
        }
      }
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };
  selectedCar;
  return (
    <>
      {selectedCar && (
        <div className="detail-section">
          <div className="medium-img-div">
            <img
              className="medium-img"
              src={`https://${connectionString}.blob.core.windows.net/${containerName}/${selectedCar._id}/${selectedCar.filename}`}
              alt=""
            />
            <p
              className="specs"
              style={{
                background: selectedCar.forSell ? "none" : "orange",
                borderRadius: "4px",
                padding: ".5rem",
              }}
            >
              {selectedCar.forSell === "true" ? "" : "On hold"}
            </p>
          </div>

          <div style={{ display: "flex" }}>
            <div className="left">
              <div className="specs-container">
                <h2 className="" style={{ marginBottom: "0px", marginTop: 0 }}>
                  {selectedCar.make} - {selectedCar.model}
                </h2>
                <br />
                <div>
                  <h3 className="specs"> Year</h3>
                  <p className="specs"> {selectedCar.year}</p>
                </div>
                <div>
                  <h3 className="specs"> Category</h3>
                  <p className="specs"> {selectedCar.category}</p>
                </div>
                <div>
                  <h3 className="specs"> Color</h3>
                  <p className="specs"> {selectedCar.color}</p>
                </div>
                <div>
                  <h3 className="specs"> Price</h3>
                  <p className="specs"> {selectedCar.price}</p>
                </div>
                <div>
                  <h3 className="specs"> Mileage</h3>
                  <p className="specs"> {selectedCar.mileage}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="specs-div">
            <button
              className="set-status-button"
              style={{
                background:
                  selectedCar.forSell === "true" ? "orange" : "yellowgreen",
              }}
              onClick={() =>
                updateCarProperty(
                  "forSell",
                  selectedCar.forSell === "true" ? "false" : "true"
                )
              }
            >
              {selectedCar.forSell === "true" ? "Hold" : "Sell"}
            </button>
          </div>
          <div />
        </div>
      )}
      <button onClick={handleBack}>Go Back</button>
    </>
  );
};
