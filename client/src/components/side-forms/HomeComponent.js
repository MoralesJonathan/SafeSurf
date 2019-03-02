import React from "react";
import { Container } from "react-bootstrap";

function HomeComponent(props) {
    return (
        <React.Fragment>
            <Container style={{ paddingTop: "20px" }}>
                <h1>Home</h1>
            </Container>
        </React.Fragment>
    )
}

export default HomeComponent;
