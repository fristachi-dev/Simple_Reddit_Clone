import React, { useState } from "react";
import axios from "axios";
import "../../scss/custom.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";

const SignIn = ({ check }) => {
  const [username, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const updateUser = (e) => {
    setUser(e.target.value);
  };
  const updatePass = (e) => {
    setPass(e.target.value);
  };

  const addUser = async (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: pass,
    };
    console.log(user);

    await axios.post("http://localhost:5000/users/signin", user).then((res) => {
      if (res.data.msg == "user does not exist") {
        setErrorMsg(res.data.msg);
      } else if (res.data.msg == "wrong password") {
        setErrorMsg(res.data.msg);
      } else {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", res.data.user.username);
      }

      check();
    });
  };

  return (
    <Container
      className="bg-primary p-0 pb-5 d-flex align-items-center"
      style={{ minHeight: "100vh" }}
      fluid
    >
      <Row className="d-flex justify-content-center w-100 m-0">
        <Col className="p-0" style={{ maxWidth: "600px" }}>
          <Form onSubmit={addUser} className="bg-light px-3 py-5 px-sm-5">
            <h2 className="mb-4">Sign In</h2>

            <Form.Label>Username</Form.Label>
            <InputGroup className="mb-4">
              <InputGroup.Prepend>
                <InputGroup.Text
                  className="rounded-0 bg-primary text-white"
                  id="basic-addon1"
                >
                  <AiOutlineUser size={20} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                className="rounded-0"
                type="text"
                name={username}
                onChange={updateUser}
              />
            </InputGroup>

            <Form.Label className="mt-2">Password</Form.Label>
            <InputGroup className="mb-4">
              <InputGroup.Prepend>
                <InputGroup.Text
                  className="rounded-0 bg-primary text-white"
                  id="basic-addon1"
                >
                  <RiLockPasswordLine size={20} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                className="rounded-0"
                type="password"
                name={pass}
                onChange={updatePass}
              />
            </InputGroup>

            <p>{errorMsg}</p>

            <Button className="mt-1 mb-3 rounded-0" type="submit" block>
              Sign In
            </Button>

            <Link to="/SignUp">Don't have an Account? Sign Up Here!</Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
