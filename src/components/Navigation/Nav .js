import React from 'react';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { toast } from 'react-toastify';

import './Nav.scss'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Nav = (props) => {
    const { user, logout } = useContext(UserContext)
    const location = useLocation()
    const history = useHistory()
    const handleLogout = () => {
        localStorage.removeItem("jwt");
        document.cookie = 'jwt' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'; //delete jwt cookie
        logout()
        history.push('/login')
        toast.success('Logout succeeds')

    }
    if (user && user.isAuthenticated || location.pathname === '/') {
        return (
            <div>
                <div className="topnav">
                    <NavLink to="/" exact>Home</NavLink>
                    <NavLink to="/users">Users</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <span className='nav-item' onClick={() => { handleLogout() }} >Logout</span>

                </div>


            </div >
        );
    } else {
        return <></>
    }
}

export default Nav;