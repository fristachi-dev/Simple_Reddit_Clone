import React, { useState } from "react";
import axios from "axios";
import "../../scss/custom.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const AddComment = ({ username, post, getdata, darkmode }) => {
  const [comment, setComment] = useState("");

  const updateComment = (e) => {
    setComment(e.target.value);
  };

  const newComment = async (e) => {
    e.preventDefault();
    const user = {
      user: username,
      post: post,
      commentuser: localStorage.getItem("user"),
      comment: comment,
    };
    console.log(user);

    await axios
      .post("/users/newcomment", user, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        getdata();
      });

    setComment("");
  };

  return (
    <Container className="mt-4">
      <Row className="d-flex align-items-center justify-content-center">
        <Col xs={12} sm={11} md={10}>
          <Form onSubmit={newComment}>
            <Form.Group>
              <Form.Label>
                {`Comment as ${localStorage.getItem("user")}`}
              </Form.Label>
              <Form.Control
                type="text"
                name={comment}
                onChange={updateComment}
                placeholder="What are your thoughts?"
                as="textarea"
                rows={3}
                maxLength="3000"
                className={darkmode ? "theme-dark-grey" : "bg-white"}
                value={comment}
              />
            </Form.Group>
            <Button type="submit" className="rounded-pill float-right">
              Comment
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddComment;
