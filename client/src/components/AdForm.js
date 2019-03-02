import React, { useState, useEffect } from "react";
import API from "../utils/API";
import "./AdForm.css";
import { Container } from "react-bootstrap";

function AdForm() {
    const [title, setTitle] = useState("Hello!");

    useEffect(() => {
           
    }, []);


    return (
        <React.Fragment>
            <Container style={{ paddingTop: "20px" }}>
                <h1>{title}</h1>
            </Container>
        </React.Fragment>
    )
}

export default AdForm;
