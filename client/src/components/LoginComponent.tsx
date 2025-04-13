import { Link, useNavigate } from "react-router-dom";
import "./LoginComponent.css";
import { useContext, useRef } from "react";
import type { FormEventHandler } from "react";
import logoDesktop from "../assets/images/logo-removebg.png";
import UserContext from "../context/userContext";
import PrimaryButton from "./reuasble-ui/PrimaryButton";
function LoginComponent() {
  const { setUserConnected } = useContext(UserContext);
  const navigate = useNavigate();

  // Références pour récupérer les valeurs des champs email et mot de passe
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // Fonction qui gère la soumission du formulaire
  const handleSubmit: FormEventHandler = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    try {
      // Appel à l'API pour demander une connexion
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          method: "POST",
          credentials: "include", // Permet d'inclure cookie dans la requète
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: (emailRef.current as HTMLInputElement).value, // Récupère la valeur de champs email
            password: (passwordRef.current as HTMLInputElement).value, // Récupère la valeur de champs password
          }),
        },
      );
      if (response.status === 200) {
        // Ensuite une deuxième requête pour récupérer l’utilisateur
        const userRes = await fetch(`${import.meta.env.VITE_API_URL}/api/me`, {
          method: "GET",
          credentials: "include",
        });

        if (userRes.ok) {
          const user = await userRes.json();
          setUserConnected(user);
          navigate("/home");
        } else {
          alert("Unable to fetch user after login.");
        }
      } else {
        alert("Email or password incorrect");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred, please try again.");
    }
  };
  return (
    <section id="entirepage">
      <div id="logo-section-login-page">
        <Link to="/home">
          <img src={logoDesktop} alt="logo" id="logoImageDesktop_login" />
        </Link>
      </div>
      <section className="display">
        <h2 id="loginsubtitle1">Login</h2>
      </section>
      <form onSubmit={handleSubmit}>
        <section className="display">
          <label htmlFor="email">
            <input
              type="text"
              className="login_username_password"
              ref={emailRef}
              placeholder="email"
              required
            />
          </label>
        </section>
        <section className="display">
          <h2 id="loginsubtitle2">Password</h2>
        </section>
        <section className="display">
          <label htmlFor="password">
            <input
              type="password"
              className="login_username_password"
              ref={passwordRef}
              placeholder="Password"
              required
            />
          </label>
        </section>
        <section className="display">
          <PrimaryButton id="submitbutton" type="submit" label="Submit" />
        </section>
      </form>
      <section className="display">
        <Link to="/password_recovery" id="passwordforgotten">
          Password forgotten ?
        </Link>
      </section>
      <section className="display">
        <Link to="/signup" id="signup">
          Create an account
        </Link>
      </section>
    </section>
  );
}
export default LoginComponent;
