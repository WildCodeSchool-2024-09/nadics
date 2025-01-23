import { Link, useOutletContext } from "react-router-dom";
import RequestCard from "../components/RequestCard";
import "./HomePage.css";
import type { Auth } from "../App";
function HomePage() {
  const { auth } = useOutletContext() as { auth: Auth | null };

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
      ) : (
        <h2>Login first please</h2>
      )}
    </>
  );
}

export default HomePage;
