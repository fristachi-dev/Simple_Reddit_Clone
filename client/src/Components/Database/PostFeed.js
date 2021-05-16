import React, { useState, useEffect } from "react";
import Post from "./Post";
import Navigation from "../Nav/Nav";
import "../../scss/custom.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import AddPost from "./AddPost";
import axios from "axios";

const PostFeed = ({ check, theme, darkmode }) => {
  const [post, setPost] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sub, setSub] = useState(localStorage.getItem("sub"));

  const postArr = (arr) => {
    let temp = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].posts.length; j++) {
        temp.push(arr[i].posts[j]);
      }
    }

    temp.sort((a, b) => (a.likes > b.likes ? -1 : b.likes > a.likes ? 1 : 0));

    return temp;
  };

  const sortArr = (val) => {
    let col = val;
    let temp = [];
    let index = 0;
    let check = false;
    let a = [];
    let b = [];

    if (val == "Top") {
      temp = post.sort((a, b) =>
        a.likes > b.likes ? -1 : b.likes > a.likes ? 1 : 0
      );
      setPost([...temp]);
    } else {
      post.forEach((x, i) => {
        if (x.postSubject == col) {
          temp.unshift(x);
        } else {
          temp.push(x);
        }
      });

      temp.forEach((x, i) => {
        if (x.postSubject == col) {
          index = i;
          check = true;
        }
      });

      index++;

      if (check) {
        a = temp.slice(0, index);
        b = temp.slice(index, temp.length);

        a.sort((a, b) => (a.likes > b.likes ? -1 : b.likes > a.likes ? 1 : 0));
        b.sort((a, b) => (a.likes > b.likes ? -1 : b.likes > a.likes ? 1 : 0));

        temp = a.concat(b);
      } else {
        console.log(index);
      }
      setPost([...temp]);
    }
  };

  const changeSub = (newsub) => {
    localStorage.setItem("sub", newsub);
    setSub(newsub);
  };

  const updateSort = (e) => {
    sortArr(e.target.innerHTML);
  };

  const getData = async () => {
    try {
      const res = await axios.get("/api/users/").then((res) => {
        console.log("yeet");
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
        <Spinner animation="border" />
      )}
    </Container>
  );
};

export default PostFeed;

// let arr = [
// 	{
// 		color: 'red',
// 		likes: 3
// 	},
//   	{
// 		color: 'blue',
// 		likes: 2
// 	},
//   	{
// 		color: 'green',
// 		likes: 1
// 	},
//   	{
// 		color: 'blue',
// 		likes: 5
// 	},
//    {
// 		color: 'blue',
// 		likes: 1
// 	},
// ]

// let col = 'blue'
// let temp = [];
// let index = 0;
// let check = false;
// let a = [];
// let b = [];

// arr.forEach((x,i) => {
// 	if(x.color == col) {
//   	temp.unshift(x)
//   } else {
//   	temp.push(x)
//   }
// })

// temp.forEach((x,i) => {
// if(x.color==col) {
// index=i;
// check = true;
// }
// })

// index++

// if(check) {
// 	a = temp.slice(0, index)
//   b = temp.slice(index, temp.length)

//   a.sort((a, b) => (a.likes > b.likes ? -1 : b.likes > a.likes ? 1 : 0));
// 	b.sort((a, b) => (a.likes > b.likes ? -1 : b.likes > a.likes ? 1 : 0));

// 	temp = a.concat(b)
// } else {
// console.log(index)
// }

// console.log(temp)

// <Container>
// <Row className="border border-info bg-white d-flex justify-content-center rounded-pill">
//   <Col
//     xs={2}
//     className="text-center p-0 d-flex justify-content-center align-items-center"
//   >
//     <span
//       className="pointer align-middle py-2 bg-primary"
//       onClick={updateSort}
//     >
//       Top
//     </span>
//   </Col>
//   <Col
//     xs={2}
//     className="text-center p-0 d-flex justify-content-center align-items-center"
//   >
//     <span
//       className="pointer align-middle w-100 py-2"
//       onClick={updateSort}
//     >
//       General
//     </span>
//   </Col>
//   <Col
//     xs={2}
//     className="text-center p-0 d-flex justify-content-center align-items-center"
//   >
//     <span
//       className="pointer align-middle w-100 py-2"
//       onClick={updateSort}
//     >
//       Tech
//     </span>
//   </Col>
//   <Col
//     xs={2}
//     className="text-center p-0 d-flex justify-content-center align-items-center"
//   >
//     <span
//       className="pointer align-middle w-100 py-2"
//       onClick={updateSort}
//     >
//       World News
//     </span>
//   </Col>
//   <Col
//     xs={2}
//     className="text-center p-0 d-flex justify-content-center align-items-center"
//   >
//     <span
//       className="pointer align-middle w-100 py-2"
//       onClick={updateSort}
//     >
//       Video Games
//     </span>
//   </Col>
//   <Col
//     xs={2}
//     className="text-center p-0 d-flex justify-content-center align-items-center"
//   >
//     <span
//       className="pointer align-middle w-100 py-2"
//       onClick={updateSort}
//     >
//       Sports
//     </span>
//   </Col>
// </Row>
// </Container>

{
  /* <Row className="justify-content-md-center">
<Col xs={12} lg={10}>
  <Tab.Container id="left-tabs-example" defaultActiveKey="Top">
    <Nav
      variant="pills"
      className="flex-row bg-white border border-info rounded-pill"
    >
      <Col className="p-0 ">
        <Nav.Item className="text-center h-100 ">
          <Nav.Link
            className="h-100 px-1"
            eventKey="Top"
            onClick={updateSort}
            style={{
              borderBottomLeftRadius: "800px",
              borderTopLeftRadius: "800px",
            }}
          >
            Top
          </Nav.Link>
        </Nav.Item>
      </Col>
      <Col className="p-0">
        <Nav.Item className="text-center h-100">
          <Nav.Link
            className="h-100 tab-border px-1"
            eventKey="General"
            onClick={updateSort}
          >
            General
          </Nav.Link>
        </Nav.Item>
      </Col>
      <Col className="p-0">
        <Nav.Item className="text-center h-100">
          <Nav.Link
            className="h-100 tab-border px-1"
            eventKey="Technology"
            onClick={updateSort}
          >
            Technology
          </Nav.Link>
        </Nav.Item>
      </Col>
      <Col className="p-0">
        <Nav.Item className="text-center h-100">
          <Nav.Link
            className="h-100 tab-border px-1"
            eventKey="World News"
            onClick={updateSort}
          >
            World News
          </Nav.Link>
        </Nav.Item>
      </Col>
      <Col className="p-0">
        <Nav.Item className="text-center h-100">
          <Nav.Link
            className="h-100 tab-border px-1"
            eventKey="Video Games"
            onClick={updateSort}
          >
            Video Games
          </Nav.Link>
        </Nav.Item>
      </Col>
      <Col className="p-0">
        <Nav.Item className="text-center h-100">
          <Nav.Link
            className="h-100 px-1"
            eventKey="Sports"
            onClick={updateSort}
            style={{
              borderBottomRightRadius: "800px",
              borderTopRightRadius: "800px",
            }}
          >
            Sports
          </Nav.Link>
        </Nav.Item>
      </Col>
    </Nav>
  </Tab.Container>
</Col>
</Row> */
}
