import React, { useState } from "react";
import { auth, db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import emailjs from "@emailjs/browser"; 

const CarDetail = ({ car }) => {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const user = auth.currentUser;

  const handleRequest = async () => {
    if (!user) {
      alert("Please login to send a request.");
      return;
    }

    if (!phone.trim() || !message.trim()) {
      alert("Please fill out both phone number and message before submitting.");
      return;
    }

   
   const templateParams = {
  user_name: user.displayName || "Customer",
  user_email: user.email,
  user_phone: phone,
  user_message: message,
  car_model: `${car.make} ${car.model}`,
};


    try {
    
      await emailjs.send(
        "service_xqu5vb8",      
        "template_oktf632",      
        templateParams,
        "3stKb3SjtPO1Gqda8"      
      );

    
      await addDoc(collection(db, "purchaseRequests"), {
        carId: car.id,
        userId: user.uid,
        name: user.displayName,
        email: user.email,
        phone,
        message,
        status: "Pending",
        createdAt: new Date(),
      });

      alert("Request sent successfully via email and saved to database!");
      setPhone("");
      setMessage("");
    } catch (err) {
      console.error("Error sending request:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  if (!car) return <p>Loading car details...</p>;

  return (
    <div style={{
      padding: "2rem",
      display: "flex",
      justifyContent: "center",
      backgroundColor: "#eef2f7",
      minHeight: "100vh"
    }}>
      <div style={{
        maxWidth: "800px",
        width: "100%",
        backgroundColor: "#ffffff",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)"
      }}>
        <h1 style={{ textAlign: "center", marginBottom: "1.5rem", fontSize: "2rem" }}>Car Details</h1>
        <h2 style={{ marginBottom: "1rem", textAlign: "center" }}>
          {car.make} {car.model} ({car.year})
        </h2>

        <div style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          justifyContent: "center"
        }}>
          {Array.isArray(car.imageUrls) && car.imageUrls.length > 0 ? (
            car.imageUrls.map((url, idx) => (
              <img
                key={idx}
                src={url.trim()}
                alt={`Car ${idx}`}
                width="220"
                style={{
                  borderRadius: "10px",
                  objectFit: "cover",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                }}
              />
            ))
          ) : (
            <img
              src="https://via.placeholder.com/400x250?text=No+Image"
              alt="No Car"
              width="220"
              style={{ borderRadius: "10px" }}
            />
          )}
        </div>

       
        <div style={{ marginTop: "1.5rem", lineHeight: "1.8", fontSize: "1rem" }}>
          <p><strong>Variant:</strong> {car.variant}</p>
          <p><strong>Fuel Type:</strong> {car.fuelType}</p>
          <p><strong>Mileage:</strong> {car.mileage}</p>
          <p><strong>Transmission:</strong> {car.transmission}</p>
          <p><strong>Owners:</strong> {car.owners}</p>
          <p><strong>City:</strong> {car.city}</p>
          <p><strong>Description:</strong> {car.description}</p>
          <p><strong>Price:</strong> ₹{car.price}</p>
        </div>

        
        <div style={{ marginTop: "2rem" }}>
          <h3>Request to Purchase</h3>
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{
              padding: "0.5rem",
              width: "100%",
              marginBottom: "0.5rem",
              borderRadius: "5px",
              border: "1px solid #ccc"
            }}
            required
          />
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{
              padding: "0.5rem",
              width: "100%",
              minHeight: "100px",
              borderRadius: "5px",
              border: "1px solid #ccc"
            }}
            required
          />
          <br />
          <button
            onClick={handleRequest}
            style={{
              marginTop: "0.75rem",
              padding: "0.6rem 1.5rem",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
