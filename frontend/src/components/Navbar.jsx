import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) return null; 

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: "10px 20px",
        background: "#f0f0f0",
      }}
    >
      <button onClick={handleLogout}>Déconnexion</button>
    </nav>
  );
};

export default Navbar;

