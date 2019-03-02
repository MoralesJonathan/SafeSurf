import React, { useState, useEffect } from "react";
import API from "../utils/API";
import "./SideNav.css";
import "./AdForm.css";
import { Col, Form, Alert, Button, Container } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AdForm() {
    const [campaigns, setCampaigns] = useState(["Create New Campaign"]);
    const [error, setError] = useState(false);
    const [selected, setSelected] = useState(campaigns[0]);
    const [name, setName] = useState("");
    const [date, setDate] = useState(new Date().toDateString());
    const [routesEndOffset, setRoutesEndOffset] = useState(7)
    const [routesStartOffset, setRoutesStartOffset] = useState(1)
    const [template, setTemplate] = useState("");
    const [iataCode, setIataCode] = useState(localStorage.getItem("iata"));
    const [markup, setMarkUp] = useState("");
    const [subject, setSubject] = useState("");
    const [id, setId] = useState();

    useEffect(() => {
        API.getCampaigns(iataCode).then((res) => {
            if (res.data.length > 0) {
                setCampaigns(campaigns.concat(res.data));
            }
        })
            .catch((error) => {
                console.log(error, campaigns);
                setError(true);
            })
           
    }, []);

    function handleSubmit(event) {
        event.preventDefault();
        const editedCampaign = {
            "name": name,
            "date": date,
            "routesOffsetStartDate": routesStartOffset * 86400000,
            "routesOffsetEndDate": routesEndOffset * 86400000,
            "markup": markup,
            "selected": selected,
            "iataCode": iataCode,
            "subject": subject
        }
        if (id) {
            editedCampaign._id = id;
            API.updateCampaign(editedCampaign);
        } else {
            API.saveCampaign(editedCampaign);
        }
    }

    function handleDateChange(date) {
        setDate(date.toDateString());
    }

    function handleRoutesStartDateChange(event) {
        setRoutesStartOffset(parseInt(event.currentTarget.value));
        if (template !== "") updateMarkup()
    }

    function handleRoutesEndDateChange(event) {
        setRoutesEndOffset(parseInt(event.currentTarget.value));
        if (template !== "") updateMarkup()
    }

    function handleNameChange(event) {
        setName(event.currentTarget.value);
        if (template !== "") updateMarkup()
    }

    function handleSubjectChange(event) {
        setSubject(event.currentTarget.value);
    }

    function handleMarkUpChange(event) {
        setMarkUp(event.currentTarget.value);
    }

    function handleSelect(event) {
        if (event.currentTarget.value !== "Create New Campaign") {
            API.getCampaign(event.currentTarget.value, iataCode).then(res => {
                setSelected(res.data.name);
                setName(res.data.name);
                setDate(res.data.date);
                setRoutesStartOffset(res.data.routesOffsetStartDate / 86400000);
                setRoutesEndOffset(res.data.routesOffsetEndDate / 86400000);
                setSubject(res.data.subject);
                setMarkUp(res.data.markup);
                setId(res.data._id);
            })
        } else {
            setSelected("Create New Campaign");
            setName("");
            setDate(new Date().toDateString());
            setMarkUp("");
        }
    }

    function handleTemplateSelect(event) {
        if (event.currentTarget.value !== "None") {
            API.getTemplate(event.currentTarget.value).then(res => {
                setTemplate(res.data.content);
                const markup = res.data.content.replace(/{{{campaignName}}}}/gi, encodeURI(name)).replace(/{{{airlineCode}}}/gi, iataCode).replace(/{{{routeStartDateOffset}}}}-{{{routeEndDateOffset}}}}/gi, `${routesStartOffset * 86400000}-${(routesStartOffset + routesEndOffset) * 86400000}`)
                setMarkUp(markup);
            });
        } else {
            setTemplate("");
            setMarkUp("");
        }

    }

    function updateMarkup() {
        const markup = template.replace(/{{{campaignName}}}}/gi, encodeURI(name)).replace(/{{{airlineCode}}}/gi, iataCode).replace(/{{{routeStartDateOffset}}}}-{{{routeEndDateOffset}}}}/gi, `${routesStartOffset * 86400000}-${(routesStartOffset + routesEndOffset) * 86400000}`)
        setMarkUp(markup);
    }

    return (
        <React.Fragment>
            <Container style={{ paddingTop: "20px" }}>
                {error ? <Alert dismissible variant="danger">There was an error loading your Campaigns</Alert> : null}
                <Form onSubmit={e => handleSubmit(e)}>
                    <Form.Group controlId="CampaignForm.CampaignSelect">
                        <Form.Label>Select Campaign</Form.Label>
                        <Form.Control as="select" onChange={handleSelect}>
                            {campaigns.map((campaign) =>
                                <option key={campaign}>{campaign}</option>
                            )}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="CampaignForm.CampaignName">
                        <Form.Label>Campaign Name</Form.Label>
                        <Form.Control type="text" placeholder="Campaign Name" value={name} onChange={handleNameChange} />
                    </Form.Group>
                    <Form.Group controlId="CampaignForm.CampaignDatePicker">
                        <Form.Label>Campaign Launch Date</Form.Label>
                        <DatePicker value={date} onChange={handleDateChange} />
                    </Form.Group>
                    <Form.Row>
                        <Col>
                            <Form.Group controlId="CampaignForm.RoutesOffsetStartDate">
                                <Form.Label>Campaign Routes Start Date Offset</Form.Label>
                                <Form.Control placeholder="1" type="number" value={routesStartOffset} onChange={handleRoutesStartDateChange} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="CampaignForm.RoutesOffsetEndDate">
                                <Form.Label>Campaign Routes End Date Offset</Form.Label>
                                <Form.Control placeholder="7" type="number" value={routesEndOffset} onChange={handleRoutesEndDateChange} />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Group controlId="CampaignForm.CampaignSubject">
                        <Form.Label>Email Subject</Form.Label>
                        <Form.Control type="text" value={subject} onChange={handleSubjectChange} />
                    </Form.Group>
                    <Form.Group controlId="CampaignForm.CampaignSelect">
                        <Form.Label>Select Email Template</Form.Label>
                        <Form.Control as="select" onChange={handleTemplateSelect}>
                            <option key={0}>None</option>
                            <option key={1}>Default</option>
                            <option key={2}>Custom 1</option>
                            <option key={3}>Custom 2</option>
                            <option key={4}>Custom 3</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="CampaignForm.CampaignMarkup">
                        <Form.Label>Email preview</Form.Label>
                        <Form.Control type="hidden" value={markup} onChange={handleMarkUpChange} />
                        <div id="templatePreview" dangerouslySetInnerHTML={{ __html: markup }}></div>
                    </Form.Group>
                    {template !== "" ? <Button type="submit" variant="primary" >Submit form</Button> : <Button type="submit" variant="secondary" disabled >Submit form</Button>}
                </Form>
            </Container>
        </React.Fragment>
    )
}

export default AdForm;
