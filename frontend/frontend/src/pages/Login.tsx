import React, { useContext, useState } from "react";
import axiosClient from "../api/axiosclient";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await axiosClient.post("/auth/login", form);
    const token = res.data.access_token;

    if (token) {
      localStorage.setItem("token", token); // save it
      setToken(token);                      // update context
      navigate("/dashboard");
    } else {
      alert("Login failed — token not received");
    }
  } catch (err) {
    console.error(err);
    alert("Invalid email or password");
  }
};


  return (
    <div className="flex justify-center mt-16">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-96 space-y-4">
        <h2 className="text-2xl font-semibold text-center text-blue-600">Login</h2>
        <input placeholder="Email" type="email" className="w-full border p-2" onChange={(e) => setForm({...form, email: e.target.value})} />
        <input placeholder="Password" type="password" className="w-full border p-2" onChange={(e) => setForm({...form, password: e.target.value})} />
        <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}


