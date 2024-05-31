import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Form, Row, Col, Alert } from 'react-bootstrap';
import Settings from './Settings';
import HighScore from './HighScore';

function Home() {
    const [inputs, setInputs] = useState({
        NumberOfRoses: 4,
        NumberOfCalls: 4,
        Delay: 1
    });

    const [gameData, setGameData] = useState({
        Name: '',
        Steps: 0,
        Score: 0,
        Rank: ''
    });

    const [encodedInputs, setEncodedInputs] = useState('');
    const [encodedGameData, setEncodedGameData] = useState('');
    const [showSettings, setShowSettings] = useState(false);
    const [showHighScore, setShowHighScore] = useState(false);
    const [nameError, setNameError] = useState('');

    useEffect(() => {
        const encodedInputs = encodeURIComponent(JSON.stringify(inputs));
        setEncodedInputs(encodedInputs);
    }, [inputs]);

    useEffect(() => {
        const encodedGameData = encodeURIComponent(JSON.stringify(gameData));
        setEncodedGameData(encodedGameData);
    }, [gameData]);

    const toggleSettings = () => {
        setShowSettings(prevShowSettings => !prevShowSettings);
    }

    const toggleHighScore = () => {
        setShowHighScore(prevShowHighScore => !prevShowHighScore);
    }

    const handleNameChange = (event) => {
        setGameData(prevGameData => ({
            ...prevGameData,
            Name: event.target.value
        }));
    }

    const navigate = useNavigate();

    const validateName = (name) => {
        const trimmedName = name.trim();
        const isValid = /^[a-zA-Z0-9]{1,12}$/.test(trimmedName);
        return isValid;
    }

    const handlePlayClick = () => {
        const trimmedName = gameData.Name.trim().toLowerCase();
        if (!validateName(trimmedName)) {
            setNameError("Name is required and must be 1-12 letters/digits only.");
            return;
        }
        setNameError('');
        setGameData(prevGameData => ({
            ...prevGameData,
            Name: trimmedName
        }));
        navigate(`/play/${encodedInputs}/${encodedGameData}`);
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h1 className="text-center mb-4">Memory Game</h1>
                    <Form>
                        <Form.Group controlId="playerName" className="mb-3">
                            <Form.Label>Player Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                value={gameData.Name}
                                onChange={handleNameChange}
                                isInvalid={!!nameError}
                            />
                            <Form.Control.Feedback type="invalid">
                                {nameError}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                    <div className="d-grid gap-2">
                        <Button variant="primary" onClick={toggleSettings}>
                            Settings
                        </Button>
                        <Button
                            variant="success"
                            onClick={handlePlayClick}
                        >
                            Play
                        </Button>
                        <Button variant="info" onClick={toggleHighScore}>
                            High Score
                        </Button>
                    </div>
                </Col>
            </Row>
            {showSettings && (
                <Row className="justify-content-md-center mt-4">
                    <Col md={6}>
                        <Settings inputs={inputs} setInputs={setInputs} />
                    </Col>
                </Row>
            )}
            <HighScore show={showHighScore} handleClose={toggleHighScore} />
        </Container>
    );
}

export default Home;
