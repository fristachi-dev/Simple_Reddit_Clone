import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Comment from "../Post/Comment";
import AddComment from "../Post/AddComment";
import Navigation from "../Nav/Nav";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { BiUpvote, BiDownvote } from "react-icons/bi"
import { BsArrowReturnRight } from "react-icons/bs"
import "../../scss/custom.scss";

const Thread = ({ check, theme, darkmode }) => {
  const [thread, setThread] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const data = useLocation();

  const getDate = (newdate) => {
    let date = new Date(newdate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();
    let temp;

    const monthAbb = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dev"];

    if (dt < 10) {
      dt = "0" + dt;
    }

    temp = year.toString();
    year = temp.slice(-2)

    let res = `${monthAbb[month - 1]}. ${dt} '${year}`;
    return res;
  };

  const likePost = async (id) => {
    const user = {
      postid: thread._id,
      user: thread.username,
      current: localStorage.getItem("user"),
    };

    try {
      const req = await axios
        .post("/users/upvote", user, {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        })
        .then((res) => {
          // console.log(res.data.msg)
          getData();
        });
    } catch (err) {
      console.log(err);
    }
  };

  const downVote = async (id) => {
    const user = {
      postid: thread._id,
      user: thread.username,
      current: localStorage.getItem("user"),
    };

    try {
      const req = await axios
        .post("/users/downvote", user, {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        })
        .then((res) => {
          getData();
        });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteComment = async (id) => {
    const user = {
      postid: thread._id,
      user: thread.username,
      commentid: id,
      current: localStorage.getItem("user"),
    };

    try {
      const req = await axios
        .post("/users/deletecomment", user, {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        })
        .then((res) => {
          getData();
          console.log(res.data.msg)
        });
    } catch (err) {
      console.log(err);
    }
  };

  const postArr = (arr) => {
    let temp = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].posts.length; j++) {
        temp.push(arr[i].posts[j]);
      }
    }

    return temp;
  };

  const findThread = (post, id) => {
    const i = post.map((x) => x._id).indexOf(id);
    const temp = post[i];
    return temp;
  };

  const getData = async () => {
    try {
      const res = await axios.get("/users/").then((res) => {
        let temp = postArr(res.data);
        setThread(findThread(temp, data.state.id));
      });
      setLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getData();
  }, []);

  return (
    <Container style={{ minHeight: "calc(100vh)" }}>
      <Navigation
        drop={false}
        check={check}
        theme={theme}
        darkmode={darkmode}
      />

      <Row className="justify-content-md-center mt-5 pt-5">
        <Col
          className={
            "border border-info rounded " +
            (darkmode ? "theme-dark-grey border-warning" : "bg-white")
          }
        >
          {loaded ? (
            <div>
              <Row className="d-flex justify-content-center">
                {/* upvote & downvote */}
                <Col xs={2} md={1} lg={1} className="">
                  {/* back button */}
                  <Row className="mb-5 mt-3" as={Link} to="/">
                    <Col>
                      <BsArrowReturnRight size={36} className="back-arrow" />
                    </Col>
                  </Row>

                  {/* upvote */}
                  <Row>
                    <Col className="d-flex justify-content-center">
                      <BiUpvote
                        className={
                          "arrow-up " +
                          (thread.upVotes.includes(localStorage.getItem("user"))
                            ? "arrow-up-active"
                            : "")
                        }
                        size={29}
                        onClick={() => likePost(thread.id)}
                      />
                    </Col>
                  </Row>

                  {/* vote count */}
                  <Row>
                    <Col className="d-flex justify-content-center pt-2 text-center">
                      <h5>{thread.votes}</h5>
                    </Col>
                  </Row>

                  {/* downvote */}
                  <Row>
                    <Col className="d-flex justify-content-center">
                      <BiDownvote
                        className={
                          "arrow-down " +
                          (thread.downVotes.includes(
                            localStorage.getItem("user")
                          )
                            ? "arrow-down-active"
                            : "")
                        }
                        size={29}
                        onClick={() => downVote(thread.id)}
                      />
                    </Col>
                  </Row>
                </Col>

                <Col className="pl-0">
                  <Row className="mt-3">
                    <Col
                      xs={4}
                      sm={3}
                      md={2}
                      className="d-flex align-items-center justify-content-center pl-4 pr-0 pt-2"
                    >
                      <p
                        className={`fit mb-0 border rounded-pill text-white text-center ${thread.postSubject.replace(
                          /\s+/g,
                          ""
                        )}`}
                        style={{ fontSize: "15px" }}
                      >
                        {thread.postSubject}
                      </p>
                    </Col>

                    <Col className="p-0 pl-3">
                      <p className="mt-3 mb-0 post-header-text">
                        {`Posted by ${thread.username}`}
                        <span className="ml-3 post-header-text">
                          {getDate(thread.date)}
                        </span>
                      </p>
                    </Col>

                  </Row>
                  <Row>
                    <Col>
                      {" "}
                      <h5 className="my-2" style={{ fontSize: "19px" }}>
                        {thread.postTitle}
                      </h5>
                      <p
                        className="my-2 text-dark"
                        style={{ fontSize: "15px" }}
                      >
                        {thread.post}
                      </p>
                      {/* <p>{thread.comments.length} Comments</p> */}
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row>
                <Col>
                  <AddComment
                    key={"addcom" + thread._id}
                    username={thread.username}
                    post={thread.post}
                    getdata={getData}
                    darkmode={darkmode}
                  />
                </Col>
              </Row>

              <hr></hr>

              <Row>
                <Col>
                  {thread.comments.map((item) => (
                    <Comment
                      key={"com" + item._id}
                      commentid={item._id}
                      username={item.username}
                      date={item.date}
                      comment={item.comment}
                      deleteComment={deleteComment}
                      darkmode={darkmode}
                      currentUser={localStorage.getItem("user")}
                    />
                  ))}
                </Col>
              </Row>
            </div>
          ) : (
            <div className="d-flex justify-content-center">
              <Spinner className="my-5" animation="border" />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Thread;
