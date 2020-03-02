import React, { Component } from 'react';
import { Container, Card } from 'react-bootstrap';

export class NoMatchPage extends Component {
    render() {
        return (
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>404 Error</Card.Title>
                        <p>Nothing to see here. Please use the menu to try again.</p>
                    </Card.Body>
                </Card>

            </Container>
        );
    }
}

export default NoMatchPage;