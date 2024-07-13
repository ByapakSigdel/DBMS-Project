import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="mt-5 py-3" style={{ position: "fixed", bottom: "0", left: "0", right: "0", backgroundColor: "#f8f9fa" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-auto">
            <Button as={Link} to="/about-us" variant="link" className="text-dark mr-3">
              <h5>About Us</h5>
            </Button>
          </div>
          <div className="col-md-auto">
            <Button as={Link} to="/contact" variant="link" className="text-dark ml-3">
              <h5>Contact</h5>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
