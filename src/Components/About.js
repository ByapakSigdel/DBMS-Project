import React from "react";
import kec from "../images/kec.png";

function About() {
  return (
    <div style={{ textAlign: "center" }}>
      <br />
      <h2>About Kathmandu Engineering College</h2>
      <br />
      <div style={{ width: "1300px" }} className="center-div">
        <div className="row">
          <div className="col-6">
            <p className="  ">
              Kathmandu Engineering College (KEC), located in Kalimati,
              Kathmandu, is one of Nepal's leading engineering institutions.
              Established with a vision to provide quality education in the
              field of engineering and technology, KEC has been a cornerstone
              in shaping the future of numerous engineering professionals since
              its inception.
              <br />
              <br />
              KEC offers a range of undergraduate and postgraduate programs in
              engineering disciplines, catering to the academic and professional
              aspirations of its students. Permanently affiliated with prominent
              universities, KEC emphasizes academic excellence and holistic
              development.
              <br />
              <br />
              The college prides itself on its strong academic performance,
              consistently producing top-ranking students and maintaining a
              high standard of education. KEC also boasts a robust placement
              record, attracting renowned companies for campus recruitment.
              <br />
              <br />
              The serene campus of KEC fosters an environment conducive to
              learning and innovation. With state-of-the-art facilities and
              dedicated faculty, KEC continues to be a preferred choice for
              aspiring engineers in Nepal.
            </p>
          </div>
          <div className="align-self-end col-6">
            <img src={kec} alt="KEC Logo" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
