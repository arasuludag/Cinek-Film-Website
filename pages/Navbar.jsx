import React from 'react';
import { Container } from '@mui/material';
import { Navbar, Nav } from 'react-bootstrap';
import Image from 'next/image';

function ShowNavbar() {
	function handleClickScroll(section) {
		const element = document.getElementById(section);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	}

	return (
		<Container>
			<Navbar collapseOnSelect expand="lg" bg="transparent" variant="dark">
				<Navbar.Brand href="/">
					<Image
						width={120}
						height={120}
						objectFit="contain"
						src="/CİNEK FİLM LOGO.png"
						alt="Logo"
					/>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="ml-auto">
						<Nav.Link onClick={() => handleClickScroll('About')}>
							Hakkında
						</Nav.Link>
						<Nav.Link onClick={() => handleClickScroll('Team')}>Ekip</Nav.Link>
						<Nav.Link onClick={() => handleClickScroll('Contact')}>
							İletişim
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</Container>
	);
}

export default ShowNavbar;
