import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

import djs from "../images/djs.png";

class TopNav extends Component {
  render() {
    return (
      <Navbar style={{ maxHeight: "60px" }}>
        <Link to="/">
          <Navbar.Brand href="#home" className="navtitle">
            <img src={djs} alt="DJS Logo" style={{ height: "60px", objectFit: "contain", marginLeft: "30px",marginTop: "50px" }} />
          </Navbar.Brand>
        </Link>
      </Navbar>
    );
  }
}

export default TopNav;
