-- Create department table
CREATE TABLE department (
    did INT PRIMARY KEY NOT NULL,
    dname VARCHAR(50)
);

-- Create student table with a generated column for full name
CREATE TABLE student (
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    full_name VARCHAR(200) GENERATED ALWAYS AS (concat_ws(' ', first_name, last_name)) STORED,
    sapid VARCHAR(11) PRIMARY KEY NOT NULL,
    gender VARCHAR(6) NOT NULL,
    dob DATE,
    did INT,
    FOREIGN KEY (did) REFERENCES department(did)
);

-- Create faculty table
CREATE TABLE faculty (
    fid INT PRIMARY KEY NOT NULL,
    fname VARCHAR(50),
    salary DECIMAL(8,2),
    email VARCHAR(50),
    did INT,
    FOREIGN KEY (did) REFERENCES department(did)
);

-- Alter department table to add HOD
ALTER TABLE department
ADD hod INT,
ADD FOREIGN KEY (hod) REFERENCES faculty(fid);

-- Create course table
CREATE TABLE course (
    courseid INT PRIMARY KEY NOT NULL,
    course_name VARCHAR(50),
    credits INT,
    did INT,
    FOREIGN KEY (did) REFERENCES department(did)
);

-- Create teaches table
CREATE TABLE teaches (
    fid INT,
    courseid INT,
    FOREIGN KEY (fid) REFERENCES faculty(fid),
    FOREIGN KEY (courseid) REFERENCES course(courseid)
);

-- Create research project table
CREATE TABLE research_proj (
    pid INT PRIMARY KEY NOT NULL,
    pname VARCHAR(50),
    p_desc VARCHAR(100)
);

-- Create research faculty table
CREATE TABLE research_faculty (
    fid INT,
    pid INT,
    FOREIGN KEY (fid) REFERENCES faculty(fid),
    FOREIGN KEY (pid) REFERENCES research_proj(pid)
);

-- Create research student table
CREATE TABLE research_student (
    sapid VARCHAR(11),
    pid INT,
    FOREIGN KEY (sapid) REFERENCES student(sapid),
    FOREIGN KEY (pid) REFERENCES research_proj(pid)
);

-- Create library table
CREATE TABLE library (
    bookid INT PRIMARY KEY NOT NULL,
    bname VARCHAR(50),
    edition INT,
    author VARCHAR(50)
);

-- Create borrowed table
CREATE TABLE borrowed (
    bookid INT,
    fid INT,
    sapid VARCHAR(11),
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fid) REFERENCES faculty(fid),
    FOREIGN KEY (sapid) REFERENCES student(sapid),
    FOREIGN KEY (bookid) REFERENCES library(bookid)
);

-- Create committee table
CREATE TABLE committee (
    committee_id INT PRIMARY KEY NOT NULL,
    c_name VARCHAR(50),
    c_head VARCHAR(11),
    tech_c BOOLEAN,
    compi_wins INT,
    events_organised INT,
    FOREIGN KEY (c_head) REFERENCES student(sapid)
);

-- Create core members table
CREATE TABLE core_members (
    committee_id INT NOT NULL,
    sapid VARCHAR(11) NOT NULL,
    FOREIGN KEY (committee_id) REFERENCES committee(committee_id),
    FOREIGN KEY (sapid) REFERENCES student(sapid)
);

-- Create co members table
CREATE TABLE co_members (
    committee_id INT NOT NULL,
    sapid VARCHAR(11) NOT NULL,
    FOREIGN KEY (committee_id) REFERENCES committee(committee_id),
    FOREIGN KEY (sapid) REFERENCES student(sapid)
);
