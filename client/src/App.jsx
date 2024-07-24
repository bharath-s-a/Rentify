import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import SignUp from "./Pages/Signup";
import About from "./Pages/About";
import Navbar from "./Components/Navbar";
import Createlisting from "./Pages/Createlisting";
import Search from "./Pages/Search";
import PropertyDetails from "./Pages/PropertyDetails";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Sign-up" element={<SignUp />} />
        <Route path="/Sign-in" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/create-listing" element={<Createlisting />} />
        <Route path="/search" element={<Search />} />
        <Route path="/listing/:name" element={<PropertyDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
