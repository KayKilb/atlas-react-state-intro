import SchoolCatalog from "./SchoolCatalog"; // Import the SchoolCatalog component
import Header from "./Header"; // Import the Header component
import ClassSchedule from "./ClassSchedule"; // Import the ClassSchedule component

export default function App() {
  return (
    <div>
      <Header /> {/* Render the Header component */}
      <SchoolCatalog /> {/* Render the SchoolCatalog component */}
      <ClassSchedule /> {/* Render the ClassSchedule component */}
    </div>
  );
}
