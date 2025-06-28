import React, { useEffect, useState } from "react";
import { db, storage } from "../firebase/config";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const CarForm = ({ fetchCars, selectedCar, clearSelection }) => {
  const [car, setCar] = useState({
    make: "",
    model: "",
    year: "",
    variant: "",
    fuelType: "",
    mileage: "",
    transmission: "",
    owners: "",
    city: "",
    description: "",
    price: "",
    imageUrls: [],
  });
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (selectedCar) {
      setCar(selectedCar);
    }
  }, [selectedCar]);

  const uploadImages = async () => {
    const urls = [];
    for (const image of images) {
      const imageRef = ref(storage, `cars/${uuidv4()}`);
      await uploadBytes(imageRef, image);
      const url = await getDownloadURL(imageRef);
      urls.push(url);
    }
    return urls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let uploadedUrls = [];
    if (images.length > 0) uploadedUrls = await uploadImages();
    const carData = { ...car, imageUrls: [...(car.imageUrls || []), ...uploadedUrls] };

    if (selectedCar) {
      await updateDoc(doc(db, "cars", selectedCar.id), carData);
    } else {
      await addDoc(collection(db, "cars"), carData);
    }

    setCar({ make: "", model: "", year: "", variant: "", fuelType: "", mileage: "", transmission: "", owners: "", city: "", description: "", price: "", imageUrls: [] });
    setImages([]);
    fetchCars();
    clearSelection();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <h3>{selectedCar ? "Edit Car" : "Add New Car"}</h3>
      <input value={car.make} onChange={(e) => setCar({ ...car, make: e.target.value })} placeholder="Make" required />
      <input value={car.model} onChange={(e) => setCar({ ...car, model: e.target.value })} placeholder="Model" required />
      <input value={car.year} onChange={(e) => setCar({ ...car, year: e.target.value })} placeholder="Year" required />
      <input value={car.variant} onChange={(e) => setCar({ ...car, variant: e.target.value })} placeholder="Variant" />
      <input value={car.fuelType} onChange={(e) => setCar({ ...car, fuelType: e.target.value })} placeholder="Fuel Type" />
      <input value={car.mileage} onChange={(e) => setCar({ ...car, mileage: e.target.value })} placeholder="Mileage" />
      <input value={car.transmission} onChange={(e) => setCar({ ...car, transmission: e.target.value })} placeholder="Transmission" />
      <input value={car.owners} onChange={(e) => setCar({ ...car, owners: e.target.value })} placeholder="No. of Owners" />
      <input value={car.city} onChange={(e) => setCar({ ...car, city: e.target.value })} placeholder="Registration City" />
      <textarea value={car.description} onChange={(e) => setCar({ ...car, description: e.target.value })} placeholder="Description"></textarea>
      <input value={car.price} onChange={(e) => setCar({ ...car, price: e.target.value })} placeholder="Initial Price" required />
      <input type="file" multiple onChange={(e) => setImages(Array.from(e.target.files))} />
      <button type="submit">{selectedCar ? "Update Car" : "Add Car"}</button>
    </form>
  );
};

export default CarForm;
