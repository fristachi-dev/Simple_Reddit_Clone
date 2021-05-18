import axios from "axios";
import "../../scss/custom.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ImArrowUp, ImArrowDown } from "react-icons/im";

const Post = ({
  postid,
  username,
  post,
  date,
  likes,
  comments,
  getdata,
  postTitle,
  postSubject,
  visible,
  theme,
  darkmode,
}) => {
  const getDate = (newdate) => {
    let date = new Date(newdate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }

    let res = `${dt}-${month}-${year}`;
    return res;
  };

  const likePost = async (id) => {
    const user = {
      postid: id,
      user: username,
      current: localStorage.getItem("user"),
    };
    //console.log(user)

    const req = await axios
      .post("/users/upvote", user, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        getdata();
      });
  };

  const downVote = async (id) => {
    const user = {
      postid: id,
      user: username,
      current: localStorage.getItem("user"),
    };
    //console.log(user)

    const req = await axios
      .post("/users/downvote", user, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        getdata();
      });
  };

  return (
    <div className="w-100">
      {visible ? (
        <Container className="mt-3">
          <Row className="justify-content-center">
            <Col
              xs={12}
              lg={12}
              className={
                "border rounded " +
                (darkmode
                  ? "theme-dark-grey border-warning border-highlight-dark"
                  : "bg-white border-info border-highlight")
              }
            >
              <Row className="d-flex align-items-center justify-content-center">
                <Col xs={2} md={1} lg={1}>
                  <Row>
                    <Col className="d-flex justify-content-center">
                      <ImArrowUp
                        className="arrow"
                        size={24}
                        onClick={() => likePost(postid)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col className="d-flex justify-content-center pt-2 text-center">
                      <h5 style={{ userSelect: "none" }}>{likes}</h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="d-flex justify-content-center">
                      <ImArrowDown
                        className="arrow"
                        size={24}
                        onClick={() => downVote(postid)}
                      />
                    </Col>
                  </Row>
                </Col>

                <Col className="pl-0">
                  <Link
                    className="text-decoration-none"
                    to={{
                      pathname: `/thread/${postid}`,
                      state: { id: postid },
                    }}
                  >
                    <Row>
                      <Col
                        xs={4}
                        md={3}
                        xl={2}
                        className="d-flex align-items-center justify-content-center pl-4 pr-0 pt-2"
                      >
                        <p
                          className={`fit mb-0 border rounded-pill text-white text-center ${postSubject.replace(
                            /\s+/g,
                            ""
                          )}`}
                          style={{ fontSize: "15px" }}
                        >
                          {postSubject}
                        </p>
                      </Col>
                      <Col className="p-0 pl-3">
                        <p className="mt-3 mb-0">
                          {`Posted by ${username}`}
                          <span
                            className="ml-3 text-dark"
                            style={{ fontSize: "14px" }}
                          >
                            {getDate(date)}
                          </span>
                        </p>
                      </Col>
                    </Row>
                    <h5 className="my-2" style={{ fontSize: "19px" }}>
                      {`${postTitle.substring(0, 200)}`}
                    </h5>
                    <p className="my-2 text-dark" style={{ fontSize: "15px" }}>
                      {`${post.substring(0, 300)}...`}
                    </p>
                    <p>{comments.length} Comments</p>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      ) : (
        ""
      )}
    </div>
  );
};

export default Post;

{
  /* <Container>
<Row className="justify-content-md-center my-4">
    <Col xs={8} lg={6} className="border border-primary rounded px-4 bg-white">
        <h4 className="mt-3 mb-0">{username}</h4>
        <span style={{
            fontSize: "14px",
            color: "#777"
        }}>{getDate(date)}</span>
        <br />
        <p className="my-1" style={{
            fontSize: "18px",
        }}>{post}</p>
        <span>{likes}</span>
        <Button onClick={() => likePost(postid)}>Like</Button>
        {comments.map((item) => (
            <Comment
                key={'com' + item._id}
                username={item.username}
                date={item.date}
                comment={item.comment}
            />
        ))}
        <AddComment
            key={'addcom' + postid}
            username={username}
            post={post}
        />
    </Col>
</Row>
</Container> */
}
