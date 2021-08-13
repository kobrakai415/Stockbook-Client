import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { socket } from '../finnhub/index';
import Plot from 'react-plotly.js';
import shortNumber from '@pogix3m/short-number';


const api = process.env.REACT_APP_ALPHAVANTAGE_API
const key = process.env.REACT_APP_ALPHAVANTAGE_KEY

const StockPage = () => {
    const [overview, setOverview] = useState(null);
    const [livePrice, setLivePrice] = useState(null);
    const [dailyChartData, setDailyChartData] = useState(null);
    const [chartXValues, setChartXValues] = useState(null);
    const [chartYValues, setChartYValues] = useState(null);

    const { symbol } = useParams()

    useEffect(() => {

        fetchOverview()
        fetchDailyChartData()

        socket.addEventListener('open', (event) => {
            console.log("connected")
            socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': `${symbol}` }))
        })

        socket.addEventListener('message', async (event) => {

            const json = JSON.parse(event.data)

            if (json.type === "trade") {
                setLivePrice(json.data)
                console.log(json)
                console.log(json?.data[0].p)
            }
        });

        return () => {
            socket.send(JSON.stringify({ 'type': 'unsubscribe', 'symbol': `${symbol}` }))
            console.log("disconnected")
        }
    }, [])

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
                console.log(json["Time Series (Daily)"])
                setDailyChartData(json["Time Series (Daily)"])

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

    return (
        <Col className="height-90" md={10}>
            <Row>
                <Col md={12}>
                    {overview && dailyChartData && <>
                        <div className="d-flex justify-content between">
                            <div>

                                <h1>{overview.Name}</h1>
                                <span>{overview.Symbol} • </span> <span>{overview.AssetType} • </span> <span>{overview.Exchange}</span>
                            </div>
                            <h4>{livePrice ? livePrice[0].p.toFixed(2) : Object.keys(dailyChartData)[Object.keys(dailyChartData).length - 1]["4. close"]}  </h4>
                        </div>
                    </>
                    }
                </Col>
                <Col md={9}>


                    {dailyChartData && chartXValues && chartYValues && <>

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
