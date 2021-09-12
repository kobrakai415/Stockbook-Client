import { set } from 'date-fns';
import { useEffect, useState } from 'react';
import { Col, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { finnhubClient } from '../finnhub';

const StockContainer = ({ stock }) => {

    const [stockData, setStockData] = useState(null)
    const [stockQuote, setStockQuote] = useState(null);


    useEffect(() => {
        finnhubClient.companyProfile2({ 'symbol': stock.symbol }, (error, data, response) => {
            console.log(data)
            setStockData(data)
        });
        finnhubClient.quote(stock.symbol, (error, data, response) => {
            console.log(data)
            setStockQuote(data)
        });

    }, [stock.symbol])

    return (
        <>
            {stockData && stockQuote ?
                <div  >
                    <Link className="no-decor text-white" to={`/stock/${stock.symbol}`}>

                        <Card className="p-3 m-2 d-flex flex-row justify-content-between">
                            <div className="d-flex">
                                {stockData && stockData.logo ? <img className="stock-logo" src={stockData?.logo} /> : <div className=" stock-logo"></div>}
                                <div className="ms-3">
                                    <h5 className="m-0">{stock.description}</h5>
                                    <div>
                                        {<span>{stock.symbol}</span>} •  <span>{stockData.finnhubIndustry}</span> •  <span>{stockData.country}</span>
                                    </div>
                                </div>

                            </div>
                            <div className="d-flex flex-column">

                                <h6 className="d-flex justify-content-end">${stockQuote.c}</h6>
                                <div className={(stockQuote.d < 0 ? "negative" : "positive") + " d-flex"}>
                                    <h6>{stockQuote.d}</h6>
                                    <h6 className="ms-2">({Math.abs(stockQuote.dp).toFixed(2)}%)</h6>
                                </div>
                            </div>


                        </Card>
                    </Link>
                </div> : null}
        </>
    );
}

export default StockContainer;
