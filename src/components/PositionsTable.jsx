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


    }, [profitsArray]);

    return (
        <>
            {portfolio && portfolio.length > 0 && (<>

                <Row className="black-bg p-4 mb-4 mx-0">
                <Table striped  hover>
                    <thead>
                        <tr>
                           
                            <th><h3>Stock</h3></th>
                            <th>Ticker</th>
                            <th>Shares</th>
                            <th>Cost Price</th>
                            <th>Last</th>
                            <th>P&L</th>


                        </tr>
                    </thead>



                    <tbody>
                      
                {portfolio.map((position, index) => {
                    return (
                        <tr>
                        <td>Stock</td>
                            <td>Ticker</td>
                            <td>Shares</td>
                            <td>Cost Price</td>
                            <td>Last</td>
                            <td>P&L</td>
                        </tr>
                    )
                })}
                    </tbody>
                </Table>
                    <Col className="p-1" md={2}>
                        <h3>Stock</h3>
                    </Col>
                    <Col className="p-1" md={2}>
                        <h3>Ticker</h3>
                    </Col>
                    <Col className="p-1" md={2}>
                        <h3>Shares</h3>
                    </Col>
                    <Col className="p-1" md={2}>
                        <h3>Cost Price</h3>
                    </Col>
                    <Col className="p-1" md={2}>
                        <h3>Last</h3>
                    </Col>
                    <Col className="p-1" md={2}>
                        <h3>P&L</h3>
                    </Col>




                    <Col xs={12} className="dark-bg p-4 positions-table" >
                        {portfolio.map((position, index) => {

                            return <PositionContainer updateProfit={updateProfit} removeFromProfits={removeFromProfits} key={position._id} position={position} index={index} />
                        })}
                    </Col>



                    <Col xs={9}>
                    </Col>
                    <Col className="d-flex flex-row p-2" xs={3}>
                        <h6 className="pe-3">Unrealized P&L:</h6>
                        <h6 className={(total < 0 ? "negative" : "positive")}>{(total < 0 ? "-" : "+") + "$" + Math.abs(total).toFixed(2)}</h6>
                    </Col>
                </Row>
            </>
            )}
        </>
    );
}

export default PositionsTable;
