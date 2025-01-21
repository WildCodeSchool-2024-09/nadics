import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RequestDetailCard from "../components/RequestDetailCard";
import "./RequestDetails.css";

// Defining the type for the request details
interface RequestDetailsType {
  id: number;
  title: string;
  details: string;
  theme: string;
}

const Table: React.FC = () => (
  <table>
    <thead>
      <tr>
        <th colSpan={2} className="centered-title">
          <div className="bullet" />
          Save the date
        </th>
      </tr>
      <tr>
        <th>Date 1</th>
        <th>Event 1</th>
      </tr>
      <tr>
        <th colSpan={2} className="arrow">
          <span className="arrow-down">&#8595;</span>
        </th>
      </tr>
      <tr>
        <th>Date 2</th>
        <th>Event 2</th>
      </tr>
      <tr>
        <th colSpan={2} className="arrow">
          <span className="arrow-down">&#8595;</span>
        </th>
      </tr>
      <tr>
        <th>Date 3</th>
        <th>Event 3</th>
      </tr>
      <tr>
        <th colSpan={2} className="arrow">
          <span className="arrow-down">&#8595;</span>
        </th>
      </tr>
      <tr>
        <th>Date 4</th>
        <th>Event 4</th>
      </tr>
    </thead>
    <tbody>{/* No additional rows */}</tbody>
  </table>
);

function RequestDetails() {
  const { id } = useParams<string>(); // Gets the request ID from the URL parameters
  const [requestDetails, setRequestDetails] =
    useState<RequestDetailsType | null>(null); // Request data
  const [error, setError] = useState<string | null>(null); // Potential errors
  const [loading, setLoading] = useState<boolean>(true); // Loading state for data

  useEffect(() => {
    if (!id) {
      setError("Request ID is not available."); // If ID is missing, show an error
      setLoading(false);
      return;
    }

    const requestId = Number(id); // Convert ID to a number

    // Function to fetch the request details (GET method - Read)
    const fetchRequestDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/request/${requestId}`, // Dynamic URL with request ID
        );
        if (!response.ok) {
          throw new Error("Request not found"); // Handle error if request is not found
        }
        const data = await response.json(); // If everything goes well, fetch the data
        setRequestDetails(data); // Store data in the state
        setLoading(false); // End loading state
      } catch (err) {
        setError("Error fetching request details."); // If an error occurs
        setLoading(false);
      }
    };

    fetchRequestDetails(); // Call function to fetch the request details
  }, [id]); // useEffect triggers whenever the ID in the URL changes

  if (loading) return <div>Loading...</div>; // Show "Loading..." while fetching data
  if (error) return <div>{error}</div>; // Show the error if something goes wrong
  if (!requestDetails) return <div>Request not found.</div>; // Show a message if the request is not found

  return (
    <div className="request-details-container">
      <p className="request-id">Request n°: {requestDetails.id}</p>

      {/* Pass the fetched data to RequestDetailCard (the component displays request details) */}
      <RequestDetailCard
        title={requestDetails.title}
        details={requestDetails.details}
        theme={requestDetails.theme}
      />

      <div className="details-and-table">
        <div className="details-container">
          <details>
            <summary>Reason of the request</summary>
            {requestDetails.details || "No description available."}
          </details>
          <details>
            <summary>How to do it</summary>
            {requestDetails.details || "No description available."}
          </details>
          <details>
            <summary>Why to do it</summary>
            {requestDetails.details || "No description available."}
          </details>
        </div>

        <div className="table-container">
          <Table /> {/* Display the table */}
        </div>
      </div>

      <div className="button-container">
        <Link to="/" className="button-opinion">
          <button type="button" className="home-button">
            Give my opinion
          </button>
        </Link>
      </div>
    </div>
  );
}

export default RequestDetails;
