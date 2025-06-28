import React from "react";
import CarCard from "./CarCard";

const CarList = ({ cars }) => {
  if (!cars || cars.length === 0) {
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>No cars available right now.</p>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "1.5rem",
        padding: "1rem",
      }}
    >
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
};

export default CarList;
