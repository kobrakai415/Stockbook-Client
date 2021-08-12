import React from 'react';
import { Col, Card } from 'react-bootstrap';
import {Link} from 'react-router-dom'


const StockContainer = ({ stock }) => {
    return (
        <Col >
        <Link to={`/stock/${stock.symbol}`}>

            <Card className="p-2 m-2 d-flex flex-row justify-content-between">

                <h6 className="m-0">{stock.symbol}</h6>

                <span>{stock.description}</span>

            </Card>
        </Link>
        </Col>
    );
}

export default StockContainer;
