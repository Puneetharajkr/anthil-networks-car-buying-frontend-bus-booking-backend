import React, { useEffect, useState, useCallback } from "react";
import { auth, db } from "../firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const UserRequests = () => {
  const [requests, setRequests] = useState([]);
  const user = auth.currentUser;

 
  const fetchUserRequests = useCallback(async () => {
    if (!user) return;
    const q = query(
      collection(db, "purchaseRequests"),
      where("userId", "==", user.uid)
    );
    const snap = await getDocs(q);
    const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setRequests(data);
  }, [user]);

 
  const handleBooking = async (req) => {
    try {
     
      await addDoc(collection(db, "bookings"), {
        userId: user.uid,
        carId: req.carId,
        requestId: req.id,
        status: "Booked",
        createdAt: new Date(),
      });

      
      const carRef = doc(db, "cars", req.carId);
      await updateDoc(carRef, { booked: true });

      alert("Car booked successfully!");
      fetchUserRequests(); 
    } catch (error) {
      console.error("Booking error:", error);
      alert("Failed to book the car.");
    }
  };

  useEffect(() => {
    fetchUserRequests();
  }, [fetchUserRequests]);

  return (
    <div style={{ padding: "2rem" }}>
    <div style={{ textAlign: "center" }}>
       <h2>Your Purchase Requests</h2>
    </div>
      {requests.length === 0 ? (
        <p>No requests yet.</p>
      ) : (
        requests.map((req) => (
          <div
            key={req.id}
            style={{
              borderBottom: "1px solid #ccc",
              marginBottom: "1rem",
              paddingBottom: "1rem",
            }}
          >
            <p>
              <strong>Car ID:</strong> {req.carId}
            </p>
            <p>
              <strong>Status:</strong> {req.status}
            </p>
            <p>
              <strong>Message:</strong> {req.message}
            </p>

            {(req.status === "Approved" || req.status === "Contacted") && (
              <button
                onClick={() => handleBooking(req)}
                style={{
                  marginTop: "0.5rem",
                  backgroundColor: "#28a745",
                  color: "white",
                  padding: "0.5rem 1rem",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Book Now
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default UserRequests;
