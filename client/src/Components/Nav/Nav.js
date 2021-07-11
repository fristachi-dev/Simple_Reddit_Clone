import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignOut from "../Login/SignOut";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { CgFeed } from "react-icons/cg";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import "../../scss/custom.scss";
import logo from "../../logo.png"

const Navigation = ({ check, changeSub, drop, theme, darkmode }) => {
  const [sub, setSub] = useState(localStorage.getItem("sub"));

  return (
    <Navbar
      fixed="top"
      expand="sm"
      className={"border-bottom " + (darkmode ? "theme-dark-grey border-warning" : "bg-white border-info")}
    >
      <Container className="p-0 align-items-start">
        <Navbar.Brand
          className="p-0"
          as={Link}
          to="/"
          style={{ fontWeight: "400", fontSize: "26px" }}
        >
          <img src={logo} height={30} className="mr-2"/>
          <span className="d-none d-sm-inline" style={{ fontWeight: "400", fontSize: "26px" }}>Threadit</span>
        </Navbar.Brand>

        {drop ? (
          <NavDropdown title={sub} id="nav-dropdown" className="nav-subject-drop">
            <NavDropdown.Item
              onClick={() => {
                changeSub("Home");
                setSub("Home");
              }}
            >
              Home
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => {
                changeSub("General");
                setSub("General");
              }}
            >
              General
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item
              onClick={() => {
                changeSub("Technology");
                setSub("Technology");
              }}
            >
              Technology
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => {
                changeSub("World News");
                setSub("World News");
              }}
            >
              World News
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => {
                changeSub("Video Games");
                setSub("Video Games");
              }}
            >
              Video Games
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => {
                changeSub("Sports");
                setSub("Sports");
              }}
            >
              Sports
            </NavDropdown.Item>
          </NavDropdown>
        ) : (
          ""
        )}

        <Nav className="flex-row">
          {/* <Nav.Item>
            <Nav.Link className="p-0 mr-3" as={Link} to="/">
              <CgFeed size={38} />
            </Nav.Link>
          </Nav.Item> */}

          <Nav style={{ maxWidth: "200px" }}>
            <Nav.Item className="mr-2 d-none d-sm-block">
              <BootstrapSwitchButton
                onChange={theme}
                checked={darkmode}
                onlabel="Dark"
                offlabel="Light"
                width={80}
                height={30}
              />
            </Nav.Item>

            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              className={darkmode ? "theme-dark-grey" : "bg-white"}
            />
            
            <Navbar.Collapse
              className={darkmode ? "theme-dark-grey" : "bg-white"}
              id="basic-navbar-nav"
              style={{ maxWidth: "200px" }}
            >
              {/* <Nav.Item
                className="d-block d-sm-none"
                as={Link}
                to="/UpdateUser"
                style={{ lineHeight: "40px" }}
              >
                Settings
              </Nav.Item> */}

              <Nav.Item className="mr-2 d-block d-sm-none">
                <BootstrapSwitchButton
                  onChange={theme}
                  checked={darkmode}
                  onlabel="Dark"
                  offlabel="Light"
                  width={80}
                  height={30}
                />
              </Nav.Item>

              <Nav.Item className="d-block d-sm-none">
                <SignOut check={check} />
              </Nav.Item>

            </Navbar.Collapse>

            <NavDropdown
              className="nav-highlight d-none d-sm-block text-dark "
              title={localStorage.getItem("user")}
              id="nav-dropdown"
            >
              {/* <NavDropdown.Item
                as={Link}
                to="/UpdateUser"
                style={{ lineHeight: "40px" }}
              >
                Settings
              </NavDropdown.Item> */}
              <NavDropdown.Item eventKey="2.1">
                <SignOut check={check} />
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;
