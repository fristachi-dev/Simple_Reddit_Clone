import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import UpdateUser from "../Pages/UpdateUser";
import PostFeed from "../Pages/PostFeed";
import SignUp from "../Login/SignUp";
import SignIn from "../Login/SignIn";
import Thread from "../Pages/Thread";
import { Spinner } from "react-bootstrap";
import "../../scss/custom.scss";

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
      const res = await axios.get("/users").then((res) => {
        setUsers(res.data);
        // console.log("fetch users tried");
        // console.log(res.data[0].username);
      });
      setLoaded(true);
    } catch (err) {
      console.log(err);
      localStorage.setItem("token", "");
      localStorage.setItem("user", "");
    }
  };

  const loggedIn = () => {
    for (let user of users) {
      if (user.username == localStorage.getItem("user")) return true;
    }
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
          <Switch>
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
