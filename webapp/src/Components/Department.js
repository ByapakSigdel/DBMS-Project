import React, { useState, useEffect } from "react";
import { Col, Row, Container, Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import departmentLogo from "../images/department-lg.png";
import switchOrder from "../images/switch-order-logo.png";
import vector from "../images/Vector.png";

function Department() {
  const [tag, setTag] = useState("dname");
  const [order, setOrder] = useState("1");
  const [noOfDepartments, setDepartmentNo] = useState(0);
  const [noOfFaculties, setFacultyNo] = useState(0);
  const [noOfStudents, setStudentNo] = useState(0);
  const [departments, setDepartments] = useState([]);
  const [searchVal, setSearchVal] = useState("");

  async function getCount() {
    try {
      const doc = await fetch("/api/department/count");
      const { noOfDepartments, noOfFaculties, noOfStudents } = await doc.json();
      setDepartmentNo(noOfDepartments);
      setFacultyNo(noOfFaculties);
      setStudentNo(noOfStudents);
    } catch (err) {
      console.log(err);
    }
  }

  async function getDepartments() {
    try {
      const doc = await fetch(`/api/department?tag=${tag}&order=${order}`);
      const departments = await doc.json();
      setDepartments(departments);
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
      const doc = await fetch(
        `/api/department/search?tag=${tag}&filter=${searchVal}`
      );
      const result = await doc.json();
      setDepartments(result);
    } else {
      const doc = await fetch(`/api/department?tag=dname`);
      const result = await doc.json();
      setDepartments(result);
    }
  };

  const handleKeyDown = async (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") handleSubmit(e);
  };

  const handleOrder = (e) => {
    e.preventDefault();
    setOrder(order === "1" ? "-1" : "1");
  };

  useEffect(() => {
    getCount();
    getDepartments();
  }, [tag, order, noOfDepartments, noOfFaculties, noOfStudents]);

  const getTagStyle = (currentTag) => {
    return tag === currentTag ? "text-primary font-weight-bold" : "text-muted";
  };

  return (
    <Container>
      <Row>
        <Col md={3} className="text-center my-4">
          <img src={departmentLogo} alt="Departments" style={{ height: "150px" }} />
          <h3 className="mt-3">DEPARTMENTS</h3>
          <p>
            No. of departments: <b>{noOfDepartments}</b> <br />
            No. of teachers: <b>{noOfFaculties}</b> <br />
            No. of students: <b>{noOfStudents}</b>
          </p>
        </Col>
        <Col md={9}>
          <Row className="align-items-center my-4">
            <Col md={2} onClick={() => setTag("dname")} className={`text-center ${getTagStyle("dname")}`}>
              Name
            </Col>
            <Col md={2} onClick={() => setTag("fname")} className={`text-center ${getTagStyle("fname")}`}>
              H.O.D
            </Col>
            <Col md={2} onClick={() => setTag("strength")} className={`text-center ${getTagStyle("strength")}`}>
              Strength
            </Col>
            <Col md={6} className="d-flex justify-content-end">
              <Form inline onSubmit={handleSubmit} className="w-100 d-flex">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  value={searchVal}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  className="w-75"
                />
                <Button variant="link" onClick={handleOrder} className="ml-2">
                  <img src={switchOrder} alt="Switch Order" style={{ height: "20px" }} />
                </Button>
              </Form>
            </Col>
          </Row>
          <hr />
          <Row>
            {departments.length > 0 &&
              departments.map((el, id) => (
                <Col md={6} key={id} className="mb-4">
                  <Card style={{ border: "1px solid #ddd" }}>
                    <Card.Body>
                      <Row>
                        <Col md={2} className="d-flex align-items-center justify-content-center">
                          <img src={vector} alt="Vector" style={{ height: "50px" }} />
                        </Col>
                        <Col md={10}>
                          <Link to={`/department/${el.dname.replace(/\s+/g, '-').toLowerCase()}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Card.Title>{el.dname}</Card.Title>
                          </Link>
                          <Card.Text className="text-muted">H.O.D: {el.fname}</Card.Text>
                          <Card.Text>Strength: {el.strength}</Card.Text>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Department;
