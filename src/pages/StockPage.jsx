import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { socket, finnhubClient } from '../finnhub/index';
import NewsPanel from '../components/NewsPanel';
import CompanyDetails from '../components/CompanyDetails';
import PriceBoard from '../components/PriceBoard';
import { connect } from "react-redux"
import { fetchStockOverview, fetchStokDailyChart, setLivePrice, setQuotedPrice } from '../redux/actions';

const api = process.env.REACT_APP_ALPHAVANTAGE_API
const key = process.env.REACT_APP_ALPHAVANTAGE_KEY

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => ({
    fetchOverview: (symbol) => dispatch(fetchStockOverview(symbol)),
    fetchDailyChart: (symbol) => dispatch(fetchStokDailyChart(symbol)),
    changeQuotedPrice: (price) => dispatch(setQuotedPrice(price)),
    changeLivePrice: (price) => dispatch(setLivePrice(price))
})

const StockPage = ({ data, fetchOverview, fetchDailyChart, changeLivePrice }) => {
    const yesterdaysClosing = data.yesterdaysClosing
    const [quotedPrice, setQuotedPrice] = useState(null);
    const [livePrice, setLivePrice] = useState(null);
    const [percentageChange, setPercentageChange] = useState(null);

    const { symbol } = useParams()

    useEffect(() => {
        finnhubClient.quote(symbol, (error, data, response) => {
            if (!error) {
                console.log("quoted price", data["c"])
                changeLivePrice(data["c"])
            } else {
                console.log(error)
                console.log(response)
            }
        })
        fetchOverview(symbol)

        socket.addEventListener('open', (event) => {
            console.log("connected")
            socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': `${symbol}` }))
        })

        socket.addEventListener('message', async (event) => {

            const json = JSON.parse(event.data)

            if (json.type === "trade") {
                changeLivePrice(json.data[0].p.toFixed(2))
                console.log(json?.data[0].p)
            }
        });

        fetchDailyChart(symbol)

        return () => {
            socket.send(JSON.stringify({ 'type': 'unsubscribe', 'symbol': `${symbol}` }))
            console.log("disconnected")
        }
    }, [])


    return (
        <Col className="height-90" xs={8} md={9} lg={10}>
            <Row>

                <PriceBoard />

                <CompanyDetails />

                <NewsPanel symbol={symbol} />
            </Row>

        </Col >
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(StockPage)

