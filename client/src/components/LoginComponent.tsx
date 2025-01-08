import { Link } from "react-router-dom";
import "./LoginComponent.css";

function LoginComponent() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <>
      <section id="entirepage">
        <section id="displaylogintitle">
          <h1 className="logintitle">Smart choice</h1>
        </section>
        <section className="display">
          <h2 id="loginsubtitle1">Login</h2>
        </section>
        <form onSubmit={handleSubmit}>
          <section className="display">
            <label htmlFor="loginusername">
              <input
                type="text"
                id="loginusername"
                name="loginusername"
                placeholder="Username"
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
                name="loginpassword"
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
