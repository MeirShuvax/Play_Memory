import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Fisher-Yates Shuffle Algorithm
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

// Improved score calculation function
const calculateScore = (numCards, steps) => {
    if (steps === 0) return 0;
    return Math.max(0, Math.round((Math.pow(numCards, 2) * 100) / steps));
};

function Play() {
    const { data, gameData } = useParams();
    const navigate = useNavigate();
    const inputs = JSON.parse(decodeURIComponent(data));
    const initialGameInfo = JSON.parse(decodeURIComponent(gameData));
    const [shuffledImages, setShuffledImages] = useState([]);
    const [revealed, setRevealed] = useState(Array(inputs.NumberOfRoses * inputs.NumberOfCalls).fill(false));
    const [selectedCards, setSelectedCards] = useState([]);
    const [gameInfo, setGameInfo] = useState(initialGameInfo);
    const [cardSize, setCardSize] = useState(0);

    useEffect(() => {
        console.log('Inputs loaded:', inputs);
        console.log('Game Data loaded:', gameInfo);

        // Generate an array with pairs of image indices based on NumberOfRoses * NumberOfCalls / 2
        const numPairs = (inputs.NumberOfRoses * inputs.NumberOfCalls) / 2;
        const imageIndices = [];
        for (let i = 0; i < numPairs; i++) {
            imageIndices.push(i);
            imageIndices.push(i);
        }

        // Shuffle the array once and set it
        const shuffled = shuffleArray(imageIndices);
        setShuffledImages(shuffled);

        // Calculate the card size based on the number of rows and columns
        const calculateCardSize = () => {
            const containerWidth = window.innerWidth * 0.8; // 80% of the window width
            const containerHeight = window.innerHeight * 0.8; // 80% of the window height
            const maxWidth = containerWidth / inputs.NumberOfCalls;
            const maxHeight = containerHeight / inputs.NumberOfRoses;
            setCardSize(Math.min(maxWidth, maxHeight));
        };

        calculateCardSize();
        window.addEventListener('resize', calculateCardSize);

        return () => {
            window.removeEventListener('resize', calculateCardSize);
        };
    }, []); // Empty dependency array to run only once on mount

    const handleCardClick = (index) => {
        if (revealed[index] || selectedCards.length === 2) {
            return;
        }

        const newRevealed = [...revealed];
        newRevealed[index] = true;
        setRevealed(newRevealed);

        const newSelectedCards = [...selectedCards, index];
        setSelectedCards(newSelectedCards);

        if (newSelectedCards.length === 2) {
            // Increment the steps count immediately when two cards are selected
            const updatedSteps = gameInfo.Steps + 1;
            setGameInfo((prevGameInfo) => ({
                ...prevGameInfo,
                Steps: updatedSteps
            }));

            const [firstIndex, secondIndex] = newSelectedCards;

            if (shuffledImages[firstIndex] === shuffledImages[secondIndex]) {
                // Cards match, keep them revealed
                setSelectedCards([]);
                // Check if all cards are revealed
                if (newRevealed.every(card => card === true)) {
                    handleGameOver(updatedSteps);
                }
            } else {
                // Cards don't match, hide them after the delay
                setTimeout(() => {
                    const newRevealed = [...revealed];
                    newRevealed[firstIndex] = false;
                    newRevealed[secondIndex] = false;
                    setRevealed(newRevealed);
                    setSelectedCards([]);
                }, inputs.Delay * 1000); // Convert seconds to milliseconds
            }
        }
    };

    const handleGameOver = (finalSteps) => {
        const numCards = inputs.NumberOfRoses * inputs.NumberOfCalls;

        // Calculate score based on number of steps and number of cards
        const score = calculateScore(numCards, finalSteps);

        const finalGameInfo = {
            ...gameInfo,
            Steps: finalSteps,
            Score: score
        };

        // Save the game result to the leaderboard
        saveToLeaderboard(finalGameInfo);

        console.log('Game Over! Score:', score);

        // Navigate to the leaderboard page
        navigate('/leaderboard');
    };

    const saveToLeaderboard = (gameResult) => {
        let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
        leaderboard.push(gameResult);
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    };

    return (
        <div className="play-container">
            <h1 className="text-center my-4">Memory Game</h1>

            <Container>
                <Row className="justify-content-center mb-3">
                    <Col md={8} className="text-center">
                        <h2 className="mb-3">Game Data</h2>
                        <p><strong>Name:</strong> {gameInfo.Name}</p>
                        <p><strong>Steps:</strong> {gameInfo.Steps}</p>
                        <p><strong>Score:</strong> {gameInfo.Score}</p>
                        <p><strong>Rank:</strong> {gameInfo.Rank}</p>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <div
                        className="d-grid gap-2"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(${inputs.NumberOfCalls}, ${cardSize}px)`,
                            gridTemplateRows: `repeat(${inputs.NumberOfRoses}, ${cardSize}px)`,
                            gap: '10px',
                            width: '100%',
                            justifyContent: 'center'
                        }}
                    >
                        {shuffledImages.map((imageIndex, index) => {
                            const isRevealed = revealed[index];
                            return (
                                <Card
                                    key={index}
                                    className="bg-light text-dark"
                                    onClick={() => handleCardClick(index)}
                                    style={{
                                        cursor: 'pointer',
                                        width: `${cardSize}px`,
                                        height: `${cardSize}px`
                                    }}
                                >
                                    <Card.Img
    variant="top"
    src={isRevealed ? `${process.env.PUBLIC_URL}/images/${imageIndex}.jpg` : `${process.env.PUBLIC_URL}/images/card.jpg`}
    alt="Memory Card"
    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
/>
                                </Card>
                            );
                        })}
                    </div>
                </Row>
            </Container>
        </div>
    );
}

export default Play;