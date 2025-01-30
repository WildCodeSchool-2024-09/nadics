import { Link, useNavigate } from "react-router-dom";
import "./LoginComponent.css";
import Cookies from "js-cookie";
import { useContext, useRef } from "react";
import type { FormEventHandler } from "react";
import AuthContext from "../context/authContext";

function LoginComponent() {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { setAuth } = useContext(AuthContext);

  const handleSubmit: FormEventHandler = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    try {
      // Appel à l'API pour demander une connexion
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email:
              /* rendering process ensures the ref is defined before the form is submitted */
              (emailRef.current as HTMLInputElement).value,
            password:
              /* rendering process ensures the ref is defined before the form is submitted */
              (passwordRef.current as HTMLInputElement).value,
          }),
        },
      );

      // Redirection vers la page de connexion si la création réussit
      if (response.status === 200) {
        const data = await response.json();
        const token = data.token;
        Cookies.set("authToken", token, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });
        setAuth(token);
        navigate("/home");
        window.location.reload();
      } else {
        // Log des détails de la réponse en cas d'échec
        console.info(response);
      }
    } catch (err) {
      // Log des erreurs possibles
      console.error(err);
    }
  };
  return (
    <section id="entirepage">
      {/* <section id="displaylogintitle">
          <h1 className="logintitle">Smart choice</h1>
        </section> */}
      <section className="display">
        <h2 id="loginsubtitle1">Login</h2>
      </section>
      <form onSubmit={handleSubmit}>
        <section className="display">
          <label htmlFor="email">
            <input
              type="text"
              id="loginusername"
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
          <label htmlFor="loginpassword">
            <input
              type="password"
              id="loginpassword"
              ref={passwordRef}
              placeholder="Password"
              required
            />
          </label>
        </section>
        <section className="display">
          <button id="submitbutton" type="submit">
            Submit
          </button>
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
