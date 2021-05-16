// import React, { useState, createContext, useEffect } from "react";
// import User from "./User";
// import axios from "axios";

// export const UserContext = createContext();

// export const UserProvider = (props) => {
//   const [update, setUpdate] = useState(false);
//   const [current, setCurrent] = useState(false);
//   const [updateCurrent, setUpdateCurrent] = useState(true);
//   const [users, setUsers] = useState([
//     {
//       _id: "",
//       username: "",
//       password: "",
//       firstName: "",
//       lastName: "",
//       posts: [
//         {
//           username: "",
//           post: "",
//           comments: [""],
//         },
//       ],
//     },
//   ]);

//   // const postArr = (users) => {
//   //     let temp = [];
//   //     for (let i = 0; i < users.length; i++) {
//   //         for (let j = 0; j < users[i].posts.length; j++) {
//   //             temp.push(users[i].posts[j])
//   //         }
//   //     }

//   //     return temp;
//   // }

//   const [post, setPost] = useState([]);

//   // useEffect(() => {
//   //     console.log('Get User Hook')
//   //     setCurrent(false)

//   //     async function getData() {
//   //         const res = await axios.get('http://localhost:5000/users/n', {
//   //             headers: {
//   //                 'x-auth-token': localStorage.getItem("token")
//   //             }
//   //         })
//   //         setCurrent(res.data.username)

//   //         return res;
//   //     }
//   //     getData()
//   // }, [updateCurrent])

//   // useEffect(() => {
//   //     console.log('context updated')
//   //     async function getData() {
//   //         const res = await axios.get('http://localhost:5000/users/');
//   //         setUsers([...res.data])
//   //         setPost([...postArr(res.data)])
//   //         return res;
//   //     }

//   //     getData()

//   // }, [update])

//   // useEffect(() => {

//   //     async function getData() {
//   //         await axios.get('http://localhost:5000/users/')
//   //             .then(res => {
//   //                 console.log('context updated')
//   //                 setUsers([...res.data])
//   //                 setPost([...postArr(users)])
//   //             })
//   //     }
//   //     getData()

//   // }, [update])

//   return (
//     <UserContext.Provider
//       value={{
//         usersCon: [users, setUsers],
//         updateCon: [update, setUpdate],
//         currentCon: [current, setCurrent],
//         updateCurrentCon: [updateCurrent, setUpdateCurrent],
//         postCon: [post, setPost],
//       }}
//     >
//       {props.children}
//     </UserContext.Provider>
//   );
// };

// // axios.get('http://localhost:5000/users/')
// // .then(res => console.log(res.data))

// // {
// //     _id: "",
// //     username: "",
// //     firstName: "",
// // }

// // const [update, setUpdate] = useState(true)
// // const [users, setUsers] = useState(
// //     [
// //         {
// //             "_id": "605143c87f0c2930d44e0e9c",
// //             "username": "blondie",
// //             "firstName": "jamse",
// //             "lastName": "frista",
// //             "age": "44",
// //             "posts": [
// //                 {
// //                     "_id": "605143d67f0c2930d44e0e9d",
// //                     "username": "blondie",
// //                     "post": "going to the store",
// //                     "comments": [
// //                         {
// //                             "_id": "605143e07f0c2930d44e0e9e",
// //                             "comment": "commentcommment",
// //                             "date": "2021-03-16T23:48:48.655Z",
// //                             "timestamp": 1615938528655,
// //                             "username": "mart"
// //                         },
// //                         {
// //                             "_id": "605143ee7f0c2930d44e0e9f",
// //                             "comment": "yeeeeet",
// //                             "date": "2021-03-16T23:49:02.862Z",
// //                             "timestamp": 1615938542862,
// //                             "username": "shark"
// //                         }
// //                     ],
// //                     "date": "2021-03-16T23:48:38.129Z",
// //                     "timestamp": 1615938518129
// //                 }
// //             ],
// //             "date": "2021-03-16T23:48:24.857Z",
// //             "timestamp": 1615938504857,
// //             "__v": 3
// //         },
// //         {
// //             "_id": "60527c945dd66561280f8459",
// //             "username": "mart",
// //             "firstName": "mike",
// //             "lastName": "martini",
// //             "age": "32",
// //             "posts": [
// //                 {
// //                     "_id": "60527ca95dd66561280f845a",
// //                     "username": "mart",
// //                     "post": "firstpost",
// //                     "comments": [
// //                         {
// //                             "_id": "60527cc85dd66561280f845c",
// //                             "comment": "commentcomment",
// //                             "date": "2021-03-17T22:03:52.648Z",
// //                             "timestamp": 1616018632648,
// //                             "username": "blondie"
// //                         }
// //                     ],
// //                     "date": "2021-03-17T22:03:21.919Z",
// //                     "timestamp": 1616018601919
// //                 },
// //                 {
// //                     "_id": "60527cb05dd66561280f845b",
// //                     "username": "mart",
// //                     "post": "secondpost",
// //                     "comments": [],
// //                     "date": "2021-03-17T22:03:28.324Z",
// //                     "timestamp": 1616018608324
// //                 }
// //             ],
// //             "date": "2021-03-17T22:03:00.810Z",
// //             "timestamp": 1616018580810,
// //             "__v": 3
// //         },
// //         {
// //             "_id": "60527d305dd66561280f845d",
// //             "username": "shark",
// //             "firstName": "joe",
// //             "lastName": "smoo",
// //             "age": "25",
// //             "posts": [
// //                 {
// //                     "_id": "60527d3c5dd66561280f845e",
// //                     "username": "shark",
// //                     "post": "firstpost",
// //                     "comments": [
// //                         {
// //                             "_id": "60527d4a5dd66561280f845f",
// //                             "comment": "commentcommentcomment",
// //                             "date": "2021-03-17T22:06:02.527Z",
// //                             "timestamp": 1616018762527,
// //                             "username": "blondie"
// //                         }
// //                     ],
// //                     "date": "2021-03-17T22:05:48.769Z",
// //                     "timestamp": 1616018748769
// //                 }
// //             ],
// //             "date": "2021-03-17T22:05:36.782Z",
// //             "timestamp": 1616018736782,
// //             "__v": 2
// //         }
// //     ]
// // );
