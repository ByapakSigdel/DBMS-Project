import React from "react";
import { Col, Row } from "react-bootstrap";
import locationIcon from "../images/home.png";
import phoneIcon from "../images/fax.png";
import emailIcon from "../images/emil.png";
import websiteIcon from "../images/website.png";

function Contact() {
  return (
    <div className="mt-5">
      <Row>
        <Col md={6}>
          <Row className="mb-3">
            <Col xs={2}>
              <img className="mr-2" src={locationIcon} alt="" />
            </Col>
            <Col>
              <b>Address:</b> Kalimati, Kathmandu, Nepal
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={2}>
              <img className="mr-2" src={phoneIcon} alt="" />
            </Col>
            <Col>+977 1-4283211</Col>
          </Row>
          <Row className="mb-3">
            <Col xs={2}>
              <img className="mr-2" src={emailIcon} alt="" />
            </Col>
            <Col>info@kec.edu.np</Col>
          </Row>
          <Row className="mb-3">
            <Col xs={2}>
              <img className="mr-2" src={websiteIcon} alt="" />
            </Col>
            <Col>www.kec.edu.np</Col>
          </Row>
        </Col>
        <Col md={6}>
          <div className="mt-5">
            <h2>Location</h2>
            <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.2358451654873!2d85.31943611460166!3d27.698697232793845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19e2c3a8980f%3A0x27f60df5f5d3a33b!2sKathmandu%20Engineering%20College%2C%20Kalimati%2C%20Kathmandu!5e0!3m2!1sen!2snp!4v1626164941471!5m2!1sen!2snp"
  width="100%"
  height="300"
  style={{ border: 0 }}
  allowfullscreen=""
  loading="lazy"
></iframe>

          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Contact;
