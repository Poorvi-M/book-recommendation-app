import React, { useState } from "react";
import api from "../axiosConfig";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      const res = await api.post("/api/auth/register", { username, email, password });
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (e) {
      setErr(e.response?.data?.error || "Registration failed");
    }
  }

  return (
    <form className="card max-w-sm mx-auto mt-10" onSubmit={handleSubmit}>
      <h2 className="font-bold mb-2 text-xl">Register</h2>
      {err && <div className="text-red-500 mb-2">{err}</div>}
      <input className="input" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
      <input className="input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input className="input" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button className="btn-primary mt-2">Register</button>
    </form>
  );
}
