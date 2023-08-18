import React from "react";
import { render, screen } from "@testing-library/react";
import { CarsList } from "../components/CarsList";
import { jest, expect } from "@jest/globals";


test("renders cars correctly", () => {
  const mockCars = [
    {
      _id: "64df841aeae8f687a3b9af6b",
      make: "Toyota",
      model: "Corola",
      year: "1995",
      filename: "image-1692369946761-106220274.jpeg",
      category: "sedan",
      color: "rojo",
      mileage: "5000",
      package: "idontknow",
      price: "2000",
    },
    {
      _id: "34df841aeae8f687a3b9a789",
      make: "Honda",
      model: "Civic",
      year: "2009",
      filename: "image-1792369946761-106220273.jpeg",
      category: "sedan",
      color: "Azul",
      mileage: "2000",
      package: "idontknow 2",
      price: "3000",
    },
  ];

  jest.mock("../contexts/IcarContext", () => ({
    CarContext: {
      selectedCar: null,
      chooseCar: jest.fn(),
      clearChosenCar: jest.fn(),
    },
  }));

  jest.mock("../components/CarsList", () => ({
    fetchCars: jest.fn(() => Promise.resolve(mockCars)),
  }));

  render(<CarsList />);

  const carElements = screen.getAllByRole("car");
  expect(carElements.length).toBe(mockCars.length);
});
