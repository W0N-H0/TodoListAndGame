import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SlotGame from "./pages/SlotGame";
import Main from "./pages/Main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/slotgame" element={<SlotGame />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
