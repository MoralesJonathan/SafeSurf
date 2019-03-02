import React from "react";
import "./SideNav.css"
import { Link } from "react-router-dom"

function SideNav() {
    return (
        <div className="border-right" id="sidebar-wrapper">
            <div className="sidebar-heading">General </div>
            <div className="list-group list-group-flush">
                <Link to="/app" className="list-group-item list-group-item-action">
                    <i className="material-icons">home</i> Home
                </Link>
                <Link to="/app/preferences" className="list-group-item list-group-item-action">
                    <i className="material-icons">settings</i> Preferences
                </Link>
                <Link to="/app/display" className="list-group-item list-group-item-action">
                    <i className="material-icons">image</i> Display
                </Link>
                <Link to="/app/users" className="list-group-item list-group-item-action">
                    <i className="material-icons">person</i> Users
                </Link>
            </div>
            <div className="sidebar-heading">Data </div>
            <div className="list-group list-group-flush">
                <Link to="/app/analytics" className="list-group-item list-group-item-action">
                    <i className="material-icons">bar_chart</i> Analytics
                </Link>
                <Link to="/app/reports" className="list-group-item list-group-item-action">
                    <i className="material-icons">report</i> Reports
                </Link>
            </div>
        </div>
    );
}

export default SideNav