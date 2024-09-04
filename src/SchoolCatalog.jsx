import React, { useEffect, useState } from "react";

export default function SchoolCatalog() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  useEffect(() => {
    // Fetch data from the API when the component first renders
    fetch("/api/courses.json")
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

const handleSearchChange = (event) => {
  setSearchTerm(event.target.value.toLowerCase());

  // Filter the courses based on the search term
  const filteredCourses = courses.filter(course =>
    course.courseNumber.toLowerCase().includes(searchTerm) ||
    course.courseName.toLowerCase().includes(searchTerm)
  );

const sortedCourses = [...filteredCourses].sort((a, b) => {
  if (sortConfig.key == null) return 0;
  let aValue = a[sortConfig.key];
  let bValue = b[sortConfig.key];

  if (typeof aValue === 'string') aValue = aValue.toLowerCase();
  if (typeof bValue === 'string') bValue = bValue.toLowerCase();

  if (aValue < bValue) {
    return sortConfig.direction === 'ascending' ? -1 : 1;
  }
  if (aValue > bValue) {
    return sortConfig.direction === 'ascending' ? 1 : -1;
  }
  return 0;
});

const requestSort = (key) => {
  let direction = 'ascending';
  if (sortConfig.key === key && sortConfig.direction === 'ascending') {
    direction = 'descending'
  }
  setSortConfig({ key, direction }):
};

  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <table>
      <thead>
          <tr>
            <th onClick={() => requestSort('trimester')}>Trimester</th>
            <th onClick={() => requestSort('courseNumber')}>Course Number</th>
            <th onClick={() => requestSort('courseName')}>Courses Name</th>
            <th onClick={() => requestSort('semesterCredits')}>Semester Credits</th>
            <th onClick={() => requestSort('totalClockHours')}>Total Clock Hours</th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
          {sortedCourses.map((course, index) => (
            <tr key={index}>
              <td>{course.trimester}</td>
              <td>{course.courseNumber}</td>
              <td>{course.courseName}</td>
              <td>{course.semesterCredits}</td>
              <td>{course.totalClockHours}</td>
              <td>
                <button>Enroll</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button>Previous</button>
        <button>Next</button>
      </div>
    </div>
  );
}
