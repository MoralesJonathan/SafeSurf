import React from "react";
import "./SideNav.css"
import { Link } from "react-router-dom"

function SideNav() {
    return (
        <div className="bg-light border-right" id="sidebar-wrapper">
            <div className="sidebar-heading">Start Bootstrap </div>
            <div className="list-group list-group-flush">
                <Link to="/campaigns" className="list-group-item list-group-item-action bg-light">Campaigns</Link>
                <Link to="/emailList" className="list-group-item list-group-item-action bg-light">Email List</Link>
                <Link to="/tracking" className="list-group-item list-group-item-action bg-light">Tracking</Link>
                <Link to="/" className="list-group-item list-group-item-action bg-light">Airline Settings</Link>
            </div>
        </div>
    );
}

export default SideNav