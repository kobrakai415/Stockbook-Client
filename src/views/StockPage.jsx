import { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { socket, finnhubClient } from '../finnhub/index';
import NewsPanel from '../components/NewsPanel';
import CompanyDetails from '../components/CompanyDetails';
import PriceBoard from '../components/PriceBoard';
import { connect } from "react-redux"
import { fetchStockOverview, fetchStokDailyChart, setLivePrice, setQuotedPrice } from '../redux/actions';

// const token = process.env.REACT_APP_FINNHUB_KEY
// const finnhub = require('finnhub');

// const api_key = finnhub.ApiClient.instance.authentications['api_key'];
// api_key.apiKey = token

// export const finnhubClient = new finnhub.DefaultApi()
// export const socket = new WebSocket(`wss://ws.finnhub.io?token=${token}`);

// const api = process.env.REACT_APP_ALPHAVANTAGE_API
// const key = process.env.REACT_APP_ALPHAVANTAGE_KEY

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => ({
    fetchOverview: (symbol) => dispatch(fetchStockOverview(symbol)),
    fetchDailyChart: (symbol) => dispatch(fetchStokDailyChart(symbol)),
    changeQuotedPrice: (price) => dispatch(setQuotedPrice(price)),
    changeLivePrice: (price) => dispatch(setLivePrice(price))
})

const StockPage = ({ fetchOverview, fetchDailyChart, changeLivePrice }) => {


    const { symbol } = useParams()

    useEffect(() => {
        finnhubClient.quote(symbol, (error, data, response) => {
            if (!error) {
                console.log("quoted price", data["c"])
                changeLivePrice(data["c"].toFixed(2))
            } else {
                console.log(error)
                console.log(response)
            }
        })
        fetchOverview(symbol)
        
    
        
        socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': `${symbol}` }))

        socket.addEventListener('message', (event) => {
            
            const json = JSON.parse(event.data)
            
            if (json.type === "trade") {
                changeLivePrice(json.data[0].p.toFixed(2))
                console.log("livePrice", json?.data[0].p)
            }
        });
        
        fetchDailyChart(symbol)
        
        console.log("socket", socket)
        return () => {
            socket.send(JSON.stringify({ 'type': 'unsubscribe', 'symbol': `${symbol}` }))
            console.log("disconnected")
        }
    }, [])


    return (
        <Col className="height-90 p-5" xs={8} md={9} lg={10}>
            <Row>

                <PriceBoard />

                {/* //Comapny details and posts section: */}

                <CompanyDetails />

                <NewsPanel symbol={symbol} />
            </Row>

        </Col >
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(StockPage)

