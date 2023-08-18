import { CarType } from "./Icars";

export interface CarContextType {
  selectedCar: CarType | null;
  chooseCar: (car: CarType) => void;
  clearChosenCar: () => void;
}
