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



h1{
  margin-bottom: 2rem;
}

h2{
  margin-bottom: 1rem;
}

p{
  text-align: center;
  margin-bottom: 5rem;
  margin: 2rem;
}

.space{
  display: flex;
  flex-direction: column;
  gap: 1rem;

}
#email{
  height: 64px;
  width: 360px;
  font-size: 20px;
  border-radius: 5px;
  border: 1px solid #000;
  box-shadow: 10px 10px 14px 0px rgba(0, 0, 0, 0.25);
  padding-left: 1rem;
  }

  button{
  background-color: #000000;
  display: inline-flex;
  min-width: 200px;
  min-height: 62px;
  padding: 20px 24px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  box-shadow: 10px 10px 14px 0px rgba(0, 0, 0, 0.25);
  margin-bottom: 30px;

  color: #FFF;
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  

  &:hover {
    color:#000000 ;
    background-color:#FFF ;
    border: 1px solid #000;
    transition: all 200ms ease-out;
  }

  &:active {
    background-color:#000; 
    color: #FFF;
  }
  }
  .icon {
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    font-size: 24px;
    color: #888;
    pointer-events: none;
  }
  `;
