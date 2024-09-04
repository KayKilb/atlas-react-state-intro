import React from "react";
import logo from "./assets/logo.png";
import { useCourseContext } from "./CourseContext"; // Import the custom hook

export default function Header() {
  const { enrolledCourses } = useCourseContext(); // Access enrolledCourses from context

  return (
    <div className="header">
      <img src={logo} alt="logo" className="logo" />
      <div className="enrollment">
        Classes Enrolled: {enrolledCourses.length}{" "}
        {/* Display dynamic course count */}
      </div>
    </div>
  );
}
