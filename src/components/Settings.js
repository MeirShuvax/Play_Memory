import React from 'react';
import { Button, Form, Container } from 'react-bootstrap';

function Settings({ inputs, setInputs }) {

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(values => ({
            ...values,
            [name]: Number(value)
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const getValidCallsOptions = (roses) => {
        if (roses % 2 === 0) {
            return [2, 3, 4, 5];
        } else {
            return [2, 4];
        }
    }

    const getValidRosesOptions = (calls) => {
        if (calls % 2 === 0) {
            return [2, 3, 4, 5];
        } else {
            return [2, 4];
        }
    }

    const callsOptions = getValidCallsOptions(inputs.NumberOfRoses);
    const rosesOptions = getValidRosesOptions(inputs.NumberOfCalls);

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formRoses">
                    <Form.Label>Number of Roses</Form.Label>
                    <Form.Select
                        name="NumberOfRoses"
                        value={inputs.NumberOfRoses}
                        onChange={handleChange}
                    >
                        {rosesOptions.map(value => (
                            <option key={value} value={value}>{value}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="formCalls">
                    <Form.Label>Number of Calls</Form.Label>
                    <Form.Select
                        name="NumberOfCalls"
                        value={inputs.NumberOfCalls}
                        onChange={handleChange}
                    >
                        {callsOptions.map(value => (
                            <option key={value} value={value}>{value}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="formDelay">
                    <Form.Label>Delay (seconds)</Form.Label>
                    <Form.Select
                        name="Delay"
                        value={inputs.Delay}
                        onChange={handleChange}
                    >
                        {[0.5, 1.0, 1.5, 2.0].map(value => (
                            <option key={value} value={value}>{value}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Form>
        </Container>
    );
}

export default Settings;
