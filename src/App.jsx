import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { createContext, useState } from "react";

import RoomDetails from "./components/RoomDetails";
import Home from "./components/Home";
import Rooms from "./components/Rooms";

import { data } from "./data/data";

export const ApiContext = createContext();

const App = () => {
  const [rooms, setRooms] = useState(data);
  const [customerInfo, setCustomerInfo] = useState({});
  return (
    <ApiContext.Provider value={{ rooms, customerInfo, setCustomerInfo }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
        </Routes>
      </Router>
    </ApiContext.Provider>
  );
};

export default App;
