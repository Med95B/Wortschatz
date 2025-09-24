import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      alert("Inscription réussie !");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Erreur inscription");
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
        <button type="submit">S’inscrire</button>
      </form>

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

