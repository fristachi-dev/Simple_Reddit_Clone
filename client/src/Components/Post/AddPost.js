import React, { useState } from "react";
import axios from "axios";
import "../../scss/custom.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button, Form, Collapse } from "react-bootstrap";

const AddPost = ({ getdata, darkmode }) => {
  const [post, setPost] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postSubject, setPostSubject] = useState("General");
  const [open, setOpen] = useState(false);

  const updatePost = (e) => {
    setPost(e.target.value);
  };
  const updatePostTitle = (e) => {
    setPostTitle(e.target.value);
  };
  const updatePostSubject = (e) => {
    setPostSubject(e.target.value);
  };

  const newPost = async (e) => {
    e.preventDefault();
    const user = {
      username: localStorage.getItem("user"),
      postTitle: postTitle,
      postSubject: postSubject,
      post: post,
    };
    console.log(user);

    const req = await axios
      .post("/users/newpost", user, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        getdata();
      });

    setPost("");
    setPostTitle("");
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col
          xs={12}
          lg={12}
          className={
            "border border-info rounded pt-4 pb-3 " +
            (darkmode ? "theme-dark-grey border-warning" : "bg-white")
          }
        >
          <Form
            onSubmit={newPost}
            onFocus={() => setOpen(!open)}
            onBlur={() => setOpen(!open)}
          >
            <Form.Group>
              <Row>
                <Col xs={12}>
                  <Form.Control
                    type="text"
                    name={postTitle}
                    className={darkmode ? "" : "form-highlight"}
                    onChange={updatePostTitle}
                    placeholder="Create A Post Title..."
                    maxLength="200"
                    style={{ backgroundColor: "#f6f7f8" }}
                    value={postTitle}
                  />
                </Col>
              </Row>
            </Form.Group>
            <Collapse in={open}>
              <Form.Group>
                <Form.Control
                  type="text"
                  name={post}
                  onChange={updatePost}
                  placeholder="Text Body..."
                  as="textarea"
                  rows={3}
                  maxLength="3000"
                  value={post}
                />
                <Row className="pt-3">
                  <Col>
                    <Form.Label>Post Topic</Form.Label>
                  </Col>
                </Row>
                <Row>
                  <Col xs={6}>
                    <Form.Control
                      style={{ maxWidth: "150px" }}
                      as="select"
                      onChange={updatePostSubject}
                    >
                      <option value="General">General</option>
                      <option value="Technology">Technology</option>
                      <option value="World News">World News</option>
                      <option value="Video Games">Video Games</option>
                      <option value="Sports">Sports</option>
                    </Form.Control>
                  </Col>
                  <Col className="pr-sm-5">
                    <Button type="submit" className="rounded-pill float-right">
                      Create New Post
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Collapse>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddPost;
