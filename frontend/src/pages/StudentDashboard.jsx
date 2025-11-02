import React, { useState, useEffect } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { GraduationCap, Calendar, Award, TrendingUp, Menu, X } from "lucide-react";

const StudentDashboard = () => {
  const [attendance, setAttendance] = useState([]);
  const [marks, setMarks] = useState([]);
  const [attendancePercentage, setAttendancePercentage] = useState(0);
  const [performanceData, setPerformanceData] = useState([]);
  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const attendanceData = [
        { date: "2025-10-25", status: "Present" },
        { date: "2025-10-26", status: "Absent" },
        { date: "2025-10-27", status: "Present" },
        { date: "2025-10-28", status: "Present" },
        { date: "2025-10-29", status: "Present" },
      ];

      const marksData = [
        { subject: "Math", marks: 88, grade: "A" },
        { subject: "Science", marks: 75, grade: "B+" },
        { subject: "English", marks: 92, grade: "A+" },
        { subject: "History", marks: 80, grade: "A" },
      ];

      const performanceChart = [
        { subject: "Math", marks: 88 },
        { subject: "Science", marks: 75 },
        { subject: "English", marks: 92 },
        { subject: "History", marks: 80 },
      ];

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

  const menuItems = [
    { id: "overview", label: "Overview", icon: GraduationCap },
    { id: "attendance", label: "Attendance History", icon: Calendar },
    { id: "marks", label: "Marks & Grades", icon: Award },
    { id: "performance", label: "Performance Chart", icon: TrendingUp },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Attendance Progress */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Attendance Percentage
                </h3>
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-blue-600">{attendancePercentage}%</div>
                  <p className="text-gray-500 text-sm mt-1">Overall Attendance</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full transition-all ${
                      attendancePercentage >= 75 ? "bg-green-500" : "bg-yellow-500"
                    }`}
                    style={{ width: `${attendancePercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  Quick Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Subjects</span>
                    <span className="font-semibold text-lg">{marks.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Average Marks</span>
                    <span className="font-semibold text-lg">
                      {Math.round(marks.reduce((acc, m) => acc + m.marks, 0) / marks.length)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Present Days</span>
                    <span className="font-semibold text-lg">
                      {attendance.filter((a) => a.status === "Present").length}/{attendance.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mini Performance Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Performance Overview
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={performanceData}>
                  <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" />
                  <XAxis dataKey="subject" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="marks" stroke="#2563eb" strokeWidth={2} name="Marks" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        );

      case "attendance":
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-blue-600" />
              Attendance History
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {attendance.map((a, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{a.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            a.status === "Present"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {a.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "marks":
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Award className="w-6 h-6 text-blue-600" />
              Marks & Grades
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Marks
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Grade
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {marks.map((m, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {m.subject}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{m.marks}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {m.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "performance":
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              Performance Chart
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={performanceData}>
                <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" />
                <XAxis dataKey="subject" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="marks" stroke="#2563eb" strokeWidth={3} name="Marks" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } bg-gradient-to-b from-blue-600 to-blue-800 text-white transition-all duration-300 overflow-hidden`}
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="w-8 h-8" />
            <h2 className="text-xl font-bold">Student Portal</h2>
          </div>
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeSection === item.id
                      ? "bg-white text-blue-600 shadow-lg"
                      : "hover:bg-blue-700"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="bg-white shadow-sm p-4 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            {menuItems.find((item) => item.id === activeSection)?.label || "Dashboard"}
          </h1>
        </div>
        <div className="p-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default StudentDashboard;