import { useState, createContext, ReactNode } from "react";
import { CarType } from "../interfaces/Icars";

export interface CarContextType {
  selectedCar: CarType | null;
  carListInCtx: CarType[];
  chooseCar: (car: CarType) => void;
  clearChosenCar: () => void;
  SetCarListInCtx: (carList: CarType[]) => void;
  updateCarInContext: (updatedCar: CarType) => void;
}

export const CarContext = createContext<CarContextType>({
  selectedCar: null,
  carListInCtx: [],
  chooseCar: function (): void {
    throw new Error("Function not implemented.");
  },
  clearChosenCar: function (): void {
    throw new Error("Function not implemented.");
  },
  SetCarListInCtx: function (): void {
    throw new Error("Function not implemented.");
  },
  updateCarInContext: function (): void {
    throw new Error("Function not implemented.");
  },
});

const CarProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCar, setSelectedCar] = useState<CarType | null>(null);
  const [carListInCtx, setCarListInCtx] = useState<CarType[]>([]);

  const chooseCar = (car: CarType) => {
    setSelectedCar(car);
  };

  const clearChosenCar = () => {
    setSelectedCar(null);
  };

  const updateCarInContext = (updatedCar: CarType) => {
    const updatedCars = carListInCtx.map((car) =>
      car._id === updatedCar._id ? updatedCar : car
    );
    setCarListInCtx(updatedCars);
  };

  return (
    <CarContext.Provider
      value={{
        selectedCar,
        carListInCtx,
        chooseCar,
        clearChosenCar,
        SetCarListInCtx: setCarListInCtx,
        updateCarInContext,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};

export default CarProvider;
