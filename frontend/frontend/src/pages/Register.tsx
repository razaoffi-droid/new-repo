import React, { useState } from "react";
import axiosClient from "../api/axiosclient";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  // form state matches backend RegisterDto
  const [form, setForm] = useState({
    email: "",
    password: "",
    phone: "",
    dob: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // ✅ send correct fields to backend
      const res = await axiosClient.post("/auth/register", form);

      console.log("✅ Registered user:", res.data);
      alert("Registration successful! You can now login.");
      navigate("/login");
    } catch (error: any) {
      console.error("❌ Registration failed:", error);
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center mt-16">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-96 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-blue-600">
          Register
        </h2>

        <input
          placeholder="Email"
          type="email"
          className="w-full border p-2 rounded"
          required
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Password"
          type="password"
          className="w-full border p-2 rounded"
          required
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <input
          placeholder="Phone"
          type="text"
          className="w-full border p-2 rounded"
          required
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <input
          placeholder="Date of Birth"
          type="date"
          className="w-full border p-2 rounded"
          required
          onChange={(e) => setForm({ ...form, dob: e.target.value })}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>

        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
