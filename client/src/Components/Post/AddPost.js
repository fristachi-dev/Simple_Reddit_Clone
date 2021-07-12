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
            "border border-info rounded pt-4 pb-0 " +
            (darkmode ? "theme-dark-grey border-warning" : "bg-white")
          }
        >
          <Form
            onSubmit={newPost}
            onFocus={() => setOpen(!open)}
            onBlur={() => setOpen(!open)}
          >

            {/* post title */}
            <Form.Group className="">
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
            
            {/* collapsible */}
            <Collapse in={open} className="">
              <Form.Group>

                <Row>
                  <Col>
                    <Form.Control
                    className="create-post-body"
                    type="text"
                    name={post}
                    onChange={updatePost}
                    placeholder="Text Body..."
                    as="textarea"
                    rows={3}
                    maxLength="3000"
                    value={post}
                  />
                  </Col>
                </Row>

                <Row className="create-post-footer " 
                  style={{margin: "0px 0px", minHeight: "40px"}}
                >

                  <Col className="py-1" style={{maxWidth: "fit-content"}}>
                    <Form.Label className="m-0" style={{lineHeight:"31px"}}>Post Topic: </Form.Label>
                  </Col>

                  <Col className="pl-0 py-1">
                    <Form.Control
                      className="create-post-dropdown pt-1"
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

                  <Col className="py-1">
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
