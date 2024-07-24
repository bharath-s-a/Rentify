import { Link } from "react-router-dom";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem("UserDetails");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    } else {
      const token = localStorage.getItem("token");
      if (token) {
        Axios.get("https://localhost:3001/isAuth", {
          headers: {
            "x-access-token": token,
          },
        })
          .then((response) => {
            if (response.data.auth) {
              const userData = response.data.userData;
              setUserData(userData);
              localStorage.setItem("userDetails", JSON.stringify(userData));
            } else {
              console.error("Authentication failed");
            }
          })
          .catch((error) => {
            console.error("An unexpected error occurred:", error.message);
          });
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setUserData(null);
    navigate("/");
  };

  return (
    <navbar className="bg-slate-900 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Rentify</span>
            <span className="text-slate-700">Website</span>
          </h1>
        </Link>
        <p className="text-slate-700 text-sm sm:text-base font-bold">
          Discover, Buy, and Sell with Us
        </p>
        <ul className="flex gap-6 items-center">
          <Link to="/">
            <li className="hidden sm:inline hover:underline text-slate-700">
              Home
            </li>
          </Link>
          <Link to="/About">
            <li className="hidden sm:inline hover:underline text-slate-700">
              About
            </li>
          </Link>

          <li className="flex items-center">
            {userData && userData.email && (
              <div className="flex items-center">
                <div className="avatar"></div>
                <p className="text-teal-500 font-bold ml-3">{userData.email}</p>
              </div>
            )}
          </li>
          <li className="pr-8">
            {userData ? (
              <button
                className="text-slate-500 hover:text-gray-300 font-bold"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <Link to="/Sign-in">
                <button className="hover:underline text-slate-700">
                  SignIn
                </button>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </navbar>
  );
};

export default Navbar;
