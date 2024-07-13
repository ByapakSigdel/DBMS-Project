import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import studentIcon from "../images/commiteeLogo.png";
import teacherIcon from "../images/commiteeLogo.png";
import bookIcon from "../images/book.png";

function Details() {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    // Fetch students and teachers data
    async function fetchData() {
        try {
          const studentsResponse = await fetch("/api/getAllStudents");
          if (!studentsResponse.ok) {
            throw new Error("Failed to fetch students");
          }
          const studentsData = await studentsResponse.json();
      
          const teachersResponse = await fetch("/api/teachers");
          if (!teachersResponse.ok) {
            throw new Error("Failed to fetch teachers");
          }
          const teachersData = await teachersResponse.json();
      
          setStudents(studentsData);
          setTeachers(teachersData);
        } catch (error) {
          console.error("Error fetching data:", error.message);
        }
      }
      

    fetchData();
  }, []);

  return (
    <div>
      <Row>
        <Col md={6}>
          <h2>Students</h2>
          {students.length > 0 ? (
            students.map((student, index) => (
              <div key={index} className="details-card">
                <img src={studentIcon} alt="Student Icon" className="details-icon" />
                <h4>{student.name}</h4>
                <p>Email: {student.email}</p>
                <p>Department: {student.department}</p>
                <hr />
              </div>
            ))
          ) : (
            <p>No students found.</p>
          )}
        </Col>
        <Col md={6}>
          <h2>Teachers</h2>
          {teachers.length > 0 ? (
            teachers.map((teacher, index) => (
              <div key={index} className="details-card">
                <img src={teacherIcon} alt="Teacher Icon" className="details-icon" />
                <h4>{teacher.name}</h4>
                <p>Email: {teacher.email}</p>
                <p>Department: {teacher.department}</p>
                {teacher.books && (
                  <div>
                    <h5>Authored Books:</h5>
                    <ul>
                      {teacher.books.map((book, idx) => (
                        <li key={idx}>
                          <img src={bookIcon} alt="Book Icon" className="details-icon" />
                          {book.title} - {book.year}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <hr />
              </div>
            ))
          ) : (
            <p>No teachers found.</p>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default Details;
