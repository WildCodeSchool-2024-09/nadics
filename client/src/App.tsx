import "./App.css";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
export type Auth = {
  token: string;
};
function App() {
  const [auth, setAuth] = useState<Auth | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Vérifier la présence du token dans localStorage au démarrage
    const token = Cookies.get("authToken");
    if (token) {
      setAuth({ token });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <Navbar auth={auth} setAuth={setAuth} />
      <Outlet context={{ auth, setAuth }} />
      <Footer />
    </>
  );
}
export default App;
