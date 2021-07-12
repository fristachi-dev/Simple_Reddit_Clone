import "../../scss/custom.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

const Comment = ({ commentid, username, date, comment, deleteComment, darkmode, currentUser }) => {
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

  const getId = () => {
    deleteComment(commentid)
  }

  return (
    <Container
      className={
        "px-3 pb-2 my-3 " +
        (darkmode ? "theme-dark-grey" : "bg-white")
      }
    >

      <Row className="py-2 comment-head">
        <Col>

          <span className="text-head">
            {username}
          </span>

          <span className="ml-2 post-header-text">
            {getDate(date)}
          </span>

          {currentUser == username ? (
            <span
              className="float-right pt-1 delete-comment"
              onClick={getId}
            >
              delete
            </span>
          ) : (
            <div></div>
          )}
          
        </Col>
      </Row>

      <Row className="comment-body">
        <Col>
          <p className="mx-1 my-2 text-body">{comment}</p>
        </Col>
      </Row>

    </Container>
  );
};

export default Comment;
