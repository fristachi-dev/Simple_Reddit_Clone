import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiMessage, BiUpvote, BiDownvote } from "react-icons/bi"
import "../../scss/custom.scss";

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
  upVotes,
  downVotes
}) => {

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
      postid: id,
      user: username,
      current: localStorage.getItem("user"),
    };

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

  const deletePost = async (e) => {
    e.preventDefault();
    const user = {
      postid: postid,
      user: username,
      current: localStorage.getItem("user"),
    };

    try {
      const req = await axios
        .post("/users/deletepost", user, {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        })
        .then((res) => {
          getdata();
          console.log(res.data.msg)
        });
    } catch (err) {
      console.log(err);
    }
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
              <Row className="d-flex align-items-center justify-content-center mb-1">
                
                {/* upvote & downvote */}
                <Col xs={2} md={1} lg={1} >
              
                  {/* upvote */}
                  <Row>
                    <Col className="d-flex justify-content-center">
                      <BiUpvote
                        className={"arrow-up " +
                          (upVotes.includes(localStorage.getItem("user")) ? "arrow-up-active" : "")
                        }
                        size={29}
                        onClick={() => likePost(postid)}
                      />
                    </Col>
                  </Row>

                  {/* vote count */}
                  <Row>
                    <Col className="d-flex justify-content-center pt-2 text-center">
                      <h5 style={{ userSelect: "none" }}>{likes}</h5>
                    </Col>
                  </Row>

                  {/* downvote */}
                  <Row>
                    <Col className="d-flex justify-content-center">
                      <BiDownvote
                        className={"arrow-down " + 
                          (downVotes.includes(localStorage.getItem("user")) ? "arrow-down-active" : "")
                        }
                        size={29}
                        onClick={() => downVote(postid)}
                      />
                    </Col>
                  </Row>

                </Col>

                {/* post main */}
                <Col className="pl-0">

                  {/* link to thread */}
                  <Row>
                    <Col>
                      <Link
                        className="text-decoration-none"
                        to={{
                          pathname: `/thread/${postid}`,
                          state: { id: postid },
                        }}
                      >

                        {/* post header */}
                        <Row>

                          {/* post subject tag */}
                          <Col
                            xs={4}
                            sm={3}
                            md={2}
                            className="d-flex align-items-center justify-content-center pl-0 pr-0 pt-2"
                          >
                            <p
                              className={`text-pill mb-0 border rounded-pill text-white text-center ${postSubject.replace(
                                /\s+/g,
                                ""
                              )}`}
                            
                            >
                              {postSubject}
                            </p>
                          </Col>

                          {/* post user & date */}
                          <Col className="p-0 pl-2">
                            <p className="mt-3 mb-0 post-header-text">
                              {`Posted by ${username}`}
                              <span
                                className="ml-3 post-header-text"
                              >
                                {getDate(date)}
                              </span>
                            </p>
                          </Col>
                        
                        </Row>

                        {/* post title & body */}
                        <h5 className="my-2 text-head">
                          {`${postTitle.substring(0, 200)}`}
                        </h5>
                        <p className="my-2 text-dark text-body">
                          {`${post.substring(0, 300)}...`}
                        </p>

                      </Link>
                    </Col>
                  </Row>

                  {/* post footer */}
                  <Row>
                    <Col className="post-footer">

                      {/* comments */}
                      <Link
                        className="text-decoration-none"
                        to={{
                          pathname: `/thread/${postid}`,
                          state: { id: postid },
                        }}
                      >
                        <p className="float-left rounded-sm px-2 mr-1 mb-0 text-dark btn-comments">
                          <BiMessage size={24}/> {comments.length} Comments
                        </p>
                      </Link>

                      {/* options */}
                      <Dropdown className="float-left rounded-sm">
                        <Dropdown.Toggle className="text-dark drop-options" variant="white" id="dropdown-basic">
                          Options
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item >Report</Dropdown.Item>
                          {localStorage.getItem("user") == username ? (
                          <Dropdown.Item onClick={deletePost} >Delete</Dropdown.Item>
                          ) : (
                            <div></div>
                          )}
                        </Dropdown.Menu>
                      </Dropdown>
                      
                    </Col>
                  </Row>

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
