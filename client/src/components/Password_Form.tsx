import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Password_Form(): JSX.Element {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <h1>Forgot Password</h1>
      <p>
        Please enter the email address you'd like your password reset
        information sent to.
      </p>
      <h2>Enter your email address</h2>
      <div className="space">
        <input
          type="email"
          placeholder="email"
          required
          name="email"
          id="email"
        />
        <button type="submit">REQUEST PASSWORD RESET</button>
      </div>
      <Link to="/login">Back to login</Link>
    </FormStyled>
  );
}
const FormStyled = styled.form`
  background-color: #f2f2f2;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  font-family: "Roboto", sans-serif;

  h1 {
    margin-bottom: 2rem;
    font-size: 2rem;
  }

  h2 {
    margin-bottom: 1rem;
    font-size: 1.5rem; 
  }

  p {
    text-align: center;
    margin: 2rem 1rem; 
    font-size: 1rem;
  }

  .space {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  #email {
    height: 4rem; 
    width: 22.5rem; 
    font-size: 1rem; 
    border-radius: 0.3125rem; 
    border: 1px solid #000;
    box-shadow: 0.625rem 0.625rem 0.875rem rgba(0, 0, 0, 0.25); 
    padding-left: 1rem; 
  }

  button {
    background-color: #000000;
    display: inline-flex;
    min-width: 12.5rem; 
    min-height: 3.875rem; 
    padding: 1.25rem 1.5rem; 
    justify-content: center;
    align-items: center;
    gap: 0.625rem; 
    border-radius: 0.3125rem; 
    box-shadow: 0.625rem 0.625rem 0.875rem rgba(0, 0, 0, 0.25); 
    margin-bottom: 1.875rem; 
    color: #fff;
    text-align: center;
    font-size: 1.25rem; 
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    &:hover {
      color: #000000;
      background-color: #fff;
      border: 1px solid #000;
      transition: all 200ms ease-out;
    }

    &:active {
      background-color: #000;
      color: #fff;
    }
  }
`;
