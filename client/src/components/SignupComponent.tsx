import { Link, useNavigate } from "react-router-dom";
import "./SignupComponent.css";

function SignupComponent() {
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const userData = {
      firstname: formData.get("firstname") as string,
      lastname: formData.get("lastname") as string,
      birthday: formData.get("birthday") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        },
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create user");
      }
      if (response.status === 204) {
        alert("User created successfully! Redirecting...");
        navigate("/home");
        return;
      }
    } catch (error) {
      console.error("Error creating user");
      alert("An error please try again");
    }
  };

  return (
    <>
      <section id="displaycolumn">
        <h1 id="signuptitle"> SMART CHOICE HUB </h1>
        <h2 id="signupsubtitle1"> Create your account</h2>
        <form className="signupform" onSubmit={handleSubmit}>
          <label htmlFor="email">
            <input
              type="email"
              id="email"
              name="email"
              defaultValue=""
              placeholder="Email"
              required
            />
          </label>
          <label htmlFor="firstname">
            <input
              type="text"
              id="firstname"
              name="firstname"
              defaultValue=""
              placeholder="Firstname"
              required
            />
          </label>
          <label htmlFor="surname">
            <input
              type="text"
              id="surname"
              name="lastname"
              defaultValue=""
              placeholder="Surname"
              required
            />
          </label>
          <label htmlFor="date-of-birth">
            <input
              type="date"
              id="date-of-birth"
              name="birthday"
              placeholder="Date of birth"
              required
            />
          </label>
          <label htmlFor="password">
            <input
              type="password"
              id="password"
              name="password"
              defaultValue=""
              placeholder="Password"
              required
            />
          </label>
          <label htmlFor="confirm password">
            <input
              type="password"
              id="confirm-password"
              name="confirm password"
              defaultValue=""
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
