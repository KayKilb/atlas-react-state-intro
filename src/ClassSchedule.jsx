import React from "react";
import { useCourseContext } from "./CourseContext"; // Import the custom hook

export default function ClassSchedule() {
  const { enrolledCourses, dropCourse } = useCourseContext(); // Access enrolled courses and dropCourse from context

  return (
    <div className="class-schedule">
      <h1>Class Schedule</h1>
      <table>
        <thead>
          <tr>
            <th>Course Number</th>
            <th>Course Name</th>
            <th>Drop</th>
          </tr>
        </thead>
        <tbody>
          {enrolledCourses.map((course, index) => (
            <tr key={index}>
              <td>{course.courseNumber}</td>
              <td>{course.courseName}</td>
              <td>
                <button onClick={() => dropCourse(course.courseNumber)}>
                  Drop
                </button>{" "}
                {/* Drop functionality */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
