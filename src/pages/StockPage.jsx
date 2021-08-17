import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { socket, finnhubClient } from '../finnhub/index';
import Plot from 'react-plotly.js';
import shortNumber from '@pogix3m/short-number';
import NewsPanel from '../components/NewsPanel';
import { Button } from 'react-bootstrap';
import CompanyDetails from '../components/CompanyDetails';
import PriceBoard from '../components/PriceBoard';


const api = process.env.REACT_APP_ALPHAVANTAGE_API
const key = process.env.REACT_APP_ALPHAVANTAGE_KEY


const StockPage = () => {
    const [overview, setOverview] = useState(null);
    const [quotedPrice, setQuotedPrice] = useState(null);
    const [livePrice, setLivePrice] = useState(null);
    const [dailyChartData, setDailyChartData] = useState({});
    const [yesterdaysClosing, setYesterdaysClosing] = useState(null);
    const [percentageChange, setPercentageChange] = useState(null);
    const [chartXValues, setChartXValues] = useState(null);
    const [chartYValues, setChartYValues] = useState(null);


    const { symbol } = useParams()

    useEffect(() => {
        finnhubClient.quote(symbol, (error, data, response) => {
            if (!error) {
                console.log(data["c"])
                setQuotedPrice(data["c"])
            } else {
                console.log(error)
                console.log(response)
            }
        })
        fetchOverview()

        socket.addEventListener('open', (event) => {
            console.log("connected")
            socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': `${symbol}` }))
        })

        socket.addEventListener('message', async (event) => {

            const json = JSON.parse(event.data)

            if (json.type === "trade") {
                setLivePrice(json.data[0].p.toFixed(2))
                console.log(json?.data[0].p)
            }
        });

        fetchDailyChartData()
        return () => {
            socket.send(JSON.stringify({ 'type': 'unsubscribe', 'symbol': `${symbol}` }))
            console.log("disconnected")
        }
    }, [])

    useEffect(() => {
        console.log(livePrice)
        console.log(yesterdaysClosing)

        const change = (livePrice - yesterdaysClosing) / yesterdaysClosing * 100
        setPercentageChange(change)

    }, [livePrice, yesterdaysClosing])


    const fetchOverview = async () => {
        try {
            const res = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${key}`)

            if (res.ok) {
                const json = await res.json()
                console.log(json)
                setOverview(json)

            }
        } catch (error) {
            console.log(error)
        }
    }
    const fetchDailyChartData = async () => {
        try {
            const res = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${key}`)

            if (res.ok) {
                const json = await res.json()
                setDailyChartData(json["Time Series (Daily)"])

                const key = Object.keys(json["Time Series (Daily)"])[0]
                const yesterdayPrice = json["Time Series (Daily)"][`${key}`]["4. close"]
                setYesterdaysClosing(yesterdayPrice)

                let stockChartXValues = []
                let stockChartYValues = []

                for (let key in json["Time Series (Daily)"]) {
                    stockChartXValues.push(key)
                    stockChartYValues.push(json["Time Series (Daily)"][key]["4. close"])
                }
                setChartXValues(stockChartXValues)
                setChartYValues(stockChartYValues)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const fetchQuote = async () => {
        try {

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Col className="height-90" md={10}>
            <Row>

                <PriceBoard overview={overview} dailyChartData={dailyChartData} livePrice={livePrice} quotedPrice={quotedPrice} percentageChange={percentageChange} />

                <CompanyDetails overview={overview} dailyChartData={dailyChartData} chartXValues={chartXValues} chartYValues={chartYValues} />

                <NewsPanel symbol={symbol} />
            </Row>

        </Col >
    );
}

export default StockPage;
