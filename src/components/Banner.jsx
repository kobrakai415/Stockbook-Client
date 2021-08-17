import React from 'react';
import { Col } from 'react-bootstrap'
import { CgProfile } from 'react-icons/cg'

const Banner = () => {
    return (
        <Col md={12} className="banner">
            <div className="d-flex justify-content-between">
                <h3>StockBook</h3>

                <div className="p-2 d-flex align-items-center">
                    <CgProfile />
                    <span className="ms-2">My account</span>
                </div>
            </div>
        </Col>
    );
}

export default Banner;
