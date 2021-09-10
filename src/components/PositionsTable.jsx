import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
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


                <Row className="black-bg p-4 mb-3">
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



                    <Col xs={12} className="positions-table" >
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
