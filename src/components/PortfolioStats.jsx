import { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap'
import { useSelector } from 'react-redux';


const PortfolioStats = () => {
    const { user: { portfolio, balance }, unrealized } = useSelector(state => state.data)

    const [invested, setInvested] = useState(0);
    const [performance, setPerformance] = useState(0);

    useEffect(() => {

        let sum = portfolio.reduce((previousValue, currentValue) => {
            return previousValue + parseFloat((currentValue.shares * currentValue.purchasePrice))
        }, 0)

        setInvested(sum)

    }, [portfolio]);

    useEffect(() => {
        let sum = balance + unrealized + invested
        setPerformance(sum)
    }, [balance, unrealized]);


    return (
        <Row className="mb-4 mx-0">
            <Col className="ps-0" md={4}>
                <div className="black-bg p-4">
                    <Card className="p-3 d-flex align-items-center justify-content-center">
                        <h3>Cash</h3>
                        <h2>${balance.toFixed(2)}</h2>

                    </Card>
                </div>
            </Col>
            <Col md={4}>
                <div className="black-bg p-4">
                    <Card className="black-bg p-4" className=" p-3 d-flex align-items-center justify-content-center">

                        <h3>Invested</h3>
                        <h2>${invested.toFixed(2)}</h2>
                    </Card>
                </div>
            </Col>
            <Col className="pe-0" md={4}>
                <div className="black-bg p-4">
                    <Card className="black-bg p-4" className=" p-3 d-flex align-items-center justify-content-center">
                        <h3>Net Liquidation</h3>
                        {performance.toFixed !== NaN ? <h2>${performance.toFixed(2)}</h2> : null}
                    </Card>
                </div>
            </Col>


        </Row>
    );
}

export default PortfolioStats;
