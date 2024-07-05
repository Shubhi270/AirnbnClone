//
//import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 async function registerUser(ev){
    ev.preventDefault();
    try {
   await axios.post("/register", {
     name,
     email,
     password,
   });
   alert("Registration successfull. Now you can log in.");   
    } catch (error) {
    alert("Registration unsuccessfull. Try again in sometime.");  
    }
   
    
  }
  return (
    <div className="mt-4 grow flex  min-h-screen items-center justify-around">
      <div className="">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto"
        onSubmit={ev=>registerUser(ev)}
        >
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />

          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already have an account yet?
            <Link to={"/login"} className="underline text-black">
              {" "}
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
