import React, { Component } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import departLogo from "../images/departLogo.png";
import commiteeLogo from "../images/commiteeLogo.png";
import libraryLogo from "../images/libraryLogo.png";
import projectLogo from "../images/projectLogo.png";

class Home extends Component {
  render() {
    return (
      <Container style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="mb-4" style={{ border: "1px solid #ddd" }}>
              <Card.Body>
                <Link to="/departments" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Row>
                    <Col md={4} className="d-flex align-items-center justify-content-center">
                      <img src={departLogo} alt="Departments" style={{ maxHeight: "100px" }} />
                    </Col>
                    <Col md={8}>
                      <Card.Title>Departments</Card.Title>
                      <Card.Text>
                        Discover various departments and their contributions to our organization.
                      </Card.Text>
                    </Col>
                  </Row>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={8}>
            <Card className="mb-4" style={{ border: "1px solid #ddd" }}>
              <Card.Body>
                <Link to="/library" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Row>
                    <Col md={4} className="d-flex align-items-center justify-content-center">
                      <img src={libraryLogo} alt="Library" style={{ maxHeight: "100px" }} />
                    </Col>
                    <Col md={8}>
                      <Card.Title>Library</Card.Title>
                      <Card.Text>
                        Explore our extensive library resources and services available to you.
                      </Card.Text>
                    </Col>
                  </Row>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={8}>
            <Card className="mb-4" style={{ border: "1px solid #ddd" }}>
              <Card.Body>
                <Link to="/projects" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Row>
                    <Col md={4} className="d-flex align-items-center justify-content-center">
                      <img src={projectLogo} alt="Projects" style={{ maxHeight: "100px" }} />
                    </Col>
                    <Col md={8}>
                      <Card.Title>Projects</Card.Title>
                      <Card.Text>
                        Learn more about the projects we're working on and their impact.
                      </Card.Text>
                    </Col>
                  </Row>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={8}>
            <Card className="mb-4" style={{ border: "1px solid #ddd" }}>
              <Card.Body>
                <Link to="/committees" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Row>
                    <Col md={4} className="d-flex align-items-center justify-content-center">
                      <img src={commiteeLogo} alt="Committees" style={{ maxHeight: "100px" }} />
                    </Col>
                    <Col md={8}>
                      <Card.Title>Committees</Card.Title>
                      <Card.Text>
                        Get to know our committees and their roles within the organization.
                      </Card.Text>
                    </Col>
                  </Row>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
