import { Link } from "react-router-dom";

export default function PasswordRecovery() {
  return (
    <div>
      <h1>Forgot Password</h1>
      <p>
        Please enter the email address you'd like your password reset
        information sent to
      </p>
      <form action="submit">
        <input type="email" placeholder="email" name="email" id="email" />

        <button type="button">request password reset</button>
      </form>
      <Link to="/login">Back to login</Link>
      <p>Un mail vous a été envoyé pour réinitialiser votre mot de passe.</p>
    </div>
  );
}
