import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import CarCard from "../components/CarCard";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    year: "",
    mileage: "",
    price: "",
  });

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carCollection = collection(db, "cars");
        const carSnapshot = await getDocs(carCollection);
        const carList = carSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCars(carList);
        setFilteredCars(carList); 
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    let filtered = [...cars];

 
    if (search.trim()) {
      filtered = filtered.filter((car) =>
        `${car.make} ${car.model}`.toLowerCase().includes(search.toLowerCase())
      );
    }

 
    if (filters.year) {
      filtered = filtered.filter((car) => String(car.year) === filters.year);
    }

    if (filters.mileage) {
      filtered = filtered.filter((car) => Number(car.mileage) <= Number(filters.mileage));
    }

    if (filters.price) {
      filtered = filtered.filter((car) => Number(car.price) <= Number(filters.price));
    }

    setFilteredCars(filtered);
  }, [search, filters, cars]);

  const resetFilters = () => {
    setSearch("");
    setFilters({ year: "", price: "", mileage: "" });
    setFilteredCars(cars);
  };

  return (
    <div className="home-container" style={{ padding: "1rem" }}>
      <h2 style={{ textAlign: "center" }}>Available Cars</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          resetFilters();
        }}
        style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}
      >
        <input
          type="text"
          placeholder="Search by Make or Model"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Price"
          value={filters.price}
          onChange={(e) => setFilters({ ...filters, price: e.target.value })}
        />

        <input
          type="number"
          placeholder="Max Mileage"
          value={filters.mileage}
          onChange={(e) => setFilters({ ...filters, mileage: e.target.value })}
        />

        <input
          type="number"
          placeholder="Year"
          value={filters.year}
          onChange={(e) => setFilters({ ...filters, year: e.target.value })}
        />

        <button type="submit">Reset Filters</button>
      </form>

    
      <div
        className="car-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => <CarCard key={car.id} car={car} />)
        ) : (
          <p style={{ textAlign: "center", gridColumn: "1 / -1" }}>No cars found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
