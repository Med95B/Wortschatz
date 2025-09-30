import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/authSlice";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await dispatch(loginUser(form)).unwrap();

      setMessage("Connexion réussie !");
      setLoading(false);

      
      if (res.payload?.token) {
        navigate("/", { replace: true });
    }

    } catch (err) {
      setMessage(err.response?.data?.message || "Erreur login");
      setLoading(false);
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
        <button type="submit" disabled={loading}>
          {loading ? "Connexion en cours..." : "Se connecter"}
        </button>
      </form>

      {message && (
        <p style={{ marginTop: "20px", color: message.includes("Erreur") ? "red" : "green" }}>
          {message}
        </p>
      )}

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
