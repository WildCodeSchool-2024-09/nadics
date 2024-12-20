import "./PostRequest.css";
export default function PostRequest() {
  return (
    <>
      <h2>Request creation</h2>
      <form action="submit">
        <div className="block">
          <label htmlFor="">Request title</label>
          <input type="text" placeholder="title" />
          <br />
        </div>
        <div className="block">
          <label htmlFor="">Request category</label>
          <input type="text" placeholder="category" />
        </div>
        <div className="block">
          <label htmlFor="">Category detail</label>
          <textarea placeholder="Write your decision here ..." />
        </div>
        <p>
          You may add as many categories as you want. Click the Add button
          below.
        </p>
        <button type="button" className="roundButton">
          +
        </button>
        <button type="button" className="buttonSubmit">
          Submit your request
        </button>
      </form>
    </>
  );
}
