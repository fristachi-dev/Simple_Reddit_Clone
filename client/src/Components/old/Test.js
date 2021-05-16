// import React, { useState, useEffect } from "react";
// import "../../scss/custom.scss";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";
// import AddPost from "./AddPost";
// import axios from "axios";

// const Test = () => {
//   //const [users, setUsers] = useContext(UserContext);

//   const [thread, setThread] = useState([]);

//   const postArr = (users) => {
//     let temp = [];
//     for (let i = 0; i < users.length; i++) {
//       for (let j = 0; j < users[i].posts.length; j++) {
//         temp.push(users[i].posts[j]);
//       }
//     }

//     return temp;
//   };

//   useEffect(() => {
//     async function getData() {
//       const res = await axios.get("http://localhost:5000/users/");
//       setThread([...postArr(res.data)]);
//       console.log(thread);
//       console.log("test");
//       return res;
//     }

//     getData();
//   }, []);

//   return (
//     <Container fluid className="bg-primary py-5">
//       <AddPost></AddPost>
//       {/* <Post
//                 key={'post' + thread[0]._id}
//                 postid={thread[0]._id}
//                 username={thread[0].username}
//                 post={thread[0].post}
//                 date={thread[0].date}
//                 comments={thread[0].comments}
//                 likes={thread[0].likes}
//             /> */}
//     </Container>
//   );
// };

// export default Test;
