import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Password_Form() {
  return (
    <FormStyled>
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
    </FormStyled>
  );
}

const FormStyled = styled.div`
background-color: red;
  
`;
