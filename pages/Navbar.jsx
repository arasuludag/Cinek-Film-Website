import React from "react";
import { Container } from "@mui/material";
import { Navbar, Nav } from "react-bootstrap";

function ShowNavbar() {
  function handleClickScroll(section) {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <Container>
      <Navbar collapseOnSelect expand="lg" bg="transparent" variant="dark">
        <Navbar.Brand href="/">
          <img className="logo" src="CİNEK FİLM LOGO.png" alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link onClick={() => handleClickScroll("Filmler")}>
              Filmler
            </Nav.Link>
            <Nav.Link onClick={() => handleClickScroll("About")}>
              Hakkında
            </Nav.Link>
            <Nav.Link onClick={() => handleClickScroll("Team")}>Ekip</Nav.Link>
            <Nav.Link onClick={() => handleClickScroll("Contact")}>
              İletişim
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

export default ShowNavbar;
