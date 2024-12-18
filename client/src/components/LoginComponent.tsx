import { Link } from "react-router-dom";
import "./LoginComponent.css";

function LoginComponent() {
  return (
    <>
      <form>
        <h1>Smart choice</h1>
        <label htmlFor="username">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
          />
        </label>
        <label htmlFor="password">
          <input
            type="text"
            id="password"
            name="password"
            placeholder="Password"
          />
        </label>
      </form>
      <button type="submit">Submit</button>
      <Link to="/PaswwordForgotten">Password forgotten ?</Link>
      <Link to="/CreateAccount">Create an account</Link>
    </>
  );
}

export default LoginComponent;
