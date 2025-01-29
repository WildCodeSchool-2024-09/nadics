import { Link, useOutletContext, useParams } from "react-router-dom";
import "./HomePage.css";
import RequestCard from "../components/RequestCard";
import "./HomePage.css";
import type { Auth } from "../App";
function HomePage() {
  const { auth } = useOutletContext() as { auth: Auth | null };
  const { id } = useParams();
  return (
    <>
      {auth ? (
        <div>
          <Link to={"/post_request"}>
            <button id="button" type="button">
              Submit a request
            </button>
          </Link>
          <main id="mainHome">
            <section id="ongoing-requests">
              <h3>Ongoing Requests</h3>
              <div className="cards-container">
                <Link to={`/request-details/${id}`}>
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
