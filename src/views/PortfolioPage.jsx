import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import PositionContainer from '../components/PositionContainer';
import { socket, finnhubClient } from '../finnhub/index';

const PortfolioPage = () => {
    const portfolio = useSelector((state) => state.data.user?.portfolio)

    useEffect(() => {

        // finnhubClient.quote(symbol, (error, data, response) => {
        //     if (!error) {
        //         console.log("quoted price", data["c"])
        //         changeLivePrice(data["c"])
        //     } else {
        //         console.log(error)
        //         console.log(response)
        //     }
        // })
        // fetchOverview(symbol)

        // socket.addEventListener('open', (event) => {
        //     console.log("connected")
        //     portfolio.map(item => {
        //         return socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': `${item.ticker}` }))
        //     })
        //     socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': `${symbol}` }))
        // })

        // socket.addEventListener('message', async (event) => {

        //     const json = JSON.parse(event.data)

        //     if (json.type === "trade") {
        //         changeLivePrice(json.data[0].p.toFixed(2))
        //         console.log(json?.data[0].p)
        //     }
        // });

        // console.log(portfolio)
    })
    return (
        <Col className="height-90" xs={8} md={9} lg={10}>
            <Row>
                <Col className="p-1" md={2}>
                    <h6>Stock</h6>
                </Col>
                <Col className="p-1" md={2}>
                    <h6>Ticker</h6>
                </Col>
                <Col className="p-1" md={2}>
                    <h6>Shares</h6>
                </Col>
                <Col className="p-1" md={2}>
                    <h6>CostPrice</h6>
                </Col>
                <Col className="p-1" md={2}>
                    <h6>CurrentPrice</h6>
                </Col>
                <Col className="p-1" md={2}>
                    <h6>P&L</h6>
                </Col>



                {portfolio && portfolio.length > 0 &&
                    portfolio.map((position, index) => {
                        return <PositionContainer key={index} position={position} />
                    })}

                <Col xs={9}>
                </Col>
                <Col className="d-flex flex-row p-2" xs={3}>
                    <h6 className="pe-3">Net P&L:</h6>
                    <h6>$2324234</h6>
                </Col>
            </Row>
        </Col>
    );
}

export default PortfolioPage;
