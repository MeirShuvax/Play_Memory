import React from 'react';
import { Table, Container, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Leaderboard() {
    const navigate = useNavigate();
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

    // Sort the leaderboard by score in descending order
    leaderboard.sort((a, b) => b.Score - a.Score);

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col xs={12} md={8}>
                    <h1 className="text-center mb-4">Leaderboard</h1>
                    <Table striped bordered hover responsive className="text-center">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Name</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.map((entry, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{entry.Name}</td>
                                    <td>{entry.Score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="d-grid gap-2">
                        <Button variant="primary" size="lg" onClick={() => navigate('/')}>OK</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Leaderboard;
