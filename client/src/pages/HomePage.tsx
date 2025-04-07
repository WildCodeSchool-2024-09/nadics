import { Link } from "react-router-dom";
import "./HomePage.css";
import RequestCard from "../components/RequestCard";
import "./HomePage.css";
import { useContext } from "react";
import PrimaryButton from "../components/reuasble-ui/PrimaryButton";
import UserContext from "../context/userContext";
function HomePage() {
  const { user } = useContext(UserContext);

  return (
    <>
      {user ? (
        <div>
          <main id="mainHome">
            <Link to={"/post_request"}>
              <PrimaryButton type="button" label="Submit a request" />
            </Link>
            <section id="ongoing-requests">
              <h3>Ongoing Requests</h3>
              <div className="cards-container">
                <div className="grid-card">
                  <RequestCard />
                </div>
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
