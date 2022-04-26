import React from 'react';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';

import './Nav.scss'

const Nav = (props) => {
    const { user } = useContext(UserContext)
    const location = useLocation()
    if (user && user.isAuthenticated || location.pathname === '/') {
        return (
            <div>
                <div className="topnav">
                    <NavLink to="/" exact>Home</NavLink>
                    <NavLink to="/users">Users</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div>


            </div >
        );
    } else {
        return <></>
    }
}

export default Nav;