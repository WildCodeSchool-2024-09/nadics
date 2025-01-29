import "./App.css";
import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode";
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
  console.info(auth);

  // console.log(
  //   jwtDecode(
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  //   ),
  // );
  return (
    <>
      <Navbar setAuth={setAuth} />
      <Outlet context={{ auth, setAuth }} />
      <Footer />
    </>
  );
}
export default App;
