import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to /dashboard
    navigate("/dashboard");
  }, [navigate]);

  return null;
};

export default Home;
