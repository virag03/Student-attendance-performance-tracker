import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  ProgressBar,
  Nav,
} from "react-bootstrap";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const StudentDashboard = () => {
  const [attendance, setAttendance] = useState([]);
  const [marks, setMarks] = useState([]);
  const [attendancePercentage, setAttendancePercentage] = useState(0);
  const [performanceData, setPerformanceData] = useState([]);
  const [activeSection, setActiveSection] = useState("attendance"); // sidebar navigation state

  useEffect(() => {
    const fetchData = async () => {
      // Mock attendance history
      const attendanceData = [
        { date: "2025-10-25", status: "Present" },
        { date: "2025-10-26", status: "Absent" },
        { date: "2025-10-27", status: "Present" },
        { date: "2025-10-28", status: "Present" },
        { date: "2025-10-29", status: "Present" },
      ];

      // Mock marks
      const marksData = [
        { subject: "Math", marks: 88, grade: "A" },
        { subject: "Science", marks: 75, grade: "B+" },
        { subject: "English", marks: 92, grade: "A+" },
        { subject: "History", marks: 80, grade: "A" },
      ];

      // Mock performance chart
      const performanceChart = [
        { subject: "Math", marks: 88 },
        { subject: "Science", marks: 75 },
        { subject: "English", marks: 92 },
        { subject: "History", marks: 80 },
      ];

      // Attendance percentage calculation
      const totalDays = attendanceData.length;
      const presentDays = attendanceData.filter((a) => a.status === "Present").length;
      const percentage = Math.round((presentDays / totalDays) * 100);

      setAttendance(attendanceData);
      setMarks(marksData);
      setPerformanceData(performanceChart);
      setAttendancePercentage(percentage);
    };

    fetchData();
  }, []);

  return (
    <Container fluid className="p-0" style={{ minHeight: "100vh" }}>
      <Row className="g-0">
        {/* Sidebar */}
        <Col
          md={3}
          lg={2}
          className="bg-dark text-white p-4"
          style={{ minHeight: "100vh" }}
        >
          <h4 className="mb-4 text-center">🎓 Dashboard</h4>
          <Nav
            className="flex-column"
            variant="pills"
            activeKey={activeSection}
            onSelect={(selectedKey) => setActiveSection(selectedKey)}
          >
            <Nav.Link
              eventKey="attendance"
              className="text-white"
              style={{ cursor: "pointer" }}
            >
              📅 View Attendance History
            </Nav.Link>
            <Nav.Link
              eventKey="marks"
              className="text-white"
              style={{ cursor: "pointer" }}
            >
              📘 View Marks / Grades
            </Nav.Link>
            <Nav.Link
              eventKey="performance"
              className="text-white"
              style={{ cursor: "pointer" }}
            >
              📊 Graphical Performance Chart
            </Nav.Link>
            <Nav.Link
              eventKey="progress"
              className="text-white"
              style={{ cursor: "pointer" }}
            >
              🟢 Attendance Percentage
            </Nav.Link>
          </Nav>
        </Col>

        {/* Main Content */}
        <Col md={9} lg={10} className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
          {activeSection === "progress" && (
            <Card className="shadow-sm p-4">
              <Card.Title>Attendance Percentage</Card.Title>
              <h5 className="text-center mt-3">{attendancePercentage}%</h5>
              <ProgressBar
                animated
                now={attendancePercentage}
                label={`${attendancePercentage}%`}
                variant={attendancePercentage >= 75 ? "success" : "warning"}
                className="mt-3"
              />
            </Card>
          )}

          {activeSection === "performance" && (
            <Card className="shadow-sm p-4">
              <Card.Title>Performance Chart</Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="subject" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="marks" stroke="#007bff" name="Marks" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          )}

          {activeSection === "attendance" && (
            <Card className="shadow-sm p-4">
              <Card.Title>Attendance History</Card.Title>
              <Table striped bordered hover responsive className="mt-3">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.map((a, index) => (
                    <tr key={index}>
                      <td>{a.date}</td>
                      <td
                        className={
                          a.status === "Present"
                            ? "text-success fw-bold"
                            : "text-danger fw-bold"
                        }
                      >
                        {a.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          )}

          {activeSection === "marks" && (
            <Card className="shadow-sm p-4">
              <Card.Title>Marks & Grades</Card.Title>
              <Table striped bordered hover responsive className="mt-3">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Marks</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {marks.map((m, index) => (
                    <tr key={index}>
                      <td>{m.subject}</td>
                      <td>{m.marks}</td>
                      <td>{m.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default StudentDashboard;
