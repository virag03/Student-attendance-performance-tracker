import { useState } from "react";
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      setMessage("Login successful!");
      window.location.href = "/student"; // Redirect to homepage or dashboard
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={4}>
          <Card className="shadow p-4">
            <h2 className="text-center mb-4">Sign In</h2>
            {message && (
              <Alert
                variant={message === "Login successful!" ? "success" : "danger"}
              >
                {message}
              </Alert>
            )}
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>
            </Form>

            <div className="text-center mt-3">
              <a href="/register">Don't have an account? Register</a>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
