import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Test() {
  const [test, setTest] = useState([]); // state qui sert à l'affichage des données récup grâce au read

  const { id } = useParams(); // Récupère l'ID depuis l'URL

  const [formData, setFormData] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/requests/${id}`)
      .then((res) => res.json())
      .then((data) => setTest(data));
  }, [id]);

  console.log(test); // test est toujours vide en debuggant

  const handleChange = (change) => {
    const { name, value } = change.target;
    // console.log(change.target.value); // ça fonctionne
    // console.log(change.target.name); // ça fonctionne
    // setFormData({ ...formData, [name]: value });
    setFormData(change.target.value);
  };

  const handleSubmit = (submit: React.FormEvent<HTMLFormElement>) => {
    submit.preventDefault(); // évite le rechargement de la page lorsqu'on clique sur le bouton
    fetch(`${import.meta.env.VITE_API_URL}/api/requests/${id}`, {
      // pour envoyer les données récoltées dans le formulaire au back end
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      // if (response.status === 204) {
      //   navigate(`/requests/${id}`); // Redirige vers la liste après modification
      // }
      .catch((error) => console.error("Erreur:", error));
  };

  return (
    <>
      <p> Voici les données de mon read</p>
      <p>
        {test.map((toto) => (
          <li key={toto.id}>
            <p>{toto.title}</p>
            <p>{toto.theme}</p>
          </li>
        ))}
      </p>
      <p> Voici le champ et le bouton pour edit</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstname">
          <input
            type="text"
            name="firstname"
            placeholder="Firstname"
            value={formData}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Enregistrer</button>
      </form>
    </>
  );
}

export default Test;
