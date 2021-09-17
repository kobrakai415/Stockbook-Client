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
                <div >
                    <Link className="no-decor text-white" to={`/stock/${stock.symbol}`}>

                        <div className="p-3 m-2 d-flex flex-row light-bg3 justify-content-between">
                            <div className="d-flex">
                                {stockData && stockData.logo ? <img className="stock-logo" src={stockData?.logo} /> : <div className=" stock-logo"></div>}
                                <div className="ms-3">
                                    <h5 className="m-0 text-muted">{stock.description}</h5>
                                    <div>
                                        {<span>{stock.symbol}</span>} •  <span>{stockData.finnhubIndustry}</span> •  <span>{stockData.country}</span>
                                    </div>
                                </div>

                            </div>
                            <div className="d-flex flex-column">

                                <h6 className="d-flex justify-content-end">${stockQuote.c.toFixed(2)}</h6>
                                <div className={(stockQuote.d < 0 ? "negative-percentage-container" : "positive-percentage-container") + " p-2 d-flex align-items-center"}>
                                    <h6>{stockQuote.d.toFixed(2)}</h6>
                                    <h6 className="ms-2">({Math.abs(stockQuote.dp).toFixed(2)}%)</h6>
                                </div>
                            </div>


                        </div>
                    </Link>
                </div> : null}
        </>
    );
}

export default StockContainer;
