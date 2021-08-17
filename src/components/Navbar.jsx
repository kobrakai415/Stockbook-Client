import React from 'react';
import { Col } from 'react-bootstrap'
import { AiOutlinePieChart, AiOutlineEye, AiOutlineSearch } from 'react-icons/ai'
import { FaUserFriends } from 'react-icons/fa'
import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
        <Col md={2}>

            <div className="nav-links d-flex flex-column">
                <Link to="/search" className="px-3 py-2 d-flex align-items-center">
                    <AiOutlineSearch />
                    <span className="ms-2">Find stocks</span>
                </Link>
                <div className="px-3 py-2 d-flex align-items-center">
                    <AiOutlineEye />
                    <span className="ms-2">Watchlists</span>
                </div>
                <div className="px-3 py-2 d-flex align-items-center">
                    <AiOutlinePieChart />
                    <span className="ms-2">My Portfolio</span>
                </div>
                <div className="px-3 py-2 d-flex align-items-center">
                    <FaUserFriends />
                    <span className="ms-2">Network</span>
                </div>


            </div>
        </Col>
    );
}

export default Navbar;
