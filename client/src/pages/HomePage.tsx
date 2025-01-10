import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  return (
    <div>
      {/* <Navbar /> */}
      <button id="button" type="submit">
        Submit a request
      </button>
      <main>
        <section>
          <h3>Ongoing Requests</h3>
          <p>
            Shows requests or inquiries currently in progress. Click on a card
            below to view details or updates.
          </p>
          <div id="ongoing-requests-container" className="cards-container">
            <div className="card">
              <h2>Request #1</h2>
              <div className="tags">
                <span className="tag2">Urgent</span>
                <span className="tag2">High Priority</span>
              </div>
              <p>Details about ongoing request 1...</p>
              <div className="card-footer">
                <img src="path-to-image1.jpg" alt="" className="profile-img" />
                <p className="name">Cedric</p>
              </div>
              <Link to="/ongoing-request/1">Détails</Link>
            </div>
            <div className="card">
              <h2>Request #2</h2>
              <div className="tags">
                <span className="tag3">Low Priority</span>
                <span className="tag4">Pending</span>
              </div>
              <p>Details about ongoing request 2...</p>
              <div className="card-footer">
                <img src="path-to-image2.jpg" alt="" className="profile-img" />
                <p className="name">Nadir</p>
              </div>
              <Link to="/ongoing-request/2">Détails</Link>
            </div>
            <div className="card">
              <h2>Request #3</h2>
              <div className="tags">
                <span className="tag1">Medium Priority</span>
                <span className="tag5">In Progress</span>
              </div>
              <p>Details about ongoing request 3...</p>
              <div className="card-footer">
                <img src="path-to-image3.jpg" alt="" className="profile-img" />
                <p className="name">Darkhansukh</p>
              </div>
              <Link to="/ongoing-request/3">Détails</Link>
            </div>
            <div className="card">
              <h2>Request #4</h2>
              <div className="tags">
                <span className="tag2">Urgent</span>
                <span className="tag2">High Priority</span>
              </div>
              <p>Details about ongoing request 4...</p>
              <div className="card-footer">
                <img src="path-to-image4.jpg" alt="" className="profile-img" />
                <p className="name">Alex</p>
              </div>
              <Link to="/ongoing-request/4">Détails</Link>
            </div>
          </div>
        </section>
        <section>
          <h3>Completed Requests</h3>
          <p>
            Shows requests that have been finished and resolved. Click on a card
            below to view the details.
          </p>
          <div id="completed-requests-container" className="cards-container">
            <div className="card">
              <h2>Request #1</h2>
              <div className="tags">
                <span className="tag1">Completed</span>
                <span className="tag2">Resolved</span>
              </div>
              <p>Details about completed request 1...</p>
              <div className="card-footer">
                <img src="path-to-image5.jpg" alt="" className="profile-img" />
                <p className="name">Simeon</p>
              </div>
              <Link to="/completed-request/1">Détails</Link>
            </div>
            <div className="card">
              <h2>Request #2</h2>
              <div className="tags">
                <span className="tag1">Resolved</span>
                <span className="tag2">Closed</span>
              </div>
              <p>Details about completed request 2...</p>
              <div className="card-footer">
                <img src="path-to-image6.jpg" alt="" className="profile-img" />
                <p className="name">Matthieu</p>
              </div>
              <Link to="/completed-request/2">Détails</Link>
            </div>
            <div className="card">
              <h2>Request #3</h2>
              <div className="tags">
                <span className="tag1">Completed</span>
                <span className="tag2">Reviewed</span>
              </div>
              <p>Details about completed request 3...</p>
              <div className="card-footer">
                <img src="path-to-image7.jpg" alt="" className="profile-img" />
                <p className="name">David</p>
              </div>
              <Link to="/completed-request/3">Détails</Link>
            </div>
            <div className="card">
              <h2>Request #4</h2>
              <div className="tags">
                <span className="tag1">Resolved</span>
                <span className="tag2">Closed</span>
              </div>
              <p>Details about completed request 4...</p>
              <div className="card-footer">
                <img src="path-to-image8.jpg" alt="" className="profile-img" />
                <p className="name">Emily</p>
              </div>
              <Link to="/completed-request/4">Détails</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
