import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Activation from "./pages/Activation";
import PrivateRoute from "./components/PrivateRoute"

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PrivateRoute> <Home /> </PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      <Route path="/activation/:token" element={<Activation />} />
      </Routes>
    </Router>
  );
}

export default App;

