import React, { useState, useEffect } from "react";

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState("classes");
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [grades, setGrades] = useState({});
  const [message, setMessage] = useState("");
  const [reportType, setReportType] = useState("class");
  const [selectedStudent, setSelectedStudent] = useState("");

  useEffect(() => {
    setClasses([
      { id: "classA", name: "Class A (10th Grade)" },
      { id: "classB", name: "Class B (9th Grade)" },
    ]);
  }, []);

  const handleClassSelect = (classId) => {
    setSelectedClass(classId);
    setMessage("");
    const mockStudents = [
      { id: 1, name: "Amit Sharma" },
      { id: 2, name: "Priya Mehta" },
      { id: 3, name: "Rahul Verma" },
    ];
    setStudents(mockStudents);
    setAttendance({});
    setGrades({});
  };

  const handleAttendanceChange = (studentId, status) => {
    setAttendance({ ...attendance, [studentId]: status });
  };

  const handleGradeChange = (studentId, score) => {
    setGrades({ ...grades, [studentId]: score });
  };

  const handleMarkAttendance = () => {
    if (Object.keys(attendance).length === 0) {
      setMessage("⚠️ Please mark attendance for at least one student!");
      return;
    }
    setMessage("✅ Attendance marked successfully!");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleAddGrades = () => {
    if (Object.keys(grades).length === 0) {
      setMessage("⚠️ Please add grades for at least one student!");
      return;
    }
    setMessage("✅ Grades added successfully!");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleGenerateReport = () => {
    if (reportType === "student" && !selectedStudent) {
      setMessage("⚠️ Please select a student for the report!");
      return;
    }
    const reportMsg = reportType === "class" 
      ? `📄 Class report for ${classes.find(c => c.id === selectedClass)?.name} generated!`
      : `📄 Student report for ${students.find(s => s.id === parseInt(selectedStudent))?.name} generated!`;
    setMessage(reportMsg);
    setTimeout(() => setMessage(""), 3000);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "classes":
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">📚 View Assigned Classes</h2>
            <p className="text-gray-600 mb-6">Select a class to manage students, attendance, and grades.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {classes.map((cls) => (
                <div 
                  key={cls.id}
                  onClick={() => handleClassSelect(cls.id)}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                    selectedClass === cls.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <h3 className="text-xl font-semibold mb-2">{cls.name}</h3>
                  <p className="text-gray-600 mb-3">
                    Students: {students.length > 0 && selectedClass === cls.id ? students.length : 'N/A'}
                  </p>
                  <button className={`px-4 py-2 rounded ${
                    selectedClass === cls.id 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {selectedClass === cls.id ? "Selected" : "Select Class"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case "attendance":
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">📝 Mark Daily Attendance</h2>
            {!selectedClass ? (
              <div className="bg-blue-50 border border-blue-200 rounded p-4 text-blue-800">
                Please select a class from the "View Classes" section first.
              </div>
            ) : (
              <>
                <div className="mb-4 p-3 bg-gray-50 rounded">
                  <strong>Selected Class:</strong> {classes.find(c => c.id === selectedClass)?.name}
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border border-gray-300 p-3 text-left">#</th>
                        <th className="border border-gray-300 p-3 text-left">Student Name</th>
                        <th className="border border-gray-300 p-3 text-left">Attendance Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student, index) => (
                        <tr key={student.id} className="hover:bg-gray-50">
                          <td className="border border-gray-300 p-3">{index + 1}</td>
                          <td className="border border-gray-300 p-3">{student.name}</td>
                          <td className="border border-gray-300 p-3">
                            <select
                              value={attendance[student.id] || ""}
                              onChange={(e) => handleAttendanceChange(student.id, e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded"
                            >
                              <option value="">Select Status</option>
                              <option value="Present">✓ Present</option>
                              <option value="Absent">✗ Absent</option>
                              <option value="Late">⏰ Late</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-end mt-4">
                  <button 
                    onClick={handleMarkAttendance}
                    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                  >
                    Submit Attendance
                  </button>
                </div>
              </>
            )}
          </div>
        );

      case "grades":
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">🎓 Add Grades / Performance Scores</h2>
            {!selectedClass ? (
              <div className="bg-blue-50 border border-blue-200 rounded p-4 text-blue-800">
                Please select a class from the "View Classes" section first.
              </div>
            ) : (
              <>
                <div className="mb-4 p-3 bg-gray-50 rounded">
                  <strong>Selected Class:</strong> {classes.find(c => c.id === selectedClass)?.name}
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border border-gray-300 p-3 text-left">#</th>
                        <th className="border border-gray-300 p-3 text-left">Student Name</th>
                        <th className="border border-gray-300 p-3 text-left">Score (0-100)</th>
                        <th className="border border-gray-300 p-3 text-left">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student, index) => {
                        const score = grades[student.id] || "";
                        let grade = "";
                        if (score >= 90) grade = "A+";
                        else if (score >= 80) grade = "A";
                        else if (score >= 70) grade = "B";
                        else if (score >= 60) grade = "C";
                        else if (score >= 50) grade = "D";
                        else if (score) grade = "F";

                        return (
                          <tr key={student.id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-3">{index + 1}</td>
                            <td className="border border-gray-300 p-3">{student.name}</td>
                            <td className="border border-gray-300 p-3">
                              <input
                                type="number"
                                min="0"
                                max="100"
                                placeholder="Enter score"
                                value={score}
                                onChange={(e) => handleGradeChange(student.id, e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                              />
                            </td>
                            <td className="border border-gray-300 p-3">
                              <strong className={score >= 60 ? "text-green-600" : "text-red-600"}>
                                {grade}
                              </strong>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-end mt-4">
                  <button 
                    onClick={handleAddGrades}
                    className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                  >
                    Submit Grades
                  </button>
                </div>
              </>
            )}
          </div>
        );

      case "reports":
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">📊 Generate Reports</h2>
            {!selectedClass ? (
              <div className="bg-blue-50 border border-blue-200 rounded p-4 text-blue-800">
                Please select a class from the "View Classes" section first.
              </div>
            ) : (
              <>
                <div className="mb-4 p-3 bg-gray-50 rounded">
                  <strong>Selected Class:</strong> {classes.find(c => c.id === selectedClass)?.name}
                </div>
                
                <div className="mb-4">
                  <label className="block font-semibold mb-2">Report Type</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="reportType"
                        value="class"
                        checked={reportType === "class"}
                        onChange={(e) => setReportType(e.target.value)}
                        className="mr-2"
                      />
                      Class Report (All Students)
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="reportType"
                        value="student"
                        checked={reportType === "student"}
                        onChange={(e) => setReportType(e.target.value)}
                        className="mr-2"
                      />
                      Individual Student Report
                    </label>
                  </div>
                </div>

                {reportType === "student" && (
                  <div className="mb-4">
                    <label className="block font-semibold mb-2">Select Student</label>
                    <select
                      value={selectedStudent}
                      onChange={(e) => setSelectedStudent(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    >
                      <option value="">Choose a student...</option>
                      {students.map((student) => (
                        <option key={student.id} value={student.id}>
                          {student.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="bg-gray-50 p-4 rounded mb-4">
                  <h6 className="font-semibold mb-2">Report will include:</h6>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Attendance records</li>
                    <li>Grade summaries</li>
                    <li>Performance analytics</li>
                    <li>Participation metrics</li>
                  </ul>
                </div>

                <div className="flex justify-end">
                  <button 
                    onClick={handleGenerateReport}
                    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                  >
                    Generate & Download Report
                  </button>
                </div>
              </>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6">
        <h5 className="text-xl font-bold mb-6">👩‍🏫 Teacher Portal</h5>
        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab("classes")}
            className={`w-full text-left px-4 py-3 rounded transition ${
              activeTab === "classes" ? "bg-blue-600" : "hover:bg-gray-800"
            }`}
          >
            📚 View Classes
          </button>
          <button
            onClick={() => setActiveTab("attendance")}
            className={`w-full text-left px-4 py-3 rounded transition ${
              activeTab === "attendance" ? "bg-blue-600" : "hover:bg-gray-800"
            }`}
          >
            📝 Mark Attendance
          </button>
          <button
            onClick={() => setActiveTab("grades")}
            className={`w-full text-left px-4 py-3 rounded transition ${
              activeTab === "grades" ? "bg-blue-600" : "hover:bg-gray-800"
            }`}
          >
            🎓 Add Grades
          </button>
          <button
            onClick={() => setActiveTab("reports")}
            className={`w-full text-left px-4 py-3 rounded transition ${
              activeTab === "reports" ? "bg-blue-600" : "hover:bg-gray-800"
            }`}
          >
            📊 Generate Reports
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {message && (
          <div className={`mb-4 p-4 rounded ${
            message.includes("✅") ? "bg-green-100 border border-green-400 text-green-800" :
            message.includes("📄") ? "bg-blue-100 border border-blue-400 text-blue-800" :
            "bg-yellow-100 border border-yellow-400 text-yellow-800"
          }`}>
            {message}
            <button 
              onClick={() => setMessage("")}
              className="float-right font-bold"
            >
              ×
            </button>
          </div>
        )}
        {renderContent()}
      </div>
    </div>
  );
};

export default TeacherDashboard;







// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Table,
//   Form,
//   Button,
//   Alert,
// } from "react-bootstrap";
// import axios from "axios";

// const TeacherDashboard = () => {
//   const [classes, setClasses] = useState([]);
//   const [selectedClass, setSelectedClass] = useState("");
//   const [students, setStudents] = useState([]);
//   const [attendance, setAttendance] = useState({});
//   const [grades, setGrades] = useState({});
//   const [message, setMessage] = useState("");

//   // Mock data — replace with real API calls
//   useEffect(() => {
//     const fetchData = async () => {
//       // Example backend call
//       // const { data } = await axios.get("http://localhost:5000/api/teacher/classes", {
//       //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       // });
//       // setClasses(data);

//       setClasses([
//         { id: "classA", name: "Class A (10th Grade)" },
//         { id: "classB", name: "Class B (9th Grade)" },
//       ]);
//     };

//     fetchData();
//   }, []);

//   const handleClassSelect = async (e) => {
//     const classId = e.target.value;
//     setSelectedClass(classId);
//     setMessage("");

//     // Example: Fetch students for selected class
//     // const { data } = await axios.get(`http://localhost:5000/api/teacher/classes/${classId}/students`);
//     // setStudents(data);

//     // Mock student data
//     const mockStudents = [
//       { id: 1, name: "Amit Sharma" },
//       { id: 2, name: "Priya Mehta" },
//       { id: 3, name: "Rahul Verma" },
//     ];
//     setStudents(mockStudents);
//   };

//   const handleAttendanceChange = (studentId, status) => {
//     setAttendance({ ...attendance, [studentId]: status });
//   };

//   const handleGradeChange = (studentId, score) => {
//     setGrades({ ...grades, [studentId]: score });
//   };

//   const handleMarkAttendance = async () => {
//     // Example API
//     // await axios.post("http://localhost:5000/api/teacher/attendance", { classId: selectedClass, attendance });
//     setMessage("✅ Attendance marked successfully!");
//   };

//   const handleAddGrades = async () => {
//     // Example API
//     // await axios.post("http://localhost:5000/api/teacher/grades", { classId: selectedClass, grades });
//     setMessage("✅ Grades added successfully!");
//   };

//   const handleGenerateReport = () => {
//     // Example: Could trigger report generation backend call
//     setMessage("📄 Report generated successfully (mock)!");
//   };

//   return (
//     <Container fluid className="p-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
//       <h2 className="text-center mb-4">👩‍🏫 Teacher Dashboard</h2>

//       {message && (
//         <Alert
//           variant={
//             message.includes("✅")
//               ? "success"
//               : message.includes("📄")
//               ? "info"
//               : "danger"
//           }
//         >
//           {message}
//         </Alert>
//       )}

//       {/* Assigned Classes */}
//       <Row className="mb-4">
//         <Col md={12}>
//           <Card className="shadow-sm p-3">
//             <Card.Title>Assigned Classes</Card.Title>
//             <Form.Select
//               className="mt-3"
//               value={selectedClass}
//               onChange={handleClassSelect}
//             >
//               <option value="">Select a class</option>
//               {classes.map((cls) => (
//                 <option key={cls.id} value={cls.id}>
//                   {cls.name}
//                 </option>
//               ))}
//             </Form.Select>
//           </Card>
//         </Col>
//       </Row>

//       {/* Students Table (after selecting class) */}
//       {selectedClass && (
//         <Row>
//           <Col md={12}>
//             <Card className="shadow-sm p-3">
//               <Card.Title>Manage Attendance & Grades</Card.Title>
//               <Table striped bordered hover responsive className="mt-3">
//                 <thead>
//                   <tr>
//                     <th>Student Name</th>
//                     <th>Attendance</th>
//                     <th>Marks / Score</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {students.map((student) => (
//                     <tr key={student.id}>
//                       <td>{student.name}</td>
//                       <td>
//                         <Form.Select
//                           value={attendance[student.id] || ""}
//                           onChange={(e) =>
//                             handleAttendanceChange(student.id, e.target.value)
//                           }
//                         >
//                           <option value="">Select</option>
//                           <option value="Present">Present</option>
//                           <option value="Absent">Absent</option>
//                         </Form.Select>
//                       </td>
//                       <td>
//                         <Form.Control
//                           type="number"
//                           min="0"
//                           max="100"
//                           placeholder="Enter Marks"
//                           value={grades[student.id] || ""}
//                           onChange={(e) =>
//                             handleGradeChange(student.id, e.target.value)
//                           }
//                         />
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>

//               <div className="d-flex gap-3 mt-3 justify-content-end flex-wrap">
//                 <Button
//                   variant="primary"
//                   onClick={handleMarkAttendance}
//                   disabled={!selectedClass}
//                 >
//                   Mark Attendance
//                 </Button>
//                 <Button
//                   variant="success"
//                   onClick={handleAddGrades}
//                   disabled={!selectedClass}
//                 >
//                   Add Grades
//                 </Button>
//                 <Button
//                   variant="secondary"
//                   onClick={handleGenerateReport}
//                   disabled={!selectedClass}
//                 >
//                   Generate Report
//                 </Button>
//               </div>
//             </Card>
//           </Col>
//         </Row>
//       )}
//     </Container>
//   );
// };

// export default TeacherDashboard;
