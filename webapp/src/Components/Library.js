import React, { useState, useEffect } from "react";
import { Col, Row, Card } from "react-bootstrap";
import _ from "lodash";
import libraryLogo from "../images/library-lg.png";
import switchOrder from "../images/switch-order-logo.png";
import book from "../images/book.png";
import { Link } from "react-router-dom";

function Library() {
  const [tag, setTag] = useState("bname");
  const [order, setOrder] = useState("1");
  const [noOfBooks, setBookNo] = useState(0);
  const [noOfAuthors, setAuthorNo] = useState(0);
  const [noOfEditions, setEditionNo] = useState(0);
  const [books, setBooks] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [selectedSort, setSelectedSort] = useState("bname");

  async function getCount() {
    try {
      const doc = await fetch("/api/library/count");
      const { noOfBooks, noOfAuthors, noOfEditions } = await doc.json();
      setBookNo(noOfBooks);
      setAuthorNo(noOfAuthors);
      setEditionNo(noOfEditions);
    } catch (err) {
      console.log(err);
    }
  }

  async function getBooks() {
    try {
      const doc = await fetch(`/api/library?tag=${tag}&order=${order}`);
      const books = await doc.json();
      setBooks(books);
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
        const doc = await fetch(`/api/library/search?tag=${tag}&filter=${searchVal}`);
        const result = await doc.json();
        setBooks(result);
      } catch (err) {
        console.log(err);
      }
    } else {
      getBooks(); // Fetch all books if search value is empty
    }
  };

  const handleKeyDown = async (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      handleSubmit(e);
    }
  };

  const handleSort = (selectedTag) => {
    setTag(selectedTag);
    setSelectedSort(selectedTag);
    setOrder("1"); // Reset order to default ascending when changing sort criteria
  };

  const handleOrder = () => {
    setOrder(order === "1" ? "-1" : "1");
  };

  const handleDelete = async (el) => {
    try {
      await fetch(`/api/library/delete?bname=${el.bname}&edition=${el.edition}`, {
        method: "POST"
      });
      const updatedBooks = _.filter(books, (book) => book.bname !== el.bname || book.edition !== el.edition);
      setBooks(updatedBooks);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCount();
    getBooks(); // Initial fetch of books on component mount
  }, [tag, order, searchVal]);

  return (
    <div>
      <Row>
        <Col md={2} className="text-center my-4">
          <img src={libraryLogo} alt="Library" style={{ height: "150px" }} />
          <h3 className="mt-3">LIBRARY</h3>
          <p>
            No. of books: <b>{noOfBooks}</b> <br />
            No. of Authors: <b>{noOfAuthors}</b> <br />
            No. of Editions: <b>{noOfEditions}</b>
          </p>
          <Link to="/library/add" className="btn btn-primary mb-3">
            <i className="fa fa-plus mr-2" aria-hidden="true"></i>Add Book
          </Link>
        </Col>
        <Col md={10}>
          <Row className="align-items-center my-4">
            <Col md={1} onClick={() => handleSort("bname")} className={`text-center cursor-pointer ${selectedSort === "bname" ? "text-primary" : ""}`}>
              Name
            </Col>
            <Col md={1} onClick={() => handleSort("author")} className={`text-center cursor-pointer ${selectedSort === "author" ? "text-primary" : ""}`}>
              Author
            </Col>
            <Col md={1} onClick={() => handleSort("edition")} className={`text-center cursor-pointer ${selectedSort === "edition" ? "text-primary" : ""}`}>
              Edition
            </Col>
            <Col md={6} className="d-flex justify-content-end align-items-center">
              <input
                className="form-control"
                type="text"
                placeholder="Search"
                value={searchVal}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
              <button onClick={handleOrder} className="btn btn-link ml-2">
                <img src={switchOrder} alt="Switch Order" style={{ height: "20px" }} />
              </button>
            </Col>
          </Row>
          <hr />
          <Row className="justify-content-center">
            {books.length > 0 ? (
              books.map((el, id) => (
                <Col md={5} key={id} className="mb-4">
                  <Card className="book-card">
                    <Row>
                      <Col md={2} className="text-center">
                        <img src={book} alt="Book" className="book-image" />
                      </Col>
                      <Col>
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <p className="grid-title mb-0">{el.bname}</p>
                            <p className="author">By {el.author}</p>
                            <p className="edition">Edition {el.edition}</p>
                          </div>
                          <div className="ml-auto">
                            <Link to={`/library/update/${el.bookid}`} className="text-dark mr-2">
                              <i className="fa fa-pencil" aria-hidden="true"></i>
                            </Link>
                            <i className="fa fa-trash text-danger" aria-hidden="true" onClick={() => handleDelete(el)}></i>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))
            ) : (
              <Col md={12} className="text-center">
                No books found.
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Library;
