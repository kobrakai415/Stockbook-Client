import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import PositionContainer from '../components/PositionContainer';
import { socket, finnhubClient } from '../finnhub/index';
import { AiOutlineClose } from 'react-icons/ai'


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


        // socket.addEventListener('open', (event) => {
        //     console.log("connected")
        //     socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': `${portfolio[0].ticker}` }))
        //     socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': `TSLA` }))
        //     socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': `FB` }))
        //     socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': `${portfolio[0].ticker}` }))

        // })

        // socket.addEventListener('message', async (event) => {

        //     const json = JSON.parse(event.data)
        //     console.log(json)
        //     if (json.type === "trade") {
        //         // changeLivePrice(json.data[0].p.toFixed(2))
        //         console.log(json?.data[0].p)
        //     }

        //     return () => {
        //         socket.send(JSON.stringify({ 'type': 'unsubscribe', 'symbol': `AAPL` }))
        //         console.log("disconnected")
        //     }
        // }, [portfolio]);

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
                    <h6>Cost Price</h6>
                </Col>
                <Col className="p-1" md={2}>
                    <h6>Current Price</h6>
                </Col>
                <Col className="p-1" md={2}>
                    <h6>P&L</h6>
                </Col>


            </Row>


            {portfolio && portfolio.length > 0 &&
                portfolio.map((position, index) => {
                    return <PositionContainer key={index} position={position} />
                })}

            <Row>

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
