import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("analytics");
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    class: "",
  });
  const [message, setMessage] = useState("");

  const COLORS = ["#00C49F", "#FF8042"];

  useEffect(() => {
    setStudents([
      { id: 1, name: "Amit Sharma", email: "amit@school.com", class: "10A" },
      { id: 2, name: "Priya Mehta", email: "priya@school.com", class: "10A" },
      { id: 3, name: "Rahul Verma", email: "rahul@school.com", class: "9B" },
    ]);

    setTeachers([
      {
        id: 1,
        name: "Mr. Arjun Singh",
        email: "arjun@school.com",
        subject: "Math",
      },
      {
        id: 2,
        name: "Mrs. Neha Patel",
        email: "neha@school.com",
        subject: "Science",
      },
    ]);

    setClasses([
      { id: "9A", name: "Class 9A" },
      { id: "9B", name: "Class 9B" },
      { id: "10A", name: "Class 10A" },
      { id: "10B", name: "Class 10B" },
    ]);

    setAnalytics({
      totalStudents: 3,
      totalTeachers: 2,
      totalClasses: 4,
      attendanceStats: [
        { name: "Present", value: 85 },
        { name: "Absent", value: 15 },
      ],
      performanceData: [
        { subject: "Math", avgMarks: 85 },
        { subject: "Science", avgMarks: 78 },
        { subject: "English", avgMarks: 90 },
        { subject: "History", avgMarks: 82 },
      ],
    });
  }, []);

  const openModal = (type, item = null) => {
    setModalType(type);
    if (item) {
      setEditingId(item.id);
      setFormData({
        name: item.name,
        email: item.email,
        subject: item.subject || "",
        class: item.class || "",
      });
    } else {
      setEditingId(null);
      setFormData({ name: "", email: "", subject: "", class: "" });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({ name: "", email: "", subject: "", class: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalType === "student") {
      if (editingId) {
        setStudents(
          students.map((s) => (s.id === editingId ? { ...s, ...formData } : s))
        );
        setMessage("✅ Student updated successfully!");
      } else {
        setStudents([...students, { id: Date.now(), ...formData }]);
        setMessage("✅ Student added successfully!");
      }
      setAnalytics({
        ...analytics,
        totalStudents: students.length + (editingId ? 0 : 1),
      });
    } else if (modalType === "teacher") {
      if (editingId) {
        setTeachers(
          teachers.map((t) => (t.id === editingId ? { ...t, ...formData } : t))
        );
        setMessage("✅ Teacher updated successfully!");
      } else {
        setTeachers([...teachers, { id: Date.now(), ...formData }]);
        setMessage("✅ Teacher added successfully!");
      }
      setAnalytics({
        ...analytics,
        totalTeachers: teachers.length + (editingId ? 0 : 1),
      });
    }
    closeModal();
    setTimeout(() => setMessage(""), 3000);
  };

  const handleDelete = (type, id) => {
    if (type === "student") {
      setStudents(students.filter((s) => s.id !== id));
      setAnalytics({ ...analytics, totalStudents: students.length - 1 });
      setMessage("🗑️ Student deleted successfully!");
    } else if (type === "teacher") {
      setTeachers(teachers.filter((t) => t.id !== id));
      setAnalytics({ ...analytics, totalTeachers: teachers.length - 1 });
      setMessage("🗑️ Teacher deleted successfully!");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const handleAssignClass = (studentId, classId) => {
    setStudents(
      students.map((s) => (s.id === studentId ? { ...s, class: classId } : s))
    );
    setMessage("✅ Class assigned successfully!");
    setTimeout(() => setMessage(""), 3000);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "analytics":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">📊 Analytics Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="text-gray-600 mb-2">Total Students</div>
                <div className="text-4xl font-bold text-blue-600">
                  {analytics.totalStudents}
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="text-gray-600 mb-2">Total Teachers</div>
                <div className="text-4xl font-bold text-green-600">
                  {analytics.totalTeachers}
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="text-gray-600 mb-2">Total Classes</div>
                <div className="text-4xl font-bold text-purple-600">
                  {analytics.totalClasses}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Attendance Statistics
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analytics.attendanceStats}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {analytics.attendanceStats?.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Average Performance Report
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analytics.performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="avgMarks"
                      fill="#3b82f6"
                      name="Average Marks"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );

      case "students":
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">👨‍🎓 Manage Students</h2>
              <button
                onClick={() => openModal("student")}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                + Add Student
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 p-3 text-left">
                      Name
                    </th>
                    <th className="border border-gray-300 p-3 text-left">
                      Email
                    </th>
                    <th className="border border-gray-300 p-3 text-left">
                      Class
                    </th>
                    <th className="border border-gray-300 p-3 text-left">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3">
                        {student.name}
                      </td>
                      <td className="border border-gray-300 p-3">
                        {student.email}
                      </td>
                      <td className="border border-gray-300 p-3">
                        {student.class}
                      </td>
                      <td className="border border-gray-300 p-3">
                        <button
                          onClick={() => openModal("student", student)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded text-sm m-2 hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete("student", student.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded text-sm m-2 hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "teachers":
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">👨‍🏫 Manage Teachers</h2>
              <button
                onClick={() => openModal("teacher")}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                + Add Teacher
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 p-3 text-left">
                      Name
                    </th>
                    <th className="border border-gray-300 p-3 text-left">
                      Email
                    </th>
                    <th className="border border-gray-300 p-3 text-left">
                      Subject
                    </th>
                    <th className="border border-gray-300 p-3 text-left">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((teacher) => (
                    <tr key={teacher.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3">
                        {teacher.name}
                      </td>
                      <td className="border border-gray-300 p-3">
                        {teacher.email}
                      </td>
                      <td className="border border-gray-300 p-3">
                        {teacher.subject}
                      </td>
                      <td className="border border-gray-300 p-3">
                        <button
                          onClick={() => openModal("teacher", teacher)}
                          className="bg-yellow-500 text-white px-3 py-1 m-2 rounded text-sm hover:bg-yellow-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete("teacher", teacher.id)}
                          className="bg-red-500 text-white px-3 py-1 m-2 rounded text-sm hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "assign":
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">
              🎒 Assign Students to Classes
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 p-3 text-left">
                      Student Name
                    </th>
                    <th className="border border-gray-300 p-3 text-left">
                      Current Class
                    </th>
                    <th className="border border-gray-300 p-3 text-left">
                      Assign to Class
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3">
                        {student.name}
                      </td>
                      <td className="border border-gray-300 p-3">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {student.class}
                        </span>
                      </td>
                      <td className="border border-gray-300 p-3">
                        <select
                          value={student.class}
                          onChange={(e) =>
                            handleAssignClass(student.id, e.target.value)
                          }
                          className="w-full p-2 border border-gray-300 rounded"
                        >
                          {classes.map((cls) => (
                            <option key={cls.id} value={cls.id}>
                              {cls.name}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-gray-900 text-white p-6">
        <h5 className="text-xl font-bold mb-6">🧑‍💼 Admin Portal</h5>
        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab("analytics")}
            className={`w-full text-left px-4 py-3 rounded transition ${
              activeTab === "analytics" ? "bg-blue-600" : "hover:bg-gray-800"
            }`}
          >
            📊 Analytics
          </button>
          <button
            onClick={() => setActiveTab("students")}
            className={`w-full text-left px-4 py-3 rounded transition ${
              activeTab === "students" ? "bg-blue-600" : "hover:bg-gray-800"
            }`}
          >
            👨‍🎓 Manage Students
          </button>
          <button
            onClick={() => setActiveTab("teachers")}
            className={`w-full text-left px-4 py-3 rounded transition ${
              activeTab === "teachers" ? "bg-blue-600" : "hover:bg-gray-800"
            }`}
          >
            👨‍🏫 Manage Teachers
          </button>
          <button
            onClick={() => setActiveTab("assign")}
            className={`w-full text-left px-4 py-3 rounded transition ${
              activeTab === "assign" ? "bg-blue-600" : "hover:bg-gray-800"
            }`}
          >
            🎒 Assign Classes
          </button>
        </nav>
      </div>

      <div className="flex-1 p-6">
        {message && (
          <div
            className={`mb-4 p-4 rounded ${
              message.includes("✅")
                ? "bg-green-100 border border-green-400 text-green-800"
                : message.includes("🗑️")
                ? "bg-red-100 border border-red-400 text-red-800"
                : "bg-blue-100 border border-blue-400 text-blue-800"
            }`}
          >
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

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {editingId ? "Edit" : "Add"}{" "}
                {modalType === "teacher" ? "Teacher" : "Student"}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter email"
                />
              </div>
              {modalType === "teacher" ? (
                <div>
                  <label className="block text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter subject"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-gray-700 mb-2">Class</label>
                  <select
                    value={formData.class}
                    onChange={(e) =>
                      setFormData({ ...formData, class: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="">Select a class</option>
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                {editingId ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Table,
//   Button,
//   Form,
//   Modal,
// } from "react-bootstrap";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   Legend,
//   BarChart,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Bar,
//   ResponsiveContainer,
// } from "recharts";
// import axios from "axios";

// const AdminDashboard = () => {
//   const [students, setStudents] = useState([]);
//   const [teachers, setTeachers] = useState([]);
//   const [classes, setClasses] = useState([]);
//   const [analytics, setAnalytics] = useState({});
//   const [showModal, setShowModal] = useState(false);
//   const [entityType, setEntityType] = useState("");
//   const [formData, setFormData] = useState({ name: "", email: "", role: "" });

//   // Mock data simulation (replace with backend API)
//   useEffect(() => {
//     const fetchData = async () => {
//       // Example API calls:
//       // const { data } = await axios.get("http://localhost:5000/api/admin/dashboard");
//       // setStudents(data.students);
//       // setTeachers(data.teachers);
//       // setClasses(data.classes);
//       // setAnalytics(data.analytics);

//       setStudents([
//         { id: 1, name: "Amit Sharma", class: "10A" },
//         { id: 2, name: "Priya Mehta", class: "10A" },
//         { id: 3, name: "Rahul Verma", class: "9B" },
//       ]);

//       setTeachers([
//         { id: 1, name: "Mr. Arjun Singh", subject: "Math" },
//         { id: 2, name: "Mrs. Neha Patel", subject: "Science" },
//       ]);

//       setClasses([
//         { id: 1, name: "Class 9A" },
//         { id: 2, name: "Class 9B" },
//         { id: 3, name: "Class 10A" },
//       ]);

//       setAnalytics({
//         totalStudents: 3,
//         totalTeachers: 2,
//         totalClasses: 3,
//         attendanceStats: [
//           { name: "Present", value: 85 },
//           { name: "Absent", value: 15 },
//         ],
//         performanceData: [
//           { subject: "Math", avgMarks: 85 },
//           { subject: "Science", avgMarks: 78 },
//           { subject: "English", avgMarks: 90 },
//         ],
//       });
//     };

//     fetchData();
//   }, []);

//   // Chart colors
//   const COLORS = ["#00C49F", "#FF8042"];

//   // Handle modal open/close
//   const openModal = (type) => {
//     setEntityType(type);
//     setFormData({ name: "", email: "", role: type === "teacher" ? "Teacher" : "Student" });
//     setShowModal(true);
//   };
//   const closeModal = () => setShowModal(false);

//   // Handle add/edit
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Example: await axios.post("/api/admin/add-user", formData);
//     if (entityType === "student") {
//       setStudents([...students, { id: students.length + 1, name: formData.name, class: "Not Assigned" }]);
//     } else {
//       setTeachers([...teachers, { id: teachers.length + 1, name: formData.name, subject: "Not Assigned" }]);
//     }
//     closeModal();
//   };

//   // Handle delete (mock)
//   const handleDelete = (type, id) => {
//     if (type === "student") setStudents(students.filter((s) => s.id !== id));
//     if (type === "teacher") setTeachers(teachers.filter((t) => t.id !== id));
//   };

//   return (
//     <Container fluid className="p-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
//       <h2 className="text-center mb-4">🧑‍💼 Admin Dashboard</h2>

//       {/* Analytics Summary */}
//       <Row className="mb-4">
//         <Col md={4}>
//           <Card className="shadow-sm text-center p-3">
//             <h5>Total Students</h5>
//             <h3>{analytics.totalStudents}</h3>
//           </Card>
//         </Col>
//         <Col md={4}>
//           <Card className="shadow-sm text-center p-3">
//             <h5>Total Teachers</h5>
//             <h3>{analytics.totalTeachers}</h3>
//           </Card>
//         </Col>
//         <Col md={4}>
//           <Card className="shadow-sm text-center p-3">
//             <h5>Total Classes</h5>
//             <h3>{analytics.totalClasses}</h3>
//           </Card>
//         </Col>
//       </Row>

//       {/* Charts Section */}
//       <Row className="mb-4">
//         <Col md={6} className="mb-4">
//           <Card className="shadow-sm p-3">
//             <Card.Title>Attendance Statistics</Card.Title>
//             <ResponsiveContainer width="100%" height={250}>
//               <PieChart>
//                 <Pie
//                   data={analytics.attendanceStats}
//                   dataKey="value"
//                   nameKey="name"
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={80}
//                   label
//                 >
//                   {analytics.attendanceStats?.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </Card>
//         </Col>

//         <Col md={6} className="mb-4">
//           <Card className="shadow-sm p-3">
//             <Card.Title>Average Performance Report</Card.Title>
//             <ResponsiveContainer width="100%" height={250}>
//               <BarChart data={analytics.performanceData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="subject" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="avgMarks" fill="#007bff" name="Average Marks" />
//               </BarChart>
//             </ResponsiveContainer>
//           </Card>
//         </Col>
//       </Row>

//       {/* Students and Teachers Management */}
//       <Row>
//         {/* Students */}
//         <Col md={6} className="mb-4">
//           <Card className="shadow-sm p-3">
//             <div className="d-flex justify-content-between align-items-center mb-3">
//               <Card.Title>Manage Students</Card.Title>
//               <Button variant="primary" onClick={() => openModal("student")}>
//                 + Add Student
//               </Button>
//             </div>
//             <Table striped bordered hover responsive>
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Class</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {students.map((student) => (
//                   <tr key={student.id}>
//                     <td>{student.name}</td>
//                     <td>{student.class}</td>
//                     <td>
//                       <Button variant="danger" size="sm" onClick={() => handleDelete("student", student.id)}>
//                         Delete
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           </Card>
//         </Col>

//         {/* Teachers */}
//         <Col md={6} className="mb-4">
//           <Card className="shadow-sm p-3">
//             <div className="d-flex justify-content-between align-items-center mb-3">
//               <Card.Title>Manage Teachers</Card.Title>
//               <Button variant="success" onClick={() => openModal("teacher")}>
//                 + Add Teacher
//               </Button>
//             </div>
//             <Table striped bordered hover responsive>
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Subject</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {teachers.map((teacher) => (
//                   <tr key={teacher.id}>
//                     <td>{teacher.name}</td>
//                     <td>{teacher.subject}</td>
//                     <td>
//                       <Button variant="danger" size="sm" onClick={() => handleDelete("teacher", teacher.id)}>
//                         Delete
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           </Card>
//         </Col>
//       </Row>

//       {/* Modal for Add/Edit */}
//       <Modal show={showModal} onHide={closeModal} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>{`Add ${entityType === "teacher" ? "Teacher" : "Student"}`}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group controlId="name" className="mb-3">
//               <Form.Label>Full Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter name"
//                 required
//                 value={formData.name}
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               />
//             </Form.Group>
//             <Form.Group controlId="email" className="mb-3">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Enter email"
//                 required
//                 value={formData.email}
//                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//               />
//             </Form.Group>
//             <Button variant="primary" type="submit" className="w-100">
//               Save
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </Container>
//   );
// };

// export default AdminDashboard;
