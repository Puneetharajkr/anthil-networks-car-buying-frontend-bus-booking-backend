import React, { useEffect, useState } from "react";
import { auth, provider, db } from "../firebase/config";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const roleRef = doc(db, "roles", currentUser.uid);
          const roleSnap = await getDoc(roleRef);
          if (roleSnap.exists()) {
            const userRole = roleSnap.data().role;
            console.log("UID:", currentUser.uid);
            console.log("Role from Firestore:", userRole);
            setIsAdmin(userRole === "admin");
          } else {
            console.log("No role found for user");
            setIsAdmin(false);
          }
        } catch (error) {
          console.error("Error fetching role:", error);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }

      setLoading(false); 
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
     
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

 const handleLogout = async () => {
  try {
    await signOut(auth);
    navigate("/"); 
  } catch (error) {
    console.error("Logout Error:", error);
  }
};

  if (loading) return null; 

  return (
  <nav
  className="navbar"
  style={{
    padding: "1rem 2rem",
    background: "linear-gradient(90deg,rgb(220, 21, 127),rgb(231, 232, 245))", // 🌈 Gradient background
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 4px rgba(208, 12, 175, 0.1)",
  }}
    >
      <Link
        to="/"
        className="navbar-brand"
        style={{
          textDecoration: "none",
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#333",
        }}
      >
         CarBuy
      </Link>

      <div style={{ display: "flex", alignItems: "center" }}>
        {user ? (
          <>
            <span style={{ marginRight: "1rem" }}>
              Hi, {user.displayName}
            </span>

            <button
              onClick={() => navigate("/my-requests")}
              style={btnStyle("#007bff")}
            >
              My Requests
            </button>

            <button
              onClick={() => navigate("/my-bookings")}
              style={btnStyle("#28a745")}
            >
              My Bookings
            </button>

            {isAdmin && (
              <>
                <button
                  onClick={() => navigate("/admin")}
                  style={btnStyle("#17a2b8")}
                >
                  Admin
                </button>
                <button
                  onClick={() => navigate("/admin-bookings")}
                  style={btnStyle("#6f42c1")}
                >
                  Manage Bookings
                </button>
              </>
            )}

            <button
              onClick={handleLogout}
              style={btnStyle("#dc3545")}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={handleLogin}
            style={btnStyle("#28a745")}
          >
            Login with Google
          </button>
        )}
      </div>
    </nav>
  );
};

const btnStyle = (bgColor) => ({
  marginRight: "1rem",
  padding: "0.5rem 1rem",
  backgroundColor: bgColor,
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
});

export default Navbar;
