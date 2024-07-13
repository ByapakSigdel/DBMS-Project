import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import departmentLogo from "../images/department-lg.png";
import switchOrder from "../images/switch-order-logo.png";
import vector from "../images/Vector.png";

function SingleDepartment() {
  const [action, setAction] = useState(true);
  const [tag, setTag] = useState("fname");
  const [order, setOrder] = useState("1");
  const [dname, setDname] = useState("");
  const [hod, setHod] = useState({ fname: '', email: '' });
  const [noOfCourses, setCourseNo] = useState(0);
  const [noOfFaculties, setFacultyNo] = useState(0);
  const [noOfStudents, setStudentNo] = useState(0);
  const [department, setDepartment] = useState([]);
  const [course, setCourse] = useState([]);
  const [searchVal, setSearchVal] = useState("");

  const displayCourse = () => {
    setAction(false);
  };

  const displayFaculty = () => {
    setAction(true);
  };

  async function getData() {
    try {
      const departmentId = window.location.href.slice(33); // Adjust according to your URL structure
      const doc = await fetch(`/api/department/get/${departmentId}/data`);
      const { dname, fname, email, noOfCourses, noOfStudents, noOfFaculties } = await doc.json();
      setDname(dname);
      setHod({ fname, email });
      setCourseNo(noOfCourses);
      setFacultyNo(noOfFaculties);
      setStudentNo(noOfStudents);
    } catch (err) {
      console.log(err);
    }
  }

  async function getDepartment() {
    try {
      const departmentId = window.location.href.slice(33); // Adjust according to your URL structure
      const apiUrl = action
        ? `/api/department/get/${departmentId}?tag=${tag}&order=${order}`
        : `/api/department/get/${departmentId}/course?tag=${tag}&order=${order}`;

      const doc = await fetch(apiUrl);
      const data = await doc.json();

      if (action) {
        setDepartment(data);
      } else {
        setCourse(data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleChange = (e) => {
    setSearchVal(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchVal.trim() !== "") {
      try {
        const departmentId = window.location.href.slice(33); // Adjust according to your URL structure
        const searchUrl = action
          ? `/api/department/get/${departmentId}/course/search?filter=${searchVal}`
          : `/api/department/get/${departmentId}/search?tag=${tag}&filter=${searchVal}`;

        const doc = await fetch(searchUrl);
        const result = await doc.json();

        if (action) {
          setDepartment(result);
        } else {
          setCourse(result);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      getDepartment();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleOrder = () => {
    setOrder(order === "1" ? "-1" : "1");
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getDepartment();
  }, [tag, order, action]);

  return (
    <div>
      <Row>
        <Col md={2} className="leftside">
          <img src={departmentLogo} alt="Department" className="department-logo" />
          <p className="page-title">{dname}</p>
          <p>
            No. of faculties: <b>{noOfFaculties}</b> <br />
            No. of students: <b>{noOfStudents}</b> <br />
            No. of courses: <b>{noOfCourses}</b>
          </p>
        </Col>
        <Col md={8} className="rightside">
          <Row className="action-buttons">
            <Col onClick={displayFaculty} className={`action-button ${action ? "active" : ""}`}>
              Faculty
            </Col>
            <Col onClick={displayCourse} className={`action-button ${!action ? "active" : ""}`}>
              Courses
            </Col>
            {!action && (
              <Col md={3}>
                <input
                  className="form-control search"
                  type="text"
                  placeholder="Search"
                  value={searchVal}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
              </Col>
            )}
            <Col md={1}>
              <button onClick={handleOrder} className="order-button">
                <img src={switchOrder} alt="Switch Order" />
              </button>
            </Col>
          </Row>
          <hr />
          {action ? (
            <div className="faculty-section">
              <Row className="faculty-list">
                {department.map((faculty, index) => (
                  <Col key={index} md={5} className="faculty-card">
                    <Row>
                      <Col md={1}>
                        <img src={vector} alt="Faculty" className="faculty-icon" />
                      </Col>
                      <Col>
                        <p className="grid-title">Associate Professor</p>
                        <p className="text-muted float-right">- {faculty.fname}</p>
                      </Col>
                    </Row>
                    <p className="contact-info">Contact: {faculty.email}</p>
                  </Col>
                ))}
              </Row>
            </div>
          ) : (
            <div className="course-section">
              <Row className="course-list">
                {course.map((course, index) => (
                  <Col key={index} md={5} className="course-card">
                    <Row>
                      <Col md={1}>
                        <img src={vector} alt="Course" className="course-icon" />
                      </Col>
                      <Col>
                        <p className="grid-title">{course.course_name}</p>
                        <p className="text-muted float-right">- {course.fname}</p>
                      </Col>
                    </Row>
                    <p className="course-details">Credits: {course.credits}</p>
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default SingleDepartment;
