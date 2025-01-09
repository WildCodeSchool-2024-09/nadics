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
          <label id="loginusername" htmlFor="loginusername">
            <input
              type="text"
              id="loginusername"
              name="loginusername"
              placeholder="Username"
            />
          </label>
        </section>
        <section className="display">
          <h2 id="loginsubtitle2">Password</h2>
        </section>
        <section className="display">
          <label id="loginpassword" htmlFor="loginpassword">
            <input
              type="text"
              id="loginpassword"
              name="loginpassword"
              placeholder="Password"
            />
          </label>
        </section>
        <section className="display">
          <button id="submitbutton" type="submit">
            Submit
          </button>
        </section>
        <section className="display">
          <Link to="/passwordforgotten" id="passwordforgotten">
            Password forgotten ?
          </Link>
        </section>
        <section className="display">
          <Link to="/signup" id="signup">
            Create an account
          </Link>
        </section>
      </section>
    </>
  );
}

export default LoginComponent;
