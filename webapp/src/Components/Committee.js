import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import committeeLogo from "../images/commitee-lg.png";
import switchOrder from "../images/switch-order-logo.png";
import bulb from "../images/bulb.png";

function Committee() {
  const [tag, setTag] = useState("cname");
  const [order, setOrder] = useState("1");
  const [noOfCommittees, setCommitteeNo] = useState(0);
  const [noOfVictories, setVictoryNo] = useState(0);
  const [noOfEvents, setEventNo] = useState(0);
  const [noOfStudents, setStudentNo] = useState(0);
  const [committees, setCommittees] = useState([]);
  const [searchVal, setSearchVal] = useState("");

  async function getCount() {
    try {
      const doc = await fetch("/api/committee/count");
      const { noOfCommittees, noOfVictories, noOfEvents, noOfStudents } = await doc.json();
      setCommitteeNo(noOfCommittees);
      setVictoryNo(noOfVictories);
      setEventNo(noOfEvents);
      setStudentNo(noOfStudents);
    } catch (err) {
      console.log(err);
    }
  }

  async function getCommittees() {
    try {
      const doc = await fetch(`/api/committee?tag=${tag}&order=${order}`);
      const result = await doc.json();
      setCommittees(result);
    } catch (err) {
      console.log(err);
    }
  }

  const handleChange = (e) => {
    setSearchVal(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchVal !== "") {
      try {
        const doc = await fetch(`/api/committee/search?tag=${tag}&filter=${searchVal}`);
        const result = await doc.json();
        setCommittees(result);
      } catch (err) {
        console.log(err);
      }
    } else {
      getCommittees(); // Fetch all committees if search value is empty
    }
  };

  const handleKeyDown = async (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      handleSubmit(e);
    }
  };

  const handleOrder = () => {
    setOrder(order === "1" ? "-1" : "1");
  };

  useEffect(() => {
    getCount();
    getCommittees();
  }, [tag, order]);

  return (
    <div>
      <Row>
        <Col md={2} className="text-center my-4">
          <img src={committeeLogo} alt="Committee" style={{ height: "150px" }} />
          <h3 className="mt-3">COMMITTEES</h3>
          <p>
            No. of committees: <b>{noOfCommittees}</b> <br />
            No. of students: <b>{noOfStudents}</b> <br />
            No. of victories: <b>{noOfVictories}</b> <br />
            No. of events: <b>{noOfEvents}</b>
          </p>
        </Col>
        <Col md={10}>
          <Row className="align-items-center my-4">
            <Col md={1} onClick={() => setTag("cname")} className={`text-center cursor-pointer ${tag === "cname" ? "text-primary" : ""}`}>
              Name
            </Col>
            <Col md={1} onClick={() => setTag("fname")} className={`text-center cursor-pointer ${tag === "fname" ? "text-primary" : ""}`}>
              Chairperson
            </Col>
            <Col md={1} onClick={() => setTag("accolades")} className={`text-center cursor-pointer ${tag === "accolades" ? "text-primary" : ""}`}>
              Accolades
            </Col>
            <Col md={7} className="d-flex justify-content-end align-items-center">
              <input
                className="form-control"
                type="text"
                placeholder="Search"
                value={searchVal}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                style={{ border: "1px solid #ced4da", padding: "6px 12px", borderRadius: "4px" }}
              />
              <button onClick={handleOrder} className="btn btn-link ml-2">
                <img src={switchOrder} alt="Switch Order" style={{ height: "20px" }} />
              </button>
            </Col>
          </Row>
          <hr />
          <Row className="justify-content-md-center">
            {committees.length > 0 ? (
              committees.map((committee, id) => (
                <Col key={id} md={5} className="mb-4">
                  <div className="shadow-sm committee-card p-3">
                    <Row>
                      <Col md={2} className="text-center">
                        <img src={bulb} alt="Committee" className="committee-image" style={{ maxWidth: "60px" }} />
                      </Col>
                      <Col>
                        <p className="grid-title">{committee.cname}</p>
                        <p className="text-muted">{committee.isTech === 1 ? "Type: Technical" : "Type: Non-Technical"}</p>
                        <p className="text-muted float-right">Chairperson: {committee.fname}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <p className="text-muted mt-2">Accolades: {committee.accolades}</p>
                      </Col>
                    </Row>
                  </div>
                </Col>
              ))
            ) : (
              <Col md={12} className="text-center">
                No committees found.
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Committee;
