import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Post from "../Post/Post";
import Navigation from "../Nav/Nav";
import AddPost from "../Post/AddPost";
import "../../scss/custom.scss";

import { Container, Row, Col, Spinner } from "react-bootstrap";

const PostFeed = ({ check, theme, darkmode }) => {
  const [post, setPost] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sub, setSub] = useState(localStorage.getItem("sub"));

  //Pull posts into seperate array
  const postArr = (arr) => {
    let temp = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].posts.length; j++) {
        temp.push(arr[i].posts[j]);
      }
    }

    //Sort post array by upvotes
    temp.sort((a, b) => (a.votes > b.votes ? -1 : b.votes > a.votes ? 1 : 0));

    return temp;
  };

  const changeSub = (newsub) => {
    localStorage.setItem("sub", newsub);
    setSub(newsub);
  };

  const getData = async () => {
    try {
      const res = await axios.get("/users", 
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      
      }).then((res) => {
        setPost(postArr(res.data));
      });
      setLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container className="mt-4 pt-2 pb-5" style={{ minHeight: "100vh" }}>
      <Navigation
        changeSub={changeSub}
        check={check}
        drop={true}
        theme={theme}
        darkmode={darkmode}
      />
      {loaded ? (
        <Row className="justify-content-md-center">
          <Col>
            <Row className="mt-5">
              <AddPost getdata={getData} darkmode={darkmode}></AddPost>
            </Row>
            <Row>
              {post.map((user) => (
                <Post
                  key={"post" + user._id}
                  postid={user._id}
                  username={user.username}
                  postTitle={user.postTitle}
                  postSubject={user.postSubject}
                  post={user.post}
                  date={user.date}
                  comments={user.comments}
                  likes={user.votes}
                  upVotes={user.upVotes}
                  downVotes={user.downVotes}
                  getdata={getData}
                  theme={theme}
                  darkmode={darkmode}
                  visible={
                    sub == "Home"
                      ? true
                      : sub == user.postSubject
                      ? true
                      : false
                  }
                />
              ))}
            </Row>
          </Col>
        </Row>
      ) : (
        <div className="d-flex justify-content-center">
          <Spinner className="mt-5" animation="border" />
      </div>
      )}
    </Container>
  );
};

export default PostFeed;

// const sortArr = (val) => {
//   let col = val;
//   let temp = [];
//   let index = 0;
//   let check = false;
//   let a = [];
//   let b = [];

//   if (val == "Top") {
//     temp = post.sort((a, b) =>
//       a.likes > b.likes ? -1 : b.likes > a.likes ? 1 : 0
//     );
//     setPost([...temp]);
//   } else {
//     post.forEach((x, i) => {
//       if (x.postSubject == col) {
//         temp.unshift(x);
//       } else {
//         temp.push(x);
//       }
//     });

//     temp.forEach((x, i) => {
//       if (x.postSubject == col) {
//         index = i;
//         check = true;
//       }
//     });

//     index++;

//     if (check) {
//       a = temp.slice(0, index);
//       b = temp.slice(index, temp.length);

//       a.sort((a, b) => (a.likes > b.likes ? -1 : b.likes > a.likes ? 1 : 0));
//       b.sort((a, b) => (a.likes > b.likes ? -1 : b.likes > a.likes ? 1 : 0));

//       temp = a.concat(b);
//     } else {
//       console.log(index);
//     }
//     setPost([...temp]);
//   }
// };
