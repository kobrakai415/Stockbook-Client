import { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { ImArrowUp, ImArrowDown } from 'react-icons/im'

const PortfolioStats = () => {
    const { user: { portfolio, balance, startingBalance }, unrealized } = useSelector(state => state.data)
    const dispatch = useDispatch()

    const [invested, setInvested] = useState(0);
    const [performance, setPerformance] = useState(0);

    const [difference, setDifference] = useState(0)
    const [perecentDifference, setPercentDifference] = useState(0)

    


    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    useEffect(() => {

        setDifference(Math.abs((performance - startingBalance).toFixed(2)))
        setPercentDifference((((performance - startingBalance) / startingBalance) * 100).toFixed(2))
    }, [performance, startingBalance])


    useEffect(() => {

        let sum = portfolio.reduce((previousValue, currentValue) => {
            return previousValue + parseFloat((currentValue.shares * currentValue.purchasePrice))
        }, 0)

        setInvested(sum)

        dispatch({
            type: "SET_INVESTED",
            payload: sum
        })

    }, [portfolio]);

    useEffect(() => {
        let sum = balance + unrealized + invested

        console.log("balance", balance)
        console.log("unrealized", unrealized)
        console.log("invested", invested)

        setPerformance(sum)
        dispatch({
            type: "SET_NET_UNREALIZED",
            payload: sum
        })
    }, [balance, unrealized, invested]);


    return (
        <Row className="mb-4 mx-0">
            <h1>Dashboard</h1>
            <Col className="ps-md-0 mb-3 mb-md-0" md={4}>
                <div className="light-bg p-4 ">
                    <div className="p-3 stat-card d-flex flex-column align-items-center justify-content-center">
                        <h3 className="text-muted">Deposited</h3>
                        <h2>${numberWithCommas(startingBalance)}</h2>

                    </div>
                </div>
            </Col>
            <Col md={4}>
                <div className="light-bg p-4 mb-3 mb-md-0 ">
                    <div className="p-3 stat-card d-flex flex-column align-items-center justify-content-center">

                        <h3 className="text-muted">Invested</h3>
                        <h2>${numberWithCommas(invested.toFixed(2))}</h2>
                    </div>
                </div>
            </Col>
            <Col className="pe-md-0 mb-3 mb-md-0" md={4}>
                <div className="light-bg p-4">
                    <div className=" p-3 stat-card d-flex flex-column align-items-center justify-content-center">
                        <h3 className="text-muted">Net Liquidation</h3>
                        {performance.toFixed !== NaN ? <h2>${numberWithCommas(performance.toFixed(2))}</h2> : null}

                        <div style={{ width: "190px" }} className={"p-2  " + (perecentDifference < 0 ? "negative-percentage-container" : "positive-percentage-container")}>
                            {perecentDifference < 0 ? <ImArrowDown /> : <ImArrowUp />}
                            <span>  ${difference} </span>
                            <span> ({perecentDifference}%) </span>
                        </div>
                    </div>
                </div>
            </Col>


        </Row>
    );
}

export default PortfolioStats;
