import { Link } from "react-router-dom";
import "./LoginComponent.css";

function LoginComponent() {
  return (
    <>
      <section id="entirepage">
        <section id="displaylogintitle">
          <h1 className="logintitle">Smart choice</h1>
        </section>
        <section className="display">
          <h2 id="loginsubtitle1">Login</h2>
        </section>
        <section className="display">
          <label id="username" htmlFor="username">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
            />
          </label>
        </section>
        <section className="display">
          <h2 id="loginsubtitle2">Password</h2>
        </section>
        <section className="display">
          <label id="password" htmlFor="password">
            <input
              type="text"
              id="password"
              name="password"
              placeholder="Password"
            />
          </label>
        </section>
        <section className="display">
          <button id="button" type="submit">
            Submit
          </button>
        </section>
        <section className="display">
          <Link to="/PaswwordForgotten" id="passwordforgotten">
            Password forgotten ?
          </Link>
        </section>
        <section className="display">
          <Link to="/CreateAccount" id="createaccount">
            Create an account
          </Link>
        </section>
      </section>
    </>
  );
}

export default LoginComponent;
