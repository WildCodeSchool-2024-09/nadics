import "./App.css";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useState } from "react";

type User = {
  id: number;
  email: string;
  is_admin: boolean;
};

type Auth = {
  user: User;
  token: string;
};

function App() {
  const [auth, setAuth] = useState(null as Auth | null);

  return (
    <>
      <Navbar />
      <Outlet context={{ auth, setAuth }} />
      <Footer />
    </>
  );
}

export default App;
