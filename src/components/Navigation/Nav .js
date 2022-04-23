import React from 'react';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './Nav.scss'

const Nav = (props) => {
    const [isShow, setIsShow] = useState(true)
    let location = useLocation()
    useEffect(() => {
        if (location.pathname === '/login' || location.pathname === '/register') {
            setIsShow(false)
        }
    }, [])
    return (
        <div>
            {isShow &&
                <div className="topnav">
                    <NavLink to="/" exact>Home</NavLink>
                    <NavLink to="/users">Users</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div>
            }

        </div >
    );
}

export default Nav;