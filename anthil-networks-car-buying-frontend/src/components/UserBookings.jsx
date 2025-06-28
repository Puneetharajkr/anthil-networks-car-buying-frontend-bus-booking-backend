import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc
} from "firebase/firestore";

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  const getCarDetails = async (carId) => {
    try {
      const carDoc = await getDoc(doc(db, "cars", carId));
      return carDoc.exists() ? carDoc.data() : null;
    } catch (error) {
      console.error("Error fetching car:", error);
      return null;
    }
  };

  const fetchBookings = async () => {
    if (!user) return;
    try {
      const q = query(collection(db, "bookings"), where("userId", "==", user.uid));
      const snap = await getDocs(q);

      const enrichedBookings = await Promise.all(
        snap.docs.map(async (docSnap) => {
          const data = { id: docSnap.id, ...docSnap.data() };
          const car = await getCarDetails(data.carId);
          return {
            ...data,
            carName: car ? `${car.make} ${car.model}` : "Unknown Car"
          };
        })
      );

      setBookings(enrichedBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line
  }, []);

  return (
  <div style={{ padding: "2rem" }}>
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        backgroundColor: "#f9f9f9",
        padding: "2rem",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Your Bookings</h2>
      {loading ? (
        <p>Loading...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking.id}
            style={{
              borderBottom: "1px solid #ccc",
              marginBottom: "1rem",
              paddingBottom: "1rem"
            }}
          >
            <p><strong>Car:</strong> {booking.carName}</p>
            <p><strong>Status:</strong> {
              booking.status === "Booked" ? "🟦 Booked" :
              booking.status === "Completed" ? "✅ Completed" :
              booking.status === "Cancelled" ? "❌ Cancelled" :
              booking.status
            }</p>
            <p><strong>Date:</strong> {
              booking.createdAt?.seconds
                ? new Date(booking.createdAt.seconds * 1000).toLocaleString()
                : "N/A"
            }</p>
          </div>
        ))
      )}
    </div>
    </div>
  );
};

export default UserBookings;
