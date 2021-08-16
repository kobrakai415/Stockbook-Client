import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { socket } from '../finnhub/index';
import Plot from 'react-plotly.js';
import shortNumber from '@pogix3m/short-number';
import { PriceTarget } from 'finnhub';


const api = process.env.REACT_APP_ALPHAVANTAGE_API
const key = process.env.REACT_APP_ALPHAVANTAGE_KEY

const stockNewsKey = process.env.REACT_APP_STOCKNEWS_KEY

const StockPage = () => {
    const [overview, setOverview] = useState(null);
    const [livePrice, setLivePrice] = useState(null);
    const [dailyChartData, setDailyChartData] = useState({});
    const [yesterdaysClosing, setYesterdaysClosing] = useState(null)
    const [percentageChange, setPercentageChange] = useState(null)
    const [chartXValues, setChartXValues] = useState(null);
    const [chartYValues, setChartYValues] = useState(null);
    const [news, setNews] = useState(null);


    const { symbol } = useParams()

    useEffect(() => {

        fetchOverview()
        fetchDailyChartData()
        fetchNews()


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
                console.log(json)
                console.log(json["Time Series (Daily)"])
                setDailyChartData(json["Time Series (Daily)"])
                const closingPrice = Object.keys(json["Time Series (Daily)"])[0]
                console.log("close", closingPrice)
                const closingPrice1 = json["Time Series (Daily)"][`${closingPrice}`]["4. close"]
                console.log("close1", closingPrice1)

                setYesterdaysClosing(closingPrice1)

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
    const fetchNews = async () => {
        try {
            const res = await fetch(`https://stocknewsapi.com/api/v1?tickers=${symbol}&items=10&token=${stockNewsKey}`)

            if (res.ok) {
                const json = await res.json()
                console.log(json)
                setNews(json.Data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const percentage = (livePrice - yesterdaysClosing) / yesterdaysClosing * 100

    // const percentage = (initialPrice, newPrice) => {
    //     return ((newPrice - initialPrice) / initialPrice) * 100
    // }

    return (
        <Col className="height-90" md={10}>
            <Row>
                <Col md={12}>

                    {overview && dailyChartData && <>
                        <div className="pb-4 d-flex justify-content between">
                            <div className="d-flex align-items-center ">
                                <div>
                                    <h1>{overview.Name}</h1>
                                    <span>{overview.Symbol} • </span> <span>{overview.AssetType} • </span> <span>{overview.Exchange}</span>
                                </div>
                                <div className="p-2 ms-3">

                                    <h4 className="p-2">{livePrice !== null ?
                                        "$" + livePrice :
                                        "$" + yesterdaysClosing}  </h4>

                                    <div className="d-flex flex-row align-items-center">
                                        <h4 className="p-2" style={{ color: percentageChange < 0 ? "red" : "green" }}>{percentageChange.toFixed(2) + "%"}</h4>
                                        <span className="text-muted">yesterday</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </>
                    }
                </Col>


                <Col md={9}>

                    {dailyChartData && overview && chartXValues && chartYValues && <>

                        <Plot
                            data={[
                                {
                                    x: chartXValues,
                                    y: chartYValues,
                                    type: 'scatter',
                                    mode: 'lines+markers',
                                    marker: { color: 'red' },
                                },

                            ]}
                            layout={{ width: 720, height: 440, title: '' }}
                        />

                        <h3>Company details</h3>

                        <p>{overview.Description}</p>

                        <h3>Key Ratios</h3>
                        <div className="d-flex flex-column">
                            <div className="d-flex p-2 flex-row justify-content-between">
                                <span className="text-muted">Analyst Price Target</span> <span>{"$" + overview.AnalystTargetPrice}</span>
                            </div>
                            <div className="d-flex p-2 flex-row justify-content-between">
                                <span className="text-muted">Market Cap</span> <span>{"$" + shortNumber(overview.MarketCapitalization)}</span>
                            </div>
                            <div className="d-flex p-2 flex-row justify-content-between">
                                <span className="text-muted">P/E ratio</span> <span>{overview.PERatio}</span>
                            </div>
                            <div className="d-flex p-2 flex-row justify-content-between">
                                <span className="text-muted">EPS</span> <span>{"$" + overview.EPS}</span>
                            </div>
                            <div className="d-flex p-2 flex-row justify-content-between">
                                <span className="text-muted">DividendPerShare</span> <span>{"$" + overview.DividendPerShare}</span>
                            </div>
                            <div className="d-flex p-2 flex-row justify-content-between">
                                <span className="text-muted">DividendYield</span> <span>{overview.DividendYield + "%"}</span>
                            </div>
                            <div className="d-flex p-2 flex-row justify-content-between">
                                <span className="text-muted">EBITDA</span> <span>{overview.EBITDA}</span>
                            </div>

                        </div>
                    </>}
                </Col>

                <Col md={3}>
                    <h3>News</h3>

                </Col>
            </Row>

        </Col >
    );
}

export default StockPage;
