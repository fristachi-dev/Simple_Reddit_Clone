import "bootstrap/dist/css/bootstrap.min.css";
import "../../scss/custom.scss";

const SignOut = ({ check }) => {
  const deleteToken = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("user", false);
    check();
  };

  return (
    <div style={{ lineHeight: "40px" }} onClick={deleteToken}>
      Sign Out
    </div>
  );
};

export default SignOut;
