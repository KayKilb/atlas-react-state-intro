import React from 'react';
import SchoolCatalog from "./SchoolCatalog"; // Import the SchoolCatalog component
import Header from "./Header"; // Import the Header component
import ClassSchedule from "./ClassSchedule"; // Import the ClassSchedule component
import { CourseProvider} "./CourseContext"; // Import the CourseProvider componentontext"; // Import the CourseProvider component  

export default function App() {
  return (
    <CourseProvider>
      <Header /> {/* Render the Header component */}
      <SchoolCatalog /> {/* Render the SchoolCatalog component */}
      <ClassSchedule /> {/* Render the ClassSchedule component */}
    </CourseProvider>
  );
}
