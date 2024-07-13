import React, { useState, useEffect } from "react";
import { Col, Row, Card } from "react-bootstrap";
import projectLogo from "../images/project-lg.png";
import switchOrder from "../images/switch-order-logo.png";
import book from "../images/case.png";

function Project() {
  const [tag, setTag] = useState("pname");
  const [order, setOrder] = useState("1");
  const [noOfProjects, setProjectNo] = useState(0);
  const [noOfStudents, setStudentNo] = useState(0);
  const [noOfFaculties, setFacultyNo] = useState(0);
  const [projects, setProjects] = useState([]);
  const [searchVal, setSearchVal] = useState("");

  async function getCount() {
    try {
      const doc = await fetch("/api/project/count");
      const { noOfProjects, noOfStudents, noOfFaculties } = await doc.json();
      setProjectNo(noOfProjects);
      setStudentNo(noOfStudents);
      setFacultyNo(noOfFaculties);
    } catch (err) {
      console.log(err);
    }
  }

  async function getProjects() {
    try {
      const doc = await fetch(`/api/project?tag=${tag}&order=${order}`);
      const result = await doc.json();
      setProjects(result);
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
      const doc = await fetch(`/api/project/search?tag=${tag}&filter=${searchVal}`);
      const result = await doc.json();
      setProjects(result);
    } else {
      getProjects(); // Fetch all projects if search value is empty
    }
  };

  const handleKeyDown = async (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") handleSubmit(e);
  };

  const handleOrder = () => {
    setOrder(order === "1" ? "-1" : "1");
  };

  useEffect(() => {
    getCount();
    getProjects();
  }, [tag, order, searchVal]);

  return (
    <div>
      <Row>
        <Col md={2} className="text-center my-4">
          <img src={projectLogo} alt="Project" style={{ height: "150px" }} />
          <h3 className="mt-3">PROJECTS</h3>
          <p>
            No. of projects: <b>{noOfProjects}</b> <br />
            No. of professors: <b>{noOfFaculties}</b> <br />
            No. of students: <b>{noOfStudents}</b>
          </p>
        </Col>
        <Col md={10}>
          <Row className="align-items-center my-4">
            <Col md={1} onClick={() => setTag("pname")} className={`text-center cursor-pointer ${tag === "pname" ? "text-primary" : ""}`}>
              Projects
            </Col>
            <Col md={1} onClick={() => setTag("fname")} className={`text-center cursor-pointer ${tag === "fname" ? "text-primary" : ""}`}>
              Professors
            </Col>
            <Col md={1} onClick={() => setTag("p_desc")} className={`text-center cursor-pointer ${tag === "p_desc" ? "text-primary" : ""}`}>
              Description
            </Col>
            <Col md={6} className="d-flex justify-content-end align-items-center">
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
            {projects.length > 0 ? (
              projects.map((project, id) => (
                <Col key={id} md={5} className="mb-4">
                  <Card className="shadow-sm project-card">
                    <Row>
                      <Col md={3} className="text-center">
                        <img src={book} alt="Project" className="project-image" style={{ maxWidth: "80px" }} />
                      </Col>
                      <Col>
                        <p className="grid-title">{project.pname}</p>
                        <p className="text-muted">{project.p_desc}</p>
                        <p className="professor">Professor: {project.fname}</p>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))
            ) : (
              <Col md={12} className="text-center">
                No projects found.
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Project;
