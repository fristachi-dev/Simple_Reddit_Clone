// import React, { useState, useContext } from 'react';
// import { UserContext } from './UserContext';
// import axios from 'axios';
// import '../../scss/custom.scss';
// import 'bootstrap/dist/css/bootstrap.min.css'
// import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';

// const UpdateUser = () => {
//     const { updateCon, currentCon } = useContext(UserContext);
//     const [update, setUpdate] = updateCon
//     const [current, setCurrent] = currentCon

//     const [username, setUsername] = useState('');
//     const [fname, setFname] = useState('');
//     const [lname, setLname] = useState('');

//     const updateUsername = (e) => {
//         setUsername(e.target.value);
//     }
//     const updateFname = (e) => {
//         setFname(e.target.value);
//     }
//     const updateLname = (e) => {
//         setLname(e.target.value);
//     }

//     const updateUser = (e) => {
//         e.preventDefault();
//         const user = {
//             user: username,
//             fname: fname
//         }
//         console.log(user)

//         axios.patch('http://localhost:5000/users/update', user)
//             .then(res => console.log(res.data));
//     }

//     return (
//         <Container fluid className="bg-primary pb-5 d-flex align-items-center" style={{ minHeight: "calc(100vh - 56px)" }}>
//             <Row className="justify-content-md-center w-100">
//                 <Col xs={10} md={7} lg={5}>

//                     <Form onSubmit={updateUser} className="bg-light p-5">
//                         <h2 className="mb-4">Update</h2>

//                         <Form.Label>Username</Form.Label>
//                         <InputGroup className="mb-2">
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
//                                 onChange={updateUsername}
//                             />
//                         </InputGroup>

//                         <Form.Label className="mt-2">First Name</Form.Label>
//                         <InputGroup className="mb-2">
//                             <InputGroup.Prepend>
//                                 <InputGroup.Text
//                                     className="rounded-0"
//                                     style={{ backgroundColor: "#3AAF83", color: "white" }}
//                                     id="basic-addon1">@</InputGroup.Text>
//                             </InputGroup.Prepend>
//                             <Form.Control
//                                 className="rounded-0"
//                                 type="text"
//                                 name={fname}
//                                 onChange={setFname} />
//                         </InputGroup>

//                         <Form.Label className="mt-2">Last Name</Form.Label>
//                         <InputGroup className="mb-2">
//                             <InputGroup.Prepend>
//                                 <InputGroup.Text
//                                     className="rounded-0"
//                                     style={{ backgroundColor: "#3AAF83", color: "white" }}
//                                     id="basic-addon1">@</InputGroup.Text>
//                             </InputGroup.Prepend>
//                             <Form.Control
//                                 className="rounded-0"
//                                 type="text"
//                                 name={lname}
//                                 onChange={setLname} />
//                         </InputGroup>

//                         <Form.Label className="mt-2">Last Name</Form.Label>
//                         <InputGroup className="mb-2">
//                             <InputGroup.Prepend>
//                                 <InputGroup.Text
//                                     className="rounded-0"
//                                     style={{ backgroundColor: "#3AAF83", color: "white" }}
//                                     id="basic-addon1">@</InputGroup.Text>
//                             </InputGroup.Prepend>
//                             <Form.Control
//                                 className="rounded-0"
//                                 type="text"
//                                 name={lname}
//                                 onChange={setLname} />
//                         </InputGroup>

//                         <Form.Label className="mt-2">Last Name</Form.Label>
//                         <InputGroup className="mb-2">
//                             <InputGroup.Prepend>
//                                 <InputGroup.Text
//                                     className="rounded-0"
//                                     style={{ backgroundColor: "#3AAF83", color: "white" }}
//                                     id="basic-addon1">@</InputGroup.Text>
//                             </InputGroup.Prepend>
//                             <Form.Control
//                                 className="rounded-0"
//                                 type="text"
//                                 name={lname}
//                                 onChange={setLname} />
//                         </InputGroup>

//                         <Button className="mt-5 rounded-0" type="submit" block>Change</Button>

//                     </Form>

//                 </Col>
//             </Row>
//         </Container>
//     );
// }

// export default UpdateUser;
