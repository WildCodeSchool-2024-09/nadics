import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useContext } from "react";
import backgroundImage from "../assets/images/logo.png";
import AuthContext from "../context/authContext";
import UserContext from "../context/userContext";

export default function PostRequest() {
  const { auth } = useContext(AuthContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const requestData = {
      title: formData.get("title") as string,
      tag1: formData.get("tag1") as string,
      tag2: formData.get("tag2") as string,
      details1: formData.get("details1") as string,
      details2: formData.get("details2") as string,
      details3: formData.get("details3") as string,
      user_id: user ? user.id : null,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
          },
          body: JSON.stringify(requestData),
        },
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "request updated cancel");
      }
      if (response.status === 201) {
        alert("Request submitted! Redirecting...");
        navigate("/home");
      }
    } catch (error) {
      console.error("Error creating request");
      alert("An error please try again");
    }
  };

  return (
    <>
      <PostRequestStyled className="background" onSubmit={handleSubmit}>
        <h1>Request creation</h1>
        <div className="block">
          <label htmlFor="">Request title</label>
          <input type="text" name="title" placeholder="title" />
        </div>
        <hr />
        <div id="tag_choix">
          <div className="tag_select">
            <label htmlFor="choix">Select primary tag (required):</label>
            <select id="choix" name="tag1">
              <option value="Sport">Sport</option>
              <option value="Eat">Eat</option>
              <option value="Drink">Drink</option>
              <option value="Sex">Sex</option>
            </select>
          </div>
          <div className="tag_select">
            <label htmlFor="choix">Select second tag (not required):</label>
            <select id="choix" name="tag2">
              <option value="Sport">---</option>
              <option value="Sport">Sport</option>
              <option value="Eat">Eat</option>
              <option value="Drink">Drink</option>
              <option value="Sex">Sex</option>
            </select>
          </div>
        </div>
        <div className="block">
          <label htmlFor="">Reason of the request</label>
          <textarea
            name="details1"
            placeholder="Write your decision here ..."
          />
        </div>
        <div className="block">
          <label htmlFor="">How to do it</label>
          <textarea
            name="details2"
            placeholder="Write your decision here ..."
          />
        </div>
        <div className="block">
          <label htmlFor="">Why to do it</label>
          <textarea
            name="details3"
            placeholder="Write your decision here ..."
          />
        </div>
        <button type="submit" className="buttonSubmit">
          Submit your request
        </button>
      </PostRequestStyled>
    </>
  );
}

const PostRequestStyled = styled.form`
  font-family: "Roboto", sans-serif;
  background: linear-gradient(
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.7)
    ), url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: lighten;
  z-index: -1;

  
  .block{
  display: flex;
  justify-content: left;
  align-items: left;
  flex-direction: column;
  flex-shrink: 0;
}

h1{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top:1rem;
  margin-bottom:1rem;
}

hr {
  width: 75%; 
  margin: auto; 
  border: 1px solid #000; 
}

#tag_choix{
display:flex;
 flex-direction: column;
gap:2rem;
margin-top:2rem;
margin-bottom:2rem;
}
#choix{
width:10rem;
height:2rem;
background-color:#fff
}

label{
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left: 1rem;
}

input {
  width: 360px; 
  height: 64px;
  border-radius: 10px;
  fill: #f5f5f5;
  filter: drop-shadow(10px 10px 14px rgba(0, 0, 0, 0.25));
  font-size: 1.2rem;
  margin-bottom: 1rem;
  margin-left: 1rem;
  font-size: 1em;
  padding:1rem;
  font-weight: 400;
}

textarea{
  width: 360px; 
  height: 158px;
  border-radius: 10px;
  fill: #f5f5f5;
  filter: drop-shadow(10px 10px 14px rgba(0, 0, 0, 0.25));
  font-size: 1.2rem;
  margin-bottom: 1rem;
  margin-left: 1rem;
  font-size: 1em;
  padding:1rem;
  font-weight: 400;
}

form {
  display: flex;
  justify-content: left;
  flex-direction: column;
  align-items: left;
  border-radius: 10px;
}

.buttonSubmit {
  background-color: #000000;
  border: 1px solid transparent;
  display: inline-flex;
  min-width: 1rem; 
  min-height: 3.875rem; 
  margin: 1rem 1rem;
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
  cursor: pointer;

&:hover {
  background-color: #fff;
  color:#000;
  border: 1px solid #000;
  transition: all 200ms ease-out;
}

&:active {
  background-color: #000;
  color: #fff;
}

}

p {
  margin-top: 2rem;
  margin-bottom: 2rem;
  margin-left: auto; 
  margin-right: auto; 
  width: 80%; 
  color: #000;
  text-align: justify;
  font-size: 22px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.roundButton {
  width: 50px;
  height: 50px;
  margin-left: 43%;
  margin-bottom: 1rem;
  border-radius: 50%;
  background-color: grey;
  color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.roundButton:hover {
  background-color:#fff ;  
  color: #000;
  border: 1px solid #000;
  transition: all 200ms ease-out;}

.roundButton:active {
  background-color: #000;
  color: #fff;
}




@media screen and (min-width: 1024px) {
  .roundButton {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: grey;
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;

  
  }



  .buttonSubmit {
    width: 50%;
  }

  form {
    display: flex;
    justify-content: left;
    align-items: left;
    flex-direction: column;
  }

  form .buttonSubmit {
    margin-left: 27%;
  }

  form .roundButton {
    margin-left: 50%;
  }
}

`;
