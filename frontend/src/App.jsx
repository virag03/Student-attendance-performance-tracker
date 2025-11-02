import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Register from "./pages/Register";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/admin"
            element={
              // <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/teacher"
            element={
              // <ProtectedRoute allowedRoles={["teacher"]}>
                <TeacherDashboard />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/student"
            element={
              // <ProtectedRoute allowedRoles={["student"]}>
                <StudentDashboard />
              // </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
