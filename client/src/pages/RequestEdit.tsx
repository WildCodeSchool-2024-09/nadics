import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import RequestForm from "../components/RequestForm";

type Request = {
  id: number;
  name: string;
  title: string;
  theme: string;
};

function RequestEdit() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [request, setRequest] = useState({} as Request);
  const [requestRead, setRequestRead] = useState({} as Request);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/request/${id}`)
      .then((response) => response.json())
      .then((data: Request) => {
        setRequestRead(data);
      });
  }, [id]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/request/${id}`)
      .then((response) => response.json())
      .then((data: Request) => {
        setRequest(data);
      });
  }, [id]);

  return (
    <>
      <p>{requestRead.title}</p>
      <p>{requestRead.theme}</p>
      request && (
      <RequestForm
        defaultValue={request}
        onSubmit={(requestData) => {
          fetch(`${import.meta.env.VITE_API_URL}/api/request/${request.id}`, {
            method: "put",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
          }).then((response) => {
            if (response.status === 204) {
              navigate(`/test_edit/${request.id}`);
            }
          });
        }}
      >
        Modifier
      </RequestForm>
      )
    </>
  );
}

export default RequestEdit;
