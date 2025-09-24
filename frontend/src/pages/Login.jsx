import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      alert("Connexion réussie !");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Erreur login");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Se connecter</button>
      </form>

      <p>
        Pas encore inscrit ?{" "}
        <Link to="/register">
          <button>Inscription</button>
        </Link>
      </p>
    </div>
  );
};

export default Login;
