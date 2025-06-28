import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc
} from "firebase/firestore";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const snap = await getDocs(collection(db, "bookings"));
    const enriched = await Promise.all(
      snap.docs.map(async (docSnap) => {
        const data = { id: docSnap.id, ...docSnap.data() };
        const carDoc = await getDoc(doc(db, "cars", data.carId));
        return {
          ...data,
          carName: carDoc.exists() ? `${carDoc.data().make} ${carDoc.data().model}` : "Unknown Car",
        };
      })
    );
    setBookings(enriched);
  };

  const handleStatusChange = async (id, newStatus) => {
    await updateDoc(doc(db, "bookings", id), { status: newStatus });
    fetchBookings(); 
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Admin: Manage Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking.id} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
            <p><strong>Car:</strong> {booking.carName}</p>
            <p><strong>User ID:</strong> {booking.userId}</p>
            <p><strong>Status:</strong> {booking.status}</p>
            <p><strong>Booked At:</strong> {booking.createdAt?.seconds ? new Date(booking.createdAt.seconds * 1000).toLocaleString() : "N/A"}</p>
            <select
              value={booking.status}
              onChange={(e) => handleStatusChange(booking.id, e.target.value)}
              style={{ padding: "0.5rem", marginTop: "0.5rem" }}
            >
              <option value="Booked">Booked</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminBookings;
