import React, { useState, useEffect } from "react"; // Import React and necessary hooks

export default function SchoolCatalog() {
  // State hooks for managing courses data, search term, sorting configuration, and current page
  const [courses, setCourses] = useState([]); // Stores the list of courses fetched from the API
  const [searchTerm, setSearchTerm] = useState(""); // Tracks the user's input in the search bar
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" }); // Configures sorting (column and direction)
  const [currentPage, setCurrentPage] = useState(1); // Tracks the current page for pagination
  const itemsPerPage = 5; // Defines how many items to show per page

  useEffect(() => {
    // useEffect to fetch data from the API when the component first mounts
    fetch("/api/courses.json") // Fetch data from the provided API endpoint
      .then((response) => response.json()) // Convert the response to JSON
      .then((data) => setCourses(data)); // Store the fetched data in the courses state
  }, []); // Empty dependency array means this effect runs once on mount

  // Handles the search input changes
  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase()); // Update the search term in state, converting to lowercase for case-insensitive search
    setCurrentPage(1); // Reset to the first page whenever a new search is made
  };

  // Handles sorting when a table header is clicked
  const handleSort = (key) => {
    let direction = "asc"; // Default sort direction is ascending
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"; // Toggle direction if the same column is clicked again
    }
    setSortConfig({ key, direction }); // Update the sort configuration state
  };

  // Sorts courses based on the selected column and direction
  const sortedCourses = [...courses].sort((a, b) => {
    if (sortConfig.key) {
      let comparison = 0;
      if (a[sortConfig.key] > b[sortConfig.key]) {
        comparison = 1;
      } else if (a[sortConfig.key] < b[sortConfig.key]) {
        comparison = -1;
      }
      return sortConfig.direction === "asc" ? comparison : -comparison; // Return comparison based on sort direction
    }
    return 0; // If no sort key, return 0 (no sorting)
  });

  // Filters the courses based on the search term, looking at course number and name
  const filteredCourses = sortedCourses.filter(
    (course) =>
      course.courseNumber.toLowerCase().includes(searchTerm) || // Check if the course number includes the search term
      course.courseName.toLowerCase().includes(searchTerm) // Check if the course name includes the search term
  );

  // Pagination logic to calculate the total pages and the courses to display on the current page
  const totalItems = filteredCourses.length; // Total number of filtered courses
  const totalPages = Math.ceil(totalItems / itemsPerPage); // Calculate total pages needed
  const startIndex = (currentPage - 1) * itemsPerPage; // Calculate the starting index for the current page
  const currentCourses = filteredCourses.slice(
    startIndex,
    startIndex + itemsPerPage // Get the slice of courses for the current page
  );

  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      {/* Search input field */}
      <input
        type="text"
        placeholder="Search"
        onChange={handleSearch} // Call handleSearch on every input change
        value={searchTerm} // Bind input value to searchTerm state
      />
      {/* Course table */}
      <table>
        <thead>
          <tr>
            {/* Table headers with sorting functionality */}
            <th onClick={() => handleSort("trimester")}>Trimester</th>
            <th onClick={() => handleSort("courseNumber")}>Course Number</th>
            <th onClick={() => handleSort("courseName")}>Courses Name</th>
            <th onClick={() => handleSort("semesterCredits")}>
              Semester Credits
            </th>
            <th onClick={() => handleSort("totalClockHours")}>
              Total Clock Hours
            </th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
          {/* Render the rows of the table based on the current page's courses */}
          {currentCourses.map((course, index) => (
            <tr key={index}>
              <td>{course.trimester}</td>
              <td>{course.courseNumber}</td>
              <td>{course.courseName}</td>
              <td>{course.semesterCredits}</td>
              <td>{course.totalClockHours}</td>
              <td>
                <button>Enroll</button>{" "}
                {/* Placeholder for enroll functionality */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination controls */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)} // Go to the previous page
          disabled={currentPage === 1} // Disable if on the first page
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)} // Go to the next page
          disabled={currentPage === totalPages} // Disable if on the last page
        >
          Next
        </button>
      </div>
    </div>
  );
}
