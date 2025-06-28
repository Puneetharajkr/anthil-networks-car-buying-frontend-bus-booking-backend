import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import CarDetail from "../components/CarDetail";

const CarDetailPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      const docRef = doc(db, "cars", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCar({ id: docSnap.id, ...docSnap.data() });
      }
    };
    fetchCar();
  }, [id]);

  return <CarDetail car={car} />;
};

export default CarDetailPage;