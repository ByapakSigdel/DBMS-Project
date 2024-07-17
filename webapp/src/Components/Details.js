import React, { useState } from "react";
import { Container } from "react-bootstrap";

function Details() {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/executeQuery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: inputValue }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.result);
        setError(null);
      } else {
        setError(data.error);
        setResult(null);
      }
    } catch (err) {
      setError("Something went wrong.");
      setResult(null);
    }
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
      <form onSubmit={handleSubmit} className="w-50">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="form-control mb-3"
          placeholder="Enter SQL query..."
        />
        <button type="submit" className="btn btn-primary">
          Execute
        </button>
      </form>
      {result && (
        <div className="mt-3">
          <h5>Result:</h5>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
      {error && (
        <div className="mt-3">
          <h5>Error:</h5>
          <pre>{error}</pre>
        </div>
      )}
    </Container>
  );
}

export default Details;
