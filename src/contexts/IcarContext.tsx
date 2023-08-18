/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState, createContext, ReactNode } from 'react';

import { CarType } from '../interfaces/Icars';

export interface CarContextType {
	selectedCar: CarType | null;
	carListInCtx: CarType[];
	chooseCar: (car: CarType) => void;
	clearChosenCar: () => void;
	SetCarListInCtx: (carList: CarType[]) => void;
}


export const CarContext = createContext<CarContextType>({
	selectedCar: null,
	carListInCtx: [],
	chooseCar: function (car: CarType): void {
		throw new Error('Function not implemented.');
	},
	clearChosenCar: function (): void {
		throw new Error('Function not implemented.');
	},
	SetCarListInCtx: function (carList: CarType[]): void {
		throw new Error('Function not implemented.');
	}
});


const CarProvider = ({ children }: { children: ReactNode }) => {

	const [selectedCar, SetSelectedCar] = useState<CarType | null>(null);
	const [carListInCtx, SetCarListInCtx] = useState<CarType[]>([]);


	const chooseCar = (car: CarType) => {
		SetSelectedCar(car);
	}

	const clearChosenCar = () => {
		SetSelectedCar(null)
	}


	const carContextValue = {
		selectedCar, chooseCar, clearChosenCar, carListInCtx, SetCarListInCtx
	}

	return (
		<CarContext.Provider value={carContextValue}>
			{children}
		</CarContext.Provider>
	)
}

export default CarProvider;
