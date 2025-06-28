import React from "react";
import { Link, NavLink } from "react-router";
export default function Navbar() {
    return (
        <>
            <div id="navbar"  >
          
                    <Link to='/'>                   
                         <img id="logo" src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png" alt="logo" />
                    </Link>
          

                <div id="nav">
                    <input id="searchBar" type="text" placeholder="Search " />

                    <NavLink to='/' className={(e) => { return e.isActive ? "red" : "" }}>Home</NavLink>
                    <NavLink to='/Contact' className={(e) => { return e.isActive ? "red" : "" }}>Contact</NavLink>
                    <NavLink to='/About' className={(e) => { return e.isActive ? "red" : "" }}>About</NavLink>
                </div>

                <button id="loginBtn">Login</button>

            </div>
        </>
    )
}