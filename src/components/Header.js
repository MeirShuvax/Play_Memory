import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

/**
 * A simple static component.
 * @returns {JSX.Element}
 * @constructor
 */
function Header() {
    return (
        <div className="bg-light text-dark py-5 mb-4 border-bottom">
            <Container>
                <Row className="justify-content-center">
                    <Col md={8} className="text-center">
                        <h1 className="display-4">Welcome to the Ultimate Memory Game!</h1>
                        <p className="lead">
                            Test your memory and have fun by clicking on the cards to reveal the hidden pairs. Try to find all the matching pairs with the fewest flips possible.
                        </p>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Outlet />
            </Container>
        </div>
    );
}

export default Header;
