import { Link } from "react-router-dom";
import "./SignupComponent.css";

function SignupComponent() {
  return (
    <>
      <section id="displaycolumn">
        <h1 id="signuptitle"> SMART CHOICE HUB </h1>
        <h2 id="signupsubtitle1"> Create your account</h2>
        <label id="email" htmlFor="email">
          <input type="text" id="email" name="email" placeholder="Email" />
        </label>
        <label id="firstname" htmlFor="firstname">
          <input
            type="text"
            id="firstname"
            name="firstname"
            placeholder="Firstname"
          />
        </label>
        <label id="surname" htmlFor="surname">
          <input
            type="text"
            id="surname"
            name="surname"
            placeholder="Surname"
          />
        </label>
        <label id="date-of-birth" htmlFor="date of birth">
          <input
            type="text"
            id="date-of-birth"
            name="date of birth"
            placeholder="Date of birth"
          />
        </label>
        <label id="password" htmlFor="password">
          <input
            type="text"
            id="password"
            name="password"
            placeholder="Password"
          />
        </label>
        <label id="confirm-password" htmlFor="confirm password">
          <input
            type="text"
            id="confirm-password"
            name="confirm password"
            placeholder="Confirm password"
          />
        </label>
        <button id="signupbutton" type="submit">
          Sign Up
        </button>
        <section id="alreadyaccount">
          <Link to="/login" id="login">
            Already have an account ? Login
          </Link>
        </section>
      </section>
    </>
  );
}

export default SignupComponent;
