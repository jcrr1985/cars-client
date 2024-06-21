/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { apiUrl } from "../main";

interface AddCarProps {
  fetchCars: () => Promise<void>;
}

export const AddCar = ({ fetchCars }: AddCarProps) => {
  type CarType = {
    make: string;
    model: string;
    pkg: string;
    color: string;
    year: string;
    category: string;
    mileage: string;
    price: string;
    id: string;
    filename: string;
    forSell: string;
  };

  const { register, handleSubmit, formState } = useForm<CarType>();

  const { errors } = formState;

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const onSubmit = async (data: CarType) => {
    try {
      const formData = new FormData();
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      formData.append("make", data.make);
      formData.append("model", data.model);
      formData.append("pkg", data.pkg);
      formData.append("color", data.color);
      formData.append("year", data.year);
      formData.append("category", data.category);
      formData.append("mileage", data.mileage);
      formData.append("price", data.price);
      formData.append("forSell", data.forSell);

      await fetch(`${apiUrl}/cars`, {
        method: "POST",
        body: formData,
      });
      await fetchCars();
    } catch (error) {
      console.error("Error creating car:", error);
    }
  };

  return (
    <>
      <fieldset
        style={{
          border: "1px solid #c8bce9",
          borderRadius: "5px",
          padding: "10px",
        }}
      >
        <legend>Add New Car</legend>
        <form
          style={{ display: "flex", alignItems: "center" }}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="form-wrapper">
            <div className="addCar-input">
              <input
                placeholder="Make"
                className="form-input"
                type="text"
                id="make"
                {...register("make", {
                  required: "Package is required",
                })}
              />
              <p>{errors.make && errors.make.message}</p>
            </div>

            <div className="addCar-input">
              <input
                placeholder="Model"
                className="form-input"
                type="text"
                id="model"
                {...register("model", {
                  required: "Model is required",
                })}
              />
              <p>{errors.model && errors.model.message}</p>
            </div>

            <div className="addCar-input">
              <input
                placeholder="Color"
                className="form-input"
                type="text"
                id="color"
                {...register("color", {
                  validate: (value) => {
                    if (!value) {
                      return "Color is required";
                    }
                    return true;
                  },
                })}
              />
              <p>{errors.color && errors.color.message}</p>
            </div>

            <div className="addCar-input">
              <input
                placeholder="Year"
                className="form-input"
                type="text"
                id="year"
                {...register("year", {
                  validate: (value) => {
                    if (!value) {
                      return "Year is required";
                    }
                    if (!/^\d+$/.test(value)) {
                      return "Only numbers allowed";
                    }
                    return true;
                  },
                })}
              />
              <p>{errors.year && errors.year.message}</p>
            </div>

            <div className="addCar-input">
              <input
                placeholder="Category"
                className="form-input"
                type="text"
                id="category"
                {...register("category", {
                  required: true,
                  minLength: 3,
                })}
              />
              <p>{errors.category && errors.category.message}</p>
            </div>

            <div className="addCar-input">
              <input
                placeholder="Mileage"
                className="form-input"
                type="text"
                id="mileage"
                {...register("mileage", {
                  validate: (value) => {
                    if (!value) {
                      return "Year is required";
                    }
                    if (!/^\d+$/.test(value)) {
                      return "Only numbers allowed";
                    }
                    return true;
                  },
                })}
              />
              <p>{errors.mileage && errors.mileage.message}</p>
            </div>

            <div className="addCar-input">
              <input
                placeholder="Price"
                className="form-input"
                type="text"
                id="price"
                {...register("price", {
                  required: true,
                  minLength: 2,
                })}
              />
              <p>{errors.price && errors.price.message}</p>
            </div>

            <div className="addCar-input">
              <input
                placeholder="package"
                className="form-input"
                type="text"
                id="pkg"
                {...register("pkg", {})}
              />
              <p>{errors.id && errors.id.message}</p>
            </div>

            <div className="addCar-input">
              <input
                className="form-input"
                type="file"
                id="image"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <button>Submit</button>
        </form>
      </fieldset>
    </>
  );
};
