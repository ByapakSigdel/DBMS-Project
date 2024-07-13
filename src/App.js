import "./App.css";
import "./style.css";
import Home from "./Components/Home";
import TopNav from "./Components/TopNav";
import Library from "./Components/Library";
import Project from "./Components/Project";
import Department from "./Components/Department";
import Committee from "./Components/Committee";
import Contact from "./Components/Contact";
import SingleDepartment from "./Components/SingleDepartment";
import AddBook from "./Components/AddBook";
import About from "./Components/About";
import Details from "./Components/Details";
import Footer from "./Components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <TopNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/projects" element={<Project />} />
          <Route path="/departments" element={<Department />} />
          <Route path="/committees" element={<Committee />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/department/:dname" element={<SingleDepartment />} />
          <Route path="/library/add" element={<AddBook />} />
          <Route path="/library/update/:bookid" element={<AddBook />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/details" element={<Details />} />
        </Routes>
<Footer />
      </Router>
    </div>
  );
}

export default App;
