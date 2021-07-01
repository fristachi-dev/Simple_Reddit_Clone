import "../../scss/custom.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

const Comment = ({ commentid, username, date, comment, deleteComment, darkmode, currentUser }) => {
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

  const getId = () => {
    deleteComment(commentid)
  }

  return (
    <Container
      className={
        "border border-light rounded p-3 my-3 " +
        (darkmode ? "theme-dark-grey" : "bg-light")
      }
    >
      <Row>
        <Col>
          <span
            style={{
              fontWeight: "500",
              fontSize: "18px",
            }}
          >
            {username}
          </span>
          <span
            className="ml-2"
            style={{
              fontSize: "12px",
              color: "#777",
            }}
          >
            {getDate(date)}
          </span>
          {currentUser == username ? (
            <span
              className="float-right delete-comment"
              onClick={getId}
            >
              delete
            </span>
          ) : (
            <div></div>
          )}
          <p className="mx-1 my-2">{comment}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Comment;
