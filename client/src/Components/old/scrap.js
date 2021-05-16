// const addComment = async (e) => {
//     e.preventDefault();
//     const user = {
//         user: username,
//         post: post,
//         comment: newcomment
//     }
//     console.log(user)

//     await axios.post('http://localhost:5000/users/newcomment', user, {
//         headers: {
//             'x-auth-token': localStorage.getItem("token")
//         }
//     })
//         .then(res => {
//             console.log(res.data);
//             setUpdate(!update);
//         })
// }

{
  /* {comments.map((item) => (
                          <Comment
                              key={'com' + item._id}
                              username={item.username}
                              date={item.date}
                              comment={item.comment}
                          />
                      ))} */
}
{
  /* <AddComment
                          key={'addcom' + postid}
                          username={username}
                          post={post}
                      /> */
}

// import React, { useState, useContext, useEffect } from 'react';
// import { UserContext } from './UserContext';
// import axios from 'axios';
// import '../../scss/custom.scss'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import { Container, Row, Col, Form, Collapse, Button } from 'react-bootstrap';
// import like from '../../Assets/thumbs-up.png';
// import Comment from './Comment';
// import AddComment from './AddComment';
// import Post from './Post';
// import { useParams } from 'react-router';

// const Thread = () => {
//     const { updateCon, currentCon, usersCon, postCon } = useContext(UserContext);
//     const [post, setPost] = postCon
//     const [update, setUpdate] = updateCon
//     const [current, setCurrent] = currentCon
//     const [users, setUsers] = usersCon

//     const [newcomment, setNewComment] = useState('');

//     const { id } = useParams();

//     const getDate = (newdate) => {
//         let date = new Date(newdate);
//         let year = date.getFullYear();
//         let month = date.getMonth() + 1;
//         let dt = date.getDate();

//         if (dt < 10) {
//             dt = '0' + dt;
//         }
//         if (month < 10) {
//             month = '0' + month;
//         }

//         let res = (`${dt}-${month}-${year}`);
//         return res;
//     }

//     const populateThread = () => {
//         const i = post.map(x => x._id).indexOf(id)
//         const temp = post[i]
//         return temp;
//     }
//     const [thread, setThread] = useState(users[0].posts[0]);

//     // useEffect(() => {
//     //     populateThread();
//     // }, [])

//     const likePost = async (id) => {
//         const user = {
//             postid: thread.id,
//             user: thread.username,
//             current: current
//         }
//         //console.log(user)

//         const req = await axios.post('http://localhost:5000/users/likepost', user, {
//             headers: {
//                 'x-auth-token': localStorage.getItem("token")
//             }
//         })
//         console.log('likedpost')
//         console.log(req.data)
//         setUsers([...req.data])
//         setUpdate(!update)
//         return req;

//     }

//     return (
//         <Container>
//             <Row className="justify-content-md-center my-4">
//                 <Col xs={8} lg={6} className="border border-primary rounded px-4 bg-white">
//                     <h4 className="mt-3 mb-0">{thread.username}</h4>
//                     <span style={{
//                         fontSize: "14px",
//                         color: "#777"
//                     }}>{getDate(thread.date)}</span>
//                     <br />
//                     <p className="my-1" style={{
//                         fontSize: "18px",
//                     }}>{thread.post}</p>
//                     <span>{thread.likes}</span>
//                     <Button onClick={() => likePost(thread.id)}>Like</Button>
//                     {thread.comments.map((item) => (
//                         <Comment
//                             key={'com' + item._id}
//                             username={item.username}
//                             date={item.date}
//                             comment={item.comment}
//                         />
//                     ))}
//                     <AddComment
//                         key={'addcom' + thread.postid}
//                         username={thread.username}
//                         post={thread.post}
//                     />
//                 </Col>
//             </Row>
//         </Container>
//     );
// }

// export default Thread;
