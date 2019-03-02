import React, { useState, useEffect } from "react";
import API from "../utils/API";
import { Form, Alert, Button, Container} from "react-bootstrap";

function AirlineSettings() {
    const [name, setName] = useState("");
    const [airlines, setAirlines] = useState(["Select an Airline"]);
    const [email, setEmail] = useState("");
    const [iata, setIata] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        const airline = localStorage.getItem("airlineName");
        if(!airline){
            API.getAirlines().then(res => {
                if (res.data.length > 0) {
                    setAirlines(airlines.concat(res.data));
                }
            })
                .catch((error) => {
                    console.log(error, airlines);
                    setError(true);
                })
        } else {
            API.getAirlines().then(res => {
                if (res.data.length > 0) {
                    setAirlines(airlines.concat(res.data));
                }
            })
                .catch((error) => {
                    console.log(error, airlines);
                    setError(true);
                })
            API.getAirlineSettings(airline).then(res => {
                setName(res.data.airlineName);
                setEmail(res.data.airlineEmail);
                setIata(res.data.iataCode)
                localStorage.setItem("iata", res.data.iataCode);
                localStorage.setItem("airlineName", res.data.airlineName);
            }).catch((error) => {
                console.log(error);
                setError(true);
            })
        }
    }, []);

    
    function handleSubmit(event) {
        event.preventDefault();
        const editedAirline = {
            airlineName: name,
            airlineEmail: email,
            iataCode: iata
        }
        API.updateAirlineSettings(editedAirline);
    }

    function handleSelect(event) {
        if (event.currentTarget.value !== "Select an Airline") {
            API.getAirlineSettings(event.currentTarget.value).then(res => {
                setName(res.data.airlineName);
                setEmail(res.data.airlineEmail);
                setIata(res.data.iataCode)
                localStorage.setItem("iata", res.data.iataCode);
                localStorage.setItem("airlineName", res.data.airlineName);
            }).catch((error) => {
                console.log(error);
                setError(true);
            })
        } else {
            setName("");
            setEmail("");
            setIata("")
            localStorage.removeItem("iata");
            localStorage.removeItem("airlineName");
        }
    }

    function handleNameChange(event) {
        setName(event.currentTarget.value);
    }

    function handleIataChange(event){
        setIata(event.currentTarget.value);
    }

    function handleEmailChange(event) {
        setEmail(event.currentTarget.value);
    }


    return (
        <React.Fragment>
            <Container style={{paddingTop: '20px'}}>
                {error ? <Alert dismissible variant="danger">There was an error loading your Customers</Alert> : null}
                <Form onSubmit={e => handleSubmit(e)}>
                    <Form.Group controlId="EmailForm.AirlineSelect">
                        <Form.Label>Select Airline</Form.Label>
                        <Form.Control as="select" onChange={handleSelect} value={name}>
                            {airlines.map((airline) =>
                                <option key={airline}>{airline}</option>
                            )}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="EmailForm.AirlineName">
                        <Form.Label>Customer Name</Form.Label>
                        <Form.Control type="text" placeholder="Airline" value={name} onChange={handleNameChange} />
                    </Form.Group>
                    <Form.Group controlId="EmailForm.IATACode">
                        <Form.Label>IATA Code</Form.Label>
                        <Form.Control type="text" placeholder="AL" value={iata} onChange={handleIataChange} />
                    </Form.Group>
                    <Form.Group controlId="EmailForm.AirlineEmail">
                        <Form.Label>Customer Email</Form.Label>
                        <Form.Control type="email" placeholder="promo@airline.com" value={email} onChange={handleEmailChange} />
                    </Form.Group>
                    <Button type="submit">Submit form</Button>
                </Form>
            </Container>
        </React.Fragment>
    )
}

export default AirlineSettings;
