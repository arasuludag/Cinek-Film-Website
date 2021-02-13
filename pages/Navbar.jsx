import React from "react";
import Scroll from "react-scroll";

import { Container } from "@material-ui/core";
import { Navbar, Nav } from "react-bootstrap";

function ShowNavbar(props) {
  return (
    <Container>
      <Navbar collapseOnSelect expand="lg" bg="transparent" variant="dark">
        <Navbar.Brand href="/">
          <img className="logo" src="CİNEK FİLM LOGO.png" alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link
              onClick={() => {
                Scroll.scroller.scrollTo("filmsElement", {
                  smooth: true,
                  duration: 500,
                });
              }}
            >
              Filmler
            </Nav.Link>

            <Nav.Link
              onClick={() => {
                Scroll.scroller.scrollTo("aboutUsElement", {
                  smooth: true,
                  duration: 500,
                });
              }}
            >
              Hakkında
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                Scroll.scroller.scrollTo("teamElement", {
                  smooth: true,
                  duration: 500,
                });
              }}
            >
              Ekip
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                Scroll.scroller.scrollTo("contactElement", {
                  smooth: true,
                  duration: 500,
                });
              }}
            >
              İletişim
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

export default ShowNavbar;
