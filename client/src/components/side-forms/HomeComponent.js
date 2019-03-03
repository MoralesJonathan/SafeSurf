import React from "react";
import { Container, Card, CardDeck, Button } from "react-bootstrap";

function HomeComponent(props) {
    return (
        <React.Fragment>
            <Container style={{ paddingTop: "20px" }}>
                <h1>Home</h1>
                <p>Some cool information about this service and information on how to use the tools on the left hand side of this page. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut commodo consectetur metus, eget tincidunt mi scelerisque ac. Pellentesque id enim rhoncus eros ornare condimentum. Sed rhoncus, dui quis elementum rhoncus, tellus elit vestibulum diam, id maximus nisl eros sed metus.</p>
                <CardDeck>
                    <Card className="text-center">
                        <Card.Header>Children</Card.Header>
                        <Card.Body>
                            <Card.Title>Filter for children</Card.Title>
                            <Card.Text>
                                Will block content not suitable for children. Such as adult content, obscene language, and violence.
    </Card.Text>
                            <Button variant="primary">Enable Filter</Button>
                        </Card.Body>
                        <Card.Footer className="text-muted">Last updated: 2 days ago</Card.Footer>
                    </Card>
                    <Card className="text-center">
                        <Card.Header>PTSD/Trauma</Card.Header>
                        <Card.Body>
                            <Card.Title>Filter for PTSD and related trauma</Card.Title>
                            <Card.Text>
                                Will block violent scenes, gory content, and all weapons.
    </Card.Text>
                            <Button variant="primary">Enable Filter</Button>
                        </Card.Body>
                        <Card.Footer className="text-muted">Last updated: 2 days ago</Card.Footer>
                    </Card>
                    <Card className="text-center">
                        <Card.Header>Relationship</Card.Header>
                        <Card.Body>
                            <Card.Title>Filter for relationship breakups</Card.Title>
                            <Card.Text>
                                Will block any content related to love, dating, or couples.
    </Card.Text>
                            <Button variant="primary">Enable Filter</Button>
                        </Card.Body>
                        <Card.Footer className="text-muted">Last updated: 2 days ago</Card.Footer>
                    </Card>
                </CardDeck>
            </Container>
        </React.Fragment>
    )
}

export default HomeComponent;
