import { useEffect } from 'react';
import { Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { socket, finnhubClient } from '../finnhub/index.js';
import PositionsTable from '../components/PositionsTable';
import PortfolioStats from '../components/PortfolioStats';



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


        socket.addEventListener('open', (event) => {
            console.log("connected")
            socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': `${portfolio[0].ticker}` }))
            socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': `TSLA` }))
            socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': `FB` }))
    

        })

        socket.addEventListener('message', async (event) => {

            const json = JSON.parse(event.data)
            console.log(json)
            if (json.type === "trade") {
                // changeLivePrice(json.data[0].p.toFixed(2))
                console.log(json?.data[0].p)
            }

        });
  

        // return () => {
        //     socket.send(JSON.stringify({ 'type': 'unsubscribe', 'symbol': `${portfolio[0].ticker}` }))
        //     socket.send(JSON.stringify({ 'type': 'unsubscribe', 'symbol': `TSLA` }))
        //     socket.send(JSON.stringify({ 'type': 'unsubscribe', 'symbol': `FB` }))
        //     console.log("disconnected")
        // }
    }, [portfolio])




    return (
        <Col className="height-90 p-5" xs={8} md={9} lg={10}>
            <PortfolioStats />

            <PositionsTable portfolio={portfolio} />
        </Col>
    );
}

export default PortfolioPage;
