import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import CarForm from "./CarForm";

const AdminDashboard = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);

  const fetchCars = async () => {
    const snapshot = await getDocs(collection(db, "cars"));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setCars(data);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "cars", id));
    fetchCars();
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Admin Dashboard</h2>
      <CarForm fetchCars={fetchCars} selectedCar={selectedCar} clearSelection={() => setSelectedCar(null)} />
      <h3>All Listings</h3>
      {cars.map((car) => (
        <div key={car.id} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
          <p><strong>{car.make} {car.model}</strong></p>
          <p>Price: ₹{car.price}</p>
          <button onClick={() => setSelectedCar(car)}>Edit</button>
          <button onClick={() => handleDelete(car.id)} style={{ marginLeft: "1rem" }}>Delete</button>
        </div>
      ))}
      <RequestManager />
    </div>
  );
};

export default AdminDashboard;

const RequestManager = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const snap = await getDocs(collection(db, "purchaseRequests"));
    const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setRequests(data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    await updateDoc(doc(db, "purchaseRequests", id), { status: newStatus });
    fetchRequests();
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>Purchase Requests</h3>
      {requests.length === 0 ? (
        <p>No requests yet.</p>
      ) : (
        requests.map((req) => (
          <div key={req.id} style={{ borderBottom: "1px solid #ccc", padding: "1rem" }}>
            <p><strong>Car ID:</strong> {req.carId}</p>
            <p><strong>Name:</strong> {req.name}</p>
            <p><strong>Email:</strong> {req.email}</p>
            <p><strong>Phone:</strong> {req.phone}</p>
            <p><strong>Message:</strong> {req.message}</p>
            <p><strong>Status:</strong> {req.status}</p>
            <select
              value={req.status}
              onChange={(e) => handleStatusChange(req.id, e.target.value)}
            >
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
              <option>Contacted</option>
            </select>
          </div>
        ))
      )}
    </div>
  );
};