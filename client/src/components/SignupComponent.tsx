import { Link, useNavigate } from "react-router-dom";
import "./SignupComponent.css";
import { useState } from "react";
import logoDesktop from "../assets/images/logo-removebg.png";

function SignupComponent() {
  const navigate = useNavigate();
  const [acceptCGU, setAcceptCGU] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    firstname: "",
    lastname: "",
    password: "", 
    confirmPassword: "",
  });

  // Email validation function
  const validateEmail = (email: string) => {
    // Basic format check
    if (!email) {
      return "Email is required";
    }

    // Complex email regex that checks for proper format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }

    // Additional checks for common mistakes
    if (email.includes("..")) {
      return "Email cannot contain consecutive dots";
    }
    if (email.startsWith(".") || email.endsWith(".")) {
      return "Email cannot start or end with a dot";
    }
    if (email.includes(" ")) {
      return "Email cannot contain spaces";
    }

    return "";
  };

  // Password validation function
  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return "Password must be at least 8 characters long";
    }
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter";
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter";
    }
    if (!hasNumbers) {
      return "Password must contain at least one number";
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character";
    }
    return "";
  };

  // Name validation function
  const validateName = (name: string, fieldName: string) => {
    if (name.trim() === "") {
      return `${fieldName} cannot be empty`;
    }
    // Only check for spaces in firstname
    if (fieldName === "First name" && name.includes(" ")) {
      return `${fieldName} cannot contain spaces`;
    }
    // Different regex for lastname to allow spaces
    const regex =
      fieldName === "First name" ? /^[a-zA-ZÀ-ÿ-]+$/ : /^[a-zA-ZÀ-ÿ -]+$/;

    if (!regex.test(name)) {
      return fieldName === "First name"
        ? `${fieldName} can only contain letters and hyphens`
        : `${fieldName} can only contain letters, hyphens and spaces`;
    }
    return "";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(value),
      }));
    } else if (name === "firstname" || name === "lastname") {
      setErrors((prev) => ({
        ...prev,
        [name]: validateName(
          value,
          name === "firstname" ? "First name" : "Last name",
        ),
      }));
    } else if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        password: validatePassword(value),
      }));
    } else if (name === "confirm password") {
      const passwordInput = document.getElementById(
        "password",
      ) as HTMLInputElement;
      setErrors((prev) => ({
        ...prev,
        confirmPassword:
          value !== passwordInput.value ? "Passwords do not match" : "",
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!acceptCGU) {
      alert("You must accept the Terms and Conditions to proceed.");
      return;
    }

    // Check for errors before submission
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const firstname = formData.get("firstname") as string;
    const lastname = formData.get("lastname") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm password") as string;

    const emailError = validateEmail(email);
    const firstnameError = validateName(firstname, "First name");
    const lastnameError = validateName(lastname, "Last name");
    const passwordError = validatePassword(password);
    const confirmPasswordError =
      password !== confirmPassword ? "Passwords do not match" : "";

    setErrors({
      email: emailError,
      firstname: firstnameError,
      lastname: lastnameError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    if (
      emailError ||
      firstnameError ||
      lastnameError ||
      passwordError ||
      confirmPasswordError
    ) {
      return;
    }

    const userData = {
      email,
      firstname,
      lastname,
      birthday: formData.get("birthday") as string,
      password,
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
      if (response.status === 201) {
        alert("User created successfully! Redirecting...");
        navigate("/login");
        return;
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("An error occurred, please try again");
    }
  };

  return (
    <>
      <section id="displaycolumn">
        <div id="logo-section-signup-page">
          <Link to="/home">
            <img src={logoDesktop} alt="logo" id="logoImageDesktop_signup" />
          </Link>
        </div>
        <h2 id="signupsubtitle1">Create your account</h2>
        <form className="signupform" onSubmit={handleSubmit}>
          <label htmlFor="email">
            <input
              type="email"
              id="email"
              name="email"
              defaultValue=""
              placeholder="Email"
              required
              onChange={handleInputChange}
              className={errors.email ? "has-error" : ""}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </label>
          <label htmlFor="firstname">
            <input
              type="text"
              id="firstname"
              name="firstname"
              defaultValue=""
              placeholder="First name"
              required
              onChange={handleInputChange}
              className={errors.firstname ? "has-error" : ""}
            />
            {errors.firstname && (
              <span className="error-message">{errors.firstname}</span>
            )}
          </label>
          <label htmlFor="surname">
            <input
              type="text"
              id="surname"
              name="lastname"
              defaultValue=""
              placeholder="Last name"
              required
              onChange={handleInputChange}
              className={errors.lastname ? "has-error" : ""}
            />
            {errors.lastname && (
              <span className="error-message">{errors.lastname}</span>
            )}
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
              onChange={handleInputChange}
              className={errors.password ? "has-error" : ""}
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </label>
          <label htmlFor="confirm password">
            <input
              type="password"
              id="confirm-password"
              name="confirm password"
              defaultValue=""
              placeholder="Confirm password"
              required
              onChange={handleInputChange}
              className={errors.confirmPassword ? "has-error" : ""}
            />
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </label>

          <label className="checkbox-container">
            <input
              type="checkbox"
              className="checkbox-input"
              checked={acceptCGU}
              onChange={() => setAcceptCGU(!acceptCGU)}
              required
            />
            I accept the{" "}
            <Link to="/cgu" target="_blank" rel="noopener noreferrer">
              Terms and Conditions
            </Link>
          </label>

          <button id="signupbutton" type="submit">
            Sign Up
          </button>
        </form>
        <div id="alreadyaccount">
          <Link to="/login" id="login">
            Already have an account? Login
          </Link>
        </div>
      </section>
    </>
  );
}

export default SignupComponent;
