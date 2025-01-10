import { Link } from "react-router-dom";
import "./SignupComponent.css";

function SignupComponent() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <section id="displaycolumn">
        <h1 id="signuptitle"> SMART CHOICE HUB </h1>
        <h2 id="signupsubtitle1"> Create your account</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
            />
          </label>
          <label htmlFor="firstname">
            <input
              type="text"
              id="firstname"
              name="firstname"
              placeholder="Firstname"
              required
            />
          </label>
          <label htmlFor="surname">
            <input
              type="text"
              id="surname"
              name="surname"
              placeholder="Surname"
              required
            />
          </label>
          <label htmlFor="date-of-birth">
            <input
              type="date"
              id="date-of-birth"
              name="date of birth"
              placeholder="Date of birth"
              required
            />
          </label>
          <label htmlFor="password">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
            />
          </label>
          <label htmlFor="confirm password">
            <input
              type="password"
              id="confirm-password"
              name="confirm password"
              placeholder="Confirm password"
              required
            />
          </label>
          <button id="signupbutton" type="submit">
            Sign Up
          </button>
        </form>
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
