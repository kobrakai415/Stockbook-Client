import { useState, useEffect } from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import PositionContainer from './PositionContainer';


const PositionsTable = () => {

    const portfolio = useSelector(state => state.data.user.portfolio)
    const dispatch = useDispatch()

    const [profitsArray, setProfitsArray] = useState([]);
    const [total, setTotal] = useState(0);

    const updateProfit = (profitObject) => {
        let profits = [...profitsArray]
        if (profitObject !== undefined) {
            profits[profitObject.index] = profitObject
        }
        setProfitsArray(profits)
    }

    const removeFromProfits = ({ index, difference }) => {
        let profits = profitsArray.filter(item => item?.index !== index)
        setProfitsArray(profits)
    }

    useEffect(() => {

        if (profitsArray.length > 0) {

            let sum = profitsArray.reduce((previousValue, currentValue) => {

                if (currentValue?.difference !== undefined) {
                    return previousValue + parseFloat(currentValue["difference"])
                }
            }, 0)
            setTotal(sum)
            dispatch({
                type: "SET_UNREALIZED",
                payload: total
            })
        }


    }, [profitsArray, total]);

    return (
        <>
            {portfolio && portfolio.length > 0 && (<>

                <Row className="mb-4 mx-0">

                    <h1 className="mb-4">Open positions</h1>
                    <Col className="light-bg  p-4" xs={12}>

                        <Row className="bottom-border2 mx-0 ">

                            <Col className="p-1" md={2}>
                                <h3 className="text-muted">Stock</h3>
                            </Col>
                            <Col className="p-1" xs={6} md={2}>
                                <h3 className="text-muted">Ticker</h3>
                            </Col>
                            <Col className="p-1" md={2}>
                                <h3 className="text-muted">Shares</h3>
                            </Col>
                            <Col className="p-1" md={2}>
                                <h3 className="text-muted">Cost Price</h3>
                            </Col>
                            <Col className="p-1" md={2}>
                                <h3 className="text-muted">Last</h3>
                            </Col>
                            <Col className="p-1" xs={6} md={2}>
                                <h3 className="text-muted">P&L</h3>
                            </Col>

                        </Row>




                        <Row className="mx-0">
                            <Col className=" positions-table" xs={12}>

                                {portfolio.map((position, index) => {

                                    return <PositionContainer updateProfit={updateProfit} removeFromProfits={removeFromProfits} key={position._id} position={position} index={index} />
                                })}
                            </Col>
                        </Row>


                        <Row>
                            <Col xs={8}>
                            </Col>

                            <Col xs={4}>

                                <div className="d-flex justify-content-end my-2 flex-row p-2">
                                    <h6 className="p-2">Unrealized P&L:</h6>
                                    <h6 className={(total < 0 ? "negative-percentage-containergative" : "positive-percentage-container ") + "p-2"}>{(total < 0 ? "-" : "+") + "$" + Math.abs(total).toFixed(2)}</h6>
                                </div>
                            </Col>
                        </Row>

                    </Col>

                </Row>
            </>
            )}
        </>
    );
}

export default PositionsTable;
