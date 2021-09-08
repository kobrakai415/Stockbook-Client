import { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import PositionContainer from './PositionContainer';


const PositionsTable = () => {

    const portfolio = useSelector(state => state.data.user.portfolio)

    return (
        <>
            {portfolio && portfolio.length > 0 && (<>

                <Row className="positions-table" >

                    <Row className="bottom-border2 mb-3">
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


                    </Row>

                    {portfolio.map((position, index) => {
                        console.log("rerendered")
                        return <PositionContainer key={position._id} position={position} />
                    })}

                </Row>
                <Row>
                    <Col xs={9}>
                    </Col>
                    <Col className="d-flex flex-row p-2" xs={3}>
                        <h6 className="pe-3">Net P&L:</h6>
                        <h6>$2324234</h6>
                    </Col>
                </Row>
            </>
            )}
        </>
    );
}

export default PositionsTable;