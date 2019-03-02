import React, { useState, useEffect } from "react";
import API from "../utils/API";
import {Container} from "react-bootstrap";
let BarChart =  require('react-chartjs').Bar;


function Tracking() {
    const [stats, setStats] = useState("");

    useEffect(() => {
        const iataCode = localStorage.getItem("iata");
        API.getStats(iataCode).then((res) => {
            setStats(res.data);
        })
            .catch((error) => {
                console.log(error);
            })
    }, []);


    return (
        <React.Fragment>
            <Container style={{paddingTop: "20px"}}>
                {stats === "" ? null: stats.map((data, index) => <div style={{paddingBottom:"65px"}}><h2 style={{paddingBottom:"15px"}}>{data.datasets[0].label}</h2><BarChart key={index} data={data} height={400} width={800}></BarChart></div>)}
            </Container>
        </React.Fragment>
    )
}

export default Tracking;
