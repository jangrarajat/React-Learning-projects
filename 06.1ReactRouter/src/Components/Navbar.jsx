import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <>
            <div id="navbar">
                <ul >
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/projects">Projects</NavLink>
                    <NavLink to="/task">Task</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/user">User</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                </ul>
                <ul>
                    <button id="loginBtn">Login</button>
                    
                </ul>
            </div>
        </>
    )
}