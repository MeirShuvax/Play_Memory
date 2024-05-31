import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function HighScore({ show, handleClose }) {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

    // Sort the leaderboard by score in descending order
    leaderboard.sort((a, b) => b.Score - a.Score);

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>High Scores</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover>
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
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default HighScore;
