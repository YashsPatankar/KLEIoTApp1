import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import About from "./About";
import Information from "./Information";
import Contact from "./Contact";
import LoginPage from "./LoginPage";
import Test from "./Test";
import axios from "axios";
import { FaHome, FaInfoCircle, FaPhone, FaSignInAlt, FaBars } from "react-icons/fa";

function Home({ setLoginStatus, setUserType, oid, setOid, setUsername }) {
  const [apartmentName, setApartmentname] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:9000/api/getAptname")
      .then((response) => {
        setApartmentname(response.data[0].Apartmentname);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-r from-cyan-500 to-blue-700">
        <nav className="bg-gradient-to-r from-blue-600 to-cyan-500">
          <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
            <h1 className="text-white text-3xl font-extrabold">
              {apartmentName} Apartment Management System
            </h1>
            <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              <FaBars className="h-6 w-6" />
            </button>
            <div className="hidden lg:flex space-x-6">
              <NavigationLinks />
            </div>
          </div>
          {isMenuOpen && (
            <div className="lg:hidden bg-gradient-to-r from-blue-500 to-green-500 py-2">
              <div
                className="flex flex-col items-center space-y-4"
                onClick={() => setIsMenuOpen(false)}
              >
                <NavigationLinks />
              </div>
            </div>
          )}
        </nav>

        <div className="flex-grow p-6">
          <Routes>
            <Route path="/" element={<Test />} />
            <Route path="/home" element={<Test />} />
            <Route path="/about" element={<About />} />
            <Route path="/information" element={<Information />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/login"
              element={
                <LoginPage
                  setLoginStatus={setLoginStatus}
                  setUserType={setUserType}
                  setOid={setOid}
                  oid={oid}
                  setUsername={setUsername}
                />
              }
            />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-cyan-600 to-blue-500 text-white text-center py-4 mt-6">
        <p>
            &copy; {new Date().getFullYear()} {apartmentName} Apartment Management System
          </p>
        </footer>
      </div>
    </Router>
  );
}

function NavigationLinks() {
  return (
    <>
      <Link
        to="/home"
        className="text-white text-lg font-medium flex items-center space-x-2 hover:text-gray-200 transition duration-300"
      >
        <FaHome />
        <span>Home</span>
      </Link>
      <Link
        to="/about"
        className="text-white text-lg font-medium flex items-center space-x-2 hover:text-gray-200 transition duration-300"
      >
        <FaInfoCircle />
        <span>About</span>
      </Link>
      <Link
        to="/information"
        className="text-white text-lg font-medium flex items-center space-x-2 hover:text-gray-200 transition duration-300"
      >
        <FaInfoCircle />
        <span>Information</span>
      </Link>
      <Link
        to="/contact"
        className="text-white text-lg font-medium flex items-center space-x-2 hover:text-gray-200 transition duration-300"
      >
        <FaPhone />
        <span>Contact</span>
      </Link>
      <Link
        to="/login"
        className="text-white text-lg font-medium flex items-center space-x-2 hover:text-gray-200 transition duration-300"
      >
        <FaSignInAlt />
        <span>Login</span>
      </Link>
    </>
  );
}

export default Home;
