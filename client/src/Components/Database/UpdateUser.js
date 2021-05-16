import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../scss/custom.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "../Nav/Nav";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { CgArrowsExchangeAlt } from "react-icons/cg";

const UpdateUser = ({ check, theme, darkmode }) => {
  const [users, setUsers] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [username, setUsername] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };
  const updateFname = (e) => {
    setFname(e.target.value);
  };
  const updateLname = (e) => {
    setLname(e.target.value);
  };
  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const populate = (userslist) => {
    if (localStorage.getItem("user")) {
      const i = userslist
        .map((x) => x.username)
        .indexOf(localStorage.getItem("user"));
      setUsername(userslist[i].username);
      setFname(userslist[i].firstName);
      setLname(userslist[i].lastName);
      setEmail(userslist[i].email);
    } else {
      console.log(localStorage.getItem("user"));
    }
  };

  const getData = async () => {
    try {
      const res = await axios
        .get("http://localhost:5000/users/")
        .then((res) => {
          setUsers(res.data);
          populate(res.data);
        });

      setLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const sendUpdate = async (e) => {
    e.preventDefault();
    const user = {
      user: username,
      fname: fname,
      lname: lname,
      email: email,
    };
    console.log(user);

    await axios
      .post("http://localhost:5000/users/update", user, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        getData();
      });
  };

  return (
    <Container
      fluid
      className={
        "p-0 pb-5 d-flex align-items-center " +
        (darkmode ? "theme-dark" : "bg-primary")
      }
      style={{ minHeight: "100vh" }}
    >
      <Row>
        <Col>
          <Navigation
            drop={false}
            check={check}
            darkmode={darkmode}
            theme={theme}
          />
        </Col>
      </Row>
      <Row className="d-flex justify-content-center w-100 m-0">
        <Col className="p-0" style={{ maxWidth: "550px" }}>
          {loaded ? (
            <Form
              onSubmit={sendUpdate}
              className={
                "px-3 py-5 px-sm-5 " +
                (darkmode ? "theme-dark-grey" : "bg-light")
              }
            >
              <h2 className="mb-4">Update user info</h2>

              <Form.Label className="mt-2">First Name</Form.Label>
              <InputGroup className="mb-2">
                <InputGroup.Prepend>
                  <InputGroup.Text
                    className="rounded-0"
                    style={{ backgroundColor: "#1484D6", color: "white" }}
                    id="basic-addon1"
                  >
                    <CgArrowsExchangeAlt size={24} />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  className="rounded-0"
                  type="text"
                  name={fname}
                  value={fname}
                  onChange={updateFname}
                />
              </InputGroup>

              <Form.Label className="mt-2">Last Name</Form.Label>
              <InputGroup className="mb-2">
                <InputGroup.Prepend>
                  <InputGroup.Text
                    className="rounded-0"
                    style={{ backgroundColor: "#1484D6", color: "white" }}
                    id="basic-addon1"
                  >
                    <CgArrowsExchangeAlt size={24} />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  className="rounded-0"
                  type="text"
                  name={lname}
                  value={lname}
                  onChange={updateLname}
                />
              </InputGroup>

              <Form.Label className="mt-2">Email</Form.Label>
              <InputGroup className="mb-2">
                <InputGroup.Prepend>
                  <InputGroup.Text
                    className="rounded-0"
                    style={{ backgroundColor: "#1484D6", color: "white" }}
                    id="basic-addon1"
                  >
                    <CgArrowsExchangeAlt size={24} />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  className="rounded-0"
                  type="text"
                  name={email}
                  value={email}
                  onChange={updateEmail}
                />
              </InputGroup>

              <Button className="mt-5 rounded-0" type="submit" block>
                Change
              </Button>
            </Form>
          ) : (
            <Spinner animation="border" />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateUser;
