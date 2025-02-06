import { Link, useParams } from "react-router-dom";
import "./HomePage.css";
import RequestCard from "../components/RequestCard";
import "./HomePage.css";
import { useContext } from "react";
import AuthContext from "../context/authContext";

function HomePage() {
  const { auth } = useContext(AuthContext);
  const { id } = useParams();
  return (
    <>
      {auth ? (
        <div>
          <main id="mainHome">
            <Link to={"/post_request"}>
              <button id="button" type="button">
                Submit a request
              </button>
            </Link>
            <section id="ongoing-requests">
              <h3>Ongoing Requests</h3>
              <div className="cards-container">
                <Link to={`/request-details/${id}`} className="grid-card">
                  <RequestCard />
                </Link>
              </div>
            </section>
          </main>
        </div>
      ) : (
        <h2>Login first please</h2>
      )}
    </>
  );
}

export default HomePage;
