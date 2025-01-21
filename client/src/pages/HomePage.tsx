import { Link } from "react-router-dom";
import RequestCard from "../components/RequestCard";
import "./HomePage.css";

function HomePage() {
  // const navigate = useNavigate();
  // const handleCardClick = (id: number): void => {
  //   navigate(`/request-details/${id}`); // Redirige vers la page de détails
  // };

  return (
    <div>
      <Link to={"/post_request"}>
        <button id="button" type="button">
          Submit a request
        </button>
      </Link>
      <main id="mainHome">
        <section id="ongoing-requests">
          <div>
            <a href="/display-user/1">Click here to find our first user</a>
            <br />
            <a href="/display-user/2">Click here to find our second user</a>
          </div>
          <h3>Ongoing Requests</h3>
          <div className="cards-container">
            <RequestCard />
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
