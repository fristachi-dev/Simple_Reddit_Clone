import React, { useState } from "react";
import axios from "axios";
import "../../scss/custom.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";

const SignUp = ({ check }) => {
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

    await axios.post("/api/users/signup", user).then((res) => {
      if (res.data.msg == "User already exist") {
        setErrorMsg(res.data.msg);
      } else {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", res.data.user.username);
        window.location.reload();
      }
    });
  };

  return (
    <Container
      fluid
      className="bg-primary p-0 pb-5 d-flex align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className="d-flex justify-content-center w-100 m-0">
        <Col className="p-0" style={{ maxWidth: "600px" }}>
          <Form onSubmit={addUser} className="bg-light px-3 py-5 px-sm-5">
            <h2 className="mb-4">Sign Up</h2>

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
              Sign Up
            </Button>

            <Link to="/SignIn">Already have an Account? Login Here!</Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;

// import React, { useState, useContext } from 'react';
// import { UserContext } from './UserContext';
// import axios from 'axios';
// import '../../scss/custom.scss';
// import 'bootstrap/dist/css/bootstrap.min.css'
// import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';

// const SignUp = () => {
//     const { updateCon, currentCon, updateCurrentCon } = useContext(UserContext);
//     const [update, setUpdate] = updateCon
//     const [current, setCurrent] = currentCon
//     const [updateCurrent, setUpdateCurrent] = updateCurrentCon

//     const [username, setUser] = useState('');
//     const [pass, setPass] = useState('');

//     const updateUser = (e) => {
//         setUser(e.target.value);
//     }
//     const updatePass = (e) => {
//         setPass(e.target.value);
//     }

//     const addUser = (e) => {
//         e.preventDefault();
//         const user = {
//             username: username,
//             password: pass,
//         }
//         console.log(user)

//         axios.post('http://localhost:5000/users/signup', user)
//             .then(res => {
//                 setUpdate(!update);
//                 //console.log(res.data);
//                 localStorage.setItem("token", res.data.token);
//                 setUpdateCurrent(!updateCurrent);
//                 setUpdate(!update);
//             })
//     }

//     return (
//         <Container fluid className="bg-primary pb-5 d-flex align-items-center" style={{ minHeight: "calc(100vh - 56px)" }}>
//             <Row className="justify-content-md-center w-100">
//                 <Col xs={10} md={7} lg={5}>

//                     <Form onSubmit={addUser} className="bg-light p-5">
//                         <h2 className="mb-4">Sigh Up</h2>

//                         <Form.Label>Username</Form.Label>
//                         <InputGroup className="mb-4">
//                             <InputGroup.Prepend>
//                                 <InputGroup.Text
//                                     className="rounded-0"
//                                     style={{ backgroundColor: "#3AAF83", color: "white" }}
//                                     id="basic-addon1">@</InputGroup.Text>
//                             </InputGroup.Prepend>
//                             <Form.Control
//                                 className="rounded-0"
//                                 type="text"
//                                 name={username}
//                                 onChange={updateUser}
//                             />
//                         </InputGroup>

//                         <Form.Label className="mt-2">Password</Form.Label>
//                         <InputGroup className="mb-4">
//                             <InputGroup.Prepend>
//                                 <InputGroup.Text
//                                     className="rounded-0"
//                                     style={{ backgroundColor: "#3AAF83", color: "white" }}
//                                     id="basic-addon1">@</InputGroup.Text>
//                             </InputGroup.Prepend>
//                             <Form.Control
//                                 className="rounded-0"
//                                 type="text"
//                                 name={pass}
//                                 onChange={updatePass} />
//                         </InputGroup>

//                         <Button className="mt-1 rounded-0" type="submit" block>Sign Up</Button>

//                     </Form>

//                 </Col>
//             </Row>
//         </Container>
//     );
// }

// export default SignUp;
