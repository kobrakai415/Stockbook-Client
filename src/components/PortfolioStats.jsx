import React from 'react';
import { Row, Col, Card } from 'react-bootstrap'

const PortfolioStats = () => {
    return (
        <Row className="no-gutters">
            <Col md={4}>
                <Card className="m-3 p-3">
                <h3>Statistic</h3>

                </Card>

            </Col>
            <Col md={4}>
                <Card className="m-3 p-3">
            <h3>Statistic</h3>
                </Card>
            </Col>
            <Col md={4}>
                <Card className="m-3 p-3">
            <h3>Statistic</h3>
                </Card>
            </Col>
        </Row>
    );
}

export default PortfolioStats;
