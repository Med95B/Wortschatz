import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

const Activation = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const activateUser = async () => {
      try {
        const res = await api.post('/auth/activation', { token });
        setMessage(res.data.message);

        // Redirection vers login apres 2s
        setTimeout(() => navigate("/login"), 2000);
      } catch (error) {
        setMessage(error.response?.data?.message || "Erreur serveur");
      } finally {
        setLoading(false);
      }
    };

    if (token) activateUser();
  }, [token, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {loading ? <p>Activation en cours...</p> : <p>{message}</p>}
    </div>
  );
};

export default Activation;

