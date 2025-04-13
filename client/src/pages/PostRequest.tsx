import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import backgroundImage from "../assets/images/background.png";
import ImpactedPerson from "../components/impactedPerson";
import ImpactingPerson from "../components/impactingPerson";
import EditorText from "../components/reuasble-ui/EditorText";
import PrimaryButton from "../components/reuasble-ui/PrimaryButton";
export default function PostRequest() {
  const [tempContent1, setTempContent1] = useState("");
  const [tempContent2, setTempContent2] = useState("");
  const [tempContent3, setTempContent3] = useState("");
  const [impactedPersonIds, setImpactedPersonIds] = useState<number[]>([]);
  const [impactingPersonIds, setImpactingPersonIds] = useState<number[]>([]);

  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const requestData = {
      title: formData.get("title") as string,
      tag1: formData.get("tag1") as string,
      tag2: formData.get("tag2") as string,
      details1: tempContent1,
      details2: tempContent2,
      details3: tempContent3,
      impactedPersonIds: impactedPersonIds,
      impactingPersonIds: impactingPersonIds,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/request`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
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
    <PostRequestStyled onSubmit={handleSubmit}>
      <h1>Request creation</h1>
      <div className="block">
        <label htmlFor="">Request title</label>
        <input
          className="input_create"
          type="text"
          name="title"
          placeholder="Title"
        />
      </div>
      <hr />
      <div id="tag_choix">
        <div className="tag_select">
          <label htmlFor="choix">Select primary tag (required):</label>
          <select id="choix" name="tag1">
            <option value="">-- Please choose a tag --</option>
            <option value="Finance">Finance</option>
            <option value="HR">Human Resources</option>
            <option value="Strategy">Strategy</option>
            <option value="Marketing">Marketing</option>
            <option value="Product">Product</option>
            <option value="Tech">Technology</option>
            <option value="Customer">Customer Relations</option>
            <option value="Operations">Operations</option>
            <option value="Operations">Other</option>
          </select>
        </div>
        <div className="tag_select">
          <label htmlFor="choix">Select second tag (Optional):</label>
          <select id="choix" name="tag2">
            <option value="">--Optional--</option>
            <option value="Finance">Finance</option>
            <option value="HR">Human Resources</option>
            <option value="Strategy">Strategy</option>
            <option value="Marketing">Marketing</option>
            <option value="Product">Product</option>
            <option value="Tech">Technology</option>
            <option value="Customer">Customer Relations</option>
            <option value="Operations">Operations</option>
            <option value="Operations">Other</option>
          </select>
        </div>
      </div>
      <div className="block">
        <label htmlFor="">Reason of the request</label>
        <EditorText
          value={tempContent1}
          onChange={setTempContent1}
          placeholder="Write your decision here ..."
        />
      </div>
      <div className="block">
        <label htmlFor="">How to do it</label>
        <EditorText
          value={tempContent2}
          onChange={setTempContent2}
          placeholder="How to do it "
        />
      </div>
      <div className="block">
        <label htmlFor="">Why to do it</label>
        <EditorText
          value={tempContent3}
          onChange={setTempContent3}
          placeholder="Why to do it ."
        />
      </div>
      <div className="block">
        <ImpactedPerson
          impactedPersonIds={impactedPersonIds}
          setImpactedPersonIds={setImpactedPersonIds}
        />
      </div>
      <div className="block">
        <ImpactingPerson
          impactingPersonIds={impactingPersonIds}
          setImpactingPersonIds={setImpactingPersonIds}
        />
      </div>
      <PrimaryButton type="submit" label="Submit your request" />
    </PostRequestStyled>
  );
}
const PostRequestStyled = styled.form`
  font-family: "Roboto", sans-serif;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ), url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-blend-mode: lighten;
  .block{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.tag_select{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 1rem;
}
h1{
  display: flex;
  justify-content: center;
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
}
.input_create {
  width: 10rem;
  height: 3rem;
  border-radius: 10px;
  fill: #F5F5F5;
  filter: drop-shadow(10px 10px 14px rgba(0, 0, 0, 0.25));
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-size: 1em;
  padding:1rem;
  font-weight: 400;
}
form {
  display: flex;
  justify-content: left;
  flex-direction: column;
  border-radius: 10px;
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
.block {
  margin-top: 1rem;
  margin-bottom: 1rem;
  }
  #filtre_container {
  grid-template-columns: 1fr 1fr;
}
@media screen and (min-width: 431px) {
  width: 100vw;
  .tag_select{
    padding-left: 8rem;
  }
  .block{
  display: flex;
  justify-content: left;
  align-items: flex-start;
  flex-direction: column;
  margin-bottom: 2rem;
  padding-left:8rem;
  gap:1rem;
}
  #filtre_container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;
}
  #titre_impact {
  margin-bottom: 1rem;
}

.listeFiltre {
  display: flex;
}

#checkBox {
  height: 2rem;
  width: 3rem;
}

.name_label {
  height: 2rem;
}
.avatar_search {
  height: 2rem;
}
}
`;
