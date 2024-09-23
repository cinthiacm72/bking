import React, { useState } from "react";

const Flights = () => {
  const [dat, setDat] = useState("");
  const vuelos = async () => {
    try {
      const res = await fetch("http://localhost:3000/flights");
      const data = await res.json();
      return setDat(data);
    } catch (error) {
      console.log(error);
    }
  };
  vuelos();

  return <h2>{dat}</h2>;
};

export default Flights;
