import React, { useState } from "react";
import axios from "axios";

const GetUser = () => {
  const [name, setName] = useState("");
  const [display, setDisplay] = useState("");

  const updateName = (e) => {
    setName(e.target.value);
  };

  const getUser = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:5000/users/")
      .then((res) => console.log(res.data));
    //.then(res => setDisplay(res.data[0].username));
  };

  const cur = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:5000/users/n", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => console.log(res.data));
  };

  return (
    <div>
      <button onClick={cur}>currentuser</button>
      <form onSubmit={getUser}>
        <input type="text" name={name} onChange={updateName} />
        <br />
        <button>Get User</button>
        <br />
        <p>{display}</p>
      </form>
    </div>
  );
};

export default GetUser;
