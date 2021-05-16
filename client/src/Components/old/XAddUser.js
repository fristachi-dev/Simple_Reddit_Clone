// import React, { useState, useContext } from 'react';
// import { UserContext } from './UserContext';
// import axios from 'axios';

// const AddUser = () => {
//     const [name, setName] = useState('');
//     const [changeName, setChangeName] = useState('');
//     const [phone, setPhone] = useState('');
//     const [users, setUsers] = useContext(UserContext);
//     const [age, setAge] = useState('');
//     const [post, setPost] = useState('');
//     const [comment, setComment] = useState('');

//     const updateName = (e) => {
//         setName(e.target.value);
//     }
//     const updateChangeName = (e) => {
//         setChangeName(e.target.value);
//     }
//     const updateAge = (e) => {
//         setAge(e.target.value);
//     }
//     const updatePhone = (e) => {
//         setPhone(e.target.value);
//     }
//     const updatePost = (e) => {
//         setPost(e.target.value);
//     }
//     const updateComment = (e) => {
//         setComment(e.target.value);
//     }

//     const addUser = (e) => {
//         e.preventDefault();
//         setUsers(prevUsers => [...prevUsers, { name: name, phone: phone }]);

//         const user = { content: name }
//         console.log(user)

//         axios.post('http://localhost:5000/users/add', user)
//             .then(res => console.log(res.data));

//     }

//     const newUser = (e) => {
//         e.preventDefault();
//         const user = {
//             username: name,
//             age: age
//         }
//         console.log(user)

//         axios.post('http://localhost:5000/users/add', user)
//             .then(res => console.log(res.data));
//     }

//     const getUsers = (e) => {
//         e.preventDefault();
//         axios.get('http://localhost:5000/users/')
//             .then(res => console.log(res.data));
//     }

//     const updateUser = (e) => {
//         e.preventDefault();
//         const user = {
//             user: name,
//             change: changeName
//         }
//         console.log(user)

//         axios.patch('http://localhost:5000/users/find', user)
//             .then(res => console.log(res.data));
//     }

//     const newPost = (e) => {
//         e.preventDefault();
//         const user = {
//             user: name,
//             post: post
//         }
//         console.log(user)

//         axios.post('http://localhost:5000/users/newpost', user)
//             .then(res => console.log(res.data));
//     }

//     const newComment = (e) => {
//         e.preventDefault();
//         const user = {
//             user: name,
//             post: post,
//             comment: comment
//         }
//         console.log(user)

//         axios.post('http://localhost:5000/users/newcomment', user)
//             .then(res => console.log(res.data));
//     }

//     return (
//         <div>
//             <form onSubmit={addUser}>
//                 <input type="text" name={name} onChange={updateName} />
//                 <br />
//                 <input type="text" name={phone} onChange={updatePhone} />
//                 <button>Submit</button>
//             </form>
//             <br />
//             <button onClick={getUsers}>Get</button>
//             <form style={{ border: "solid blue 4px" }} onSubmit={updateUser}>
//                 <input type="text" name={name} onChange={updateName} />
//                 <input type="text" name={changeName} onChange={updateChangeName} />
//                 <button>Update</button>
//             </form>
//             <form style={{ border: "solid red 4px" }} onSubmit={newUser}>
//                 <input type="text" name={name} onChange={updateName} />
//                 <input type="text" name={age} onChange={updateAge} />
//                 <button>NewUser</button>
//             </form>
//             <form style={{ border: "solid green 4px" }} onSubmit={newPost}>
//                 <input type="text" name={name} onChange={updateName} />
//                 <input type="text" name={post} onChange={updatePost} />
//                 <button>NewPost</button>
//             </form>
//             <form style={{ border: "solid orange 4px" }} onSubmit={newComment}>
//                 <input type="text" name={name} onChange={updateName} />
//                 <input type="text" name={post} onChange={updatePost} />
//                 <input type="text" name={comment} onChange={updateComment} />
//                 <button>NewComment</button>
//             </form>
//         </div>
//     );
// }

// export default AddUser;
