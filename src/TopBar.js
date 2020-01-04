import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { withRouter } from "react-router-dom";
function TopBar({ location }) {
  return (
    <Navbar bg="topbar" expand="lg" variant="dark">
      <Navbar.Brand href="#home">AlBog's RSS App, CGI Edition</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/" active={location.pathname == "/"}>
            Home
          </Nav.Link>
          <Nav.Link href="/Search" active={location.pathname == "/Search"}>Search</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default withRouter(TopBar);