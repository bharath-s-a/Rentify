import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const [signup, setSignup] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [pnumber, setPnumber] = useState("");

  const navigate = useNavigate();

  const handlebtn = () => {
    setSignup(!signup);
  };

  const gotohome = () => {
    navigate("/");
  };

  const Submitdata = (e) => {
    e.preventDefault();
    console.log("Form data:", { firstname, lastname, email, pnumber });

    if (signup) {
      if (!email || !pnumber || !firstname || !lastname) {
        alert("Enter the firstname, lastname, email, and number");
      } else {
        Axios.post("http://localhost:3001/signup", {
          firstname,
          lastname,
          email,
          pnumber,
        })
          .then((response) => {
            if (!response.data.error) {
              console.log("Insert successful:", response.data);
              gotohome();
              toast.success("Sign up success");
            } else {
              // To check if user is already registered
              toast.error(`Error: ${response.data.error}`);
            }
          })
          .catch((error) => {
            console.error("Error inserting data:", error);
          });
      }
    }

    // For login
    if (!signup) {
      console.log(email, pnumber, 1);

      Axios.post("http://localhost:3001/login", {
        email,
        pnumber,
      })
        .then((response) => {
          if (response.data && response.data.auth) {
            toast.success("Login success");

            localStorage.setItem(
              "UserDetails",
              JSON.stringify({ email, pnumber })
            );

            localStorage.setItem(
              "Profile",
              JSON.stringify({ token: response.data.token })
            );
            navigate("/");
          } else {
            toast.error(`Error: ${response.data.Error}`);
          }
        })
        .catch((error) => {
          console.error("Error inserting data:", error);
        });
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">
        {signup ? <h1>SignUp</h1> : <h1>Login</h1>}
      </h1>
      <form className="flex flex-col gap-4 " onSubmit={Submitdata}>
        {signup && (
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="firstname"
              id="firstname"
              className="border p-3 rounded-lg"
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="lastname"
              id="lastname"
              className="border p-3 rounded-lg"
              onChange={(e) => {
                setLastname(e.target.value);
              }}
            />
          </div>
        )}
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="pnumber"
          id="pnumber"
          className="border p-3 rounded-lg"
          onChange={(e) => {
            setPnumber(e.target.value);
          }}
        />
        <button
          type="submit"
          className="bg-slate-800 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {signup ? "SignUp" : "SignIn"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>{signup ? "Already have an account" : "Don't have an account"}?</p>
        <button type="button" onClick={handlebtn} className="text-blue-700">
          {signup ? "Signin" : "Signup"}
        </button>
      </div>
    </div>
  );
};

export default SignUp;
