import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AddUser = () => {
  const { updateCon } = useContext(UserContext);
  const [update, setUpdate] = updateCon;

  const [username, setUser] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [age, setAge] = useState("");
  const [display, setDisplay] = useState("");

  const updateUser = (e) => {
    setUser(e.target.value);
  };
  const updateFname = (e) => {
    setFname(e.target.value);
  };
  const updateLname = (e) => {
    setLname(e.target.value);
  };
  const updateAge = (e) => {
    setAge(e.target.value);
  };

  const addUser = (e) => {
    e.preventDefault();
    const user = {
      username: username,
      fname: fname,
      lname: lname,
      age: age,
    };
    console.log(user);

    axios.post("/users/add", user).then((res) => {
      console.log(res.data);
      setUpdate(!update);
    });
  };

  return (
    <div>
      <form onSubmit={addUser}>
        <label>Username</label>
        <br />
        <input type="text" name={username} onChange={updateUser} />
        <br />
        <label>First Name</label>
        <br />
        <input type="text" name={fname} onChange={updateFname} />
        <br />
        <label>Last Name</label>
        <br />
        <input type="text" name={lname} onChange={updateLname} />
        <br />
        <label>Age</label>
        <br />
        <input type="text" name={age} onChange={updateAge} />
        <br />
        <button>Add User</button>
        <br />
        <p>{display}</p>
      </form>
    </div>
  );
};

export default AddUser;
