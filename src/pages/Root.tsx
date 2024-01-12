import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { persistor } from "../redux/store";

const Root = () => {
  const navigate = useNavigate();

  //clear the local storage after three hours
  //fix the issue of user logged in when they come after a day
  useEffect(() => {
    const oneHour = 1 * 60 * 60 * 1000;
    const resetTimeout = setTimeout(() => {
      localStorage.clear();
      navigate("/");
      window.location.reload();
    }, oneHour);

    return () => clearTimeout(resetTimeout);
  }, [navigate]);
  return (
    <div>
      <Navbar />
      <ToastContainer autoClose={2000} style={{ color: "#2980b9" }} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
