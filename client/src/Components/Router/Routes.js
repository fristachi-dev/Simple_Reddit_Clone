import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import UpdateUser from "../Database/UpdateUser";
import PostFeed from "../Database/PostFeed";
import SignUp from "../Database/SignUp";
import SignIn from "../Database/SignIn";
import Thread from "../Database/Thread";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import "../../scss/custom.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const Routes = () => {
  const [users, setUsers] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [checklogin, SetCheckLogIn] = useState(false);
  const [darkmode, setDarkMode] = useState(false);

  const check = () => {
    console.log("loggincheckrun");
    SetCheckLogIn(!checklogin);
  };

  const theme = () => {
    setDarkMode(!darkmode);
  };

  const getData = async () => {
    try {
      const res = await axios
        .get(window.location.host + "/users/")
        // .get("http://localhost:5000/users/")
        .then((res) => {
          setUsers(res.data);
          console.log("fetch");
        });
      setLoaded(true);
    } catch (err) {
      console.log(err);
      localStorage.setItem("token", "");
      localStorage.setItem("user", "");
    }
  };

  const loggedIn = () => {
    // if (users.some((user) => user.username == localStorage.getItem("user"))) {
    //   return true;
    // } else {
    //   return false;
    // }

    return false;
  };

  useEffect(() => {
    localStorage.setItem("sub", "Home");
    getData();
  }, []);

  return (
    <div className={darkmode ? "theme-dark" : "bg-secondary"}>
      {loaded ? (
        <div>
          {/* {loggedIn() ? <Navigation check={check} /> : ""} */}
          <Switch>
            {/* <Route path="/UserList" component={UserList} /> */}
            <Route
              path="/thread/:id"
              render={() =>
                loggedIn() ? (
                  <Thread check={check} theme={theme} darkmode={darkmode} />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route
              path="/UpdateUser"
              render={() =>
                loggedIn() ? (
                  <UpdateUser check={check} darkmode={darkmode} theme={theme} />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route
              exact
              path="/"
              render={() =>
                loggedIn() ? (
                  <PostFeed check={check} theme={theme} darkmode={darkmode} />
                ) : (
                  <Redirect to="/SignUp" />
                )
              }
            />
            <Route
              path="/SignUp"
              render={() =>
                loggedIn() ? <Redirect to="/" /> : <SignUp check={check} />
              }
            />
            <Route
              path="/SignIn"
              render={() =>
                loggedIn() ? <Redirect to="/" /> : <SignIn check={check} />
              }
            />
          </Switch>
        </div>
      ) : (
        <Spinner animation="border" />
      )}
    </div>
  );
};

export default Routes;
