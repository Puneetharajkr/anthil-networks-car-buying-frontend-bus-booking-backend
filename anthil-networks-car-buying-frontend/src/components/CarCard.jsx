import React from "react";
import { useNavigate } from "react-router-dom";

const CarCard = ({ car }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/car/${car.id}`)}
      style={{
        border: "1px solid #ddd",
        padding: "1rem",
        marginBottom: "1rem",
        borderRadius: "8px",
        cursor: "pointer",
        backgroundColor: "#fff",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
        transition: "transform 0.2s ease-in-out",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <img
        src={
          Array.isArray(car.imageUrls) && car.imageUrls.length > 0
            ? car.imageUrls[0].trim()
            : "https://via.placeholder.com/400x250?text=No+Image"
        }
        alt={car.model}
        style={{
            width: "100%",
            height: "200px",               
            objectFit: "cover",            
            borderRadius: "8px",
            marginBottom: "0.75rem",
            display: "block"
        }}
      />
      <h3 style={{ margin: "0 0 0.5rem" }}>
        {car.make} {car.model}
      </h3>
      <p>
        <strong>Year:</strong> {car.year || "N/A"}
      </p>
      <p>
        <strong>Price:</strong> ₹{car.price || "N/A"}
      </p>
      <p>
        <strong>Mileage:</strong>{" "}
        {car.mileage ? `${car.mileage} km` : "N/A"}
      </p>
    </div>
  );
};

export default CarCard;
