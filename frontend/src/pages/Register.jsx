import { useState } from "react";
import {  Link } from "react-router-dom";
import api from "../api/api";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await api.post("/auth/register", form);
      setMessage(res.data.message || "Inscription réussie ! Vérifiez votre email pour activer votre compte.");
      setLoading(false);

     
      setForm({ username: "", email: "", password: "" });
    } catch (err) {
      setMessage(err.response?.data?.message || "Erreur inscription");
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Nom"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Mot de passe"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Inscription en cours..." : "S’inscrire"}
        </button>
      </form>

      {message && (
        <p style={{ marginTop: "20px", color: message.includes("Erreur") ? "red" : "green" }}>
          {message}
        </p>
      )}

      <p>
        Déjà inscrit ?{" "}
        <Link to="/login">
          <button>Connexion</button>
        </Link>
      </p>
    </div>
  );
};

export default Register;


