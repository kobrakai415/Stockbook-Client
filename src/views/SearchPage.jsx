import { useState, useEffect } from 'react';
import { Col, Spinner } from 'react-bootstrap';
import StockContainer from '../components/StockContainer';
import { finnhubClient } from '../finnhub';

const SearchPage = () => {

    const [query, setQuery] = useState("");
    const [stocks, setStocks] = useState(null);


    useEffect(() => {
        finnhubClient.symbolSearch(query ? query : "AAPL", (error, data, response) => {
            console.log(data)
            setStocks(data.result)
        });

    }, [query])

    return (

        <>
            <div id="search-bar-parent">
                <input id="search-bar" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Find your favourite stocks " />
                <svg className="search-bar-glass" viewBox="0 0 512 512" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M349.714 347.937l93.714 109.969-16.254 13.969-93.969-109.969q-48.508 36.825-109.207 36.825-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 37.841-14.73 71.619t-40.889 58.921zM224 377.397q43.428 0 80.254-21.461t58.286-58.286 21.461-80.254-21.461-80.254-58.286-58.285-80.254-21.46-80.254 21.46-58.285 58.285-21.46 80.254 21.46 80.254 58.285 58.286 80.254 21.461z" fill="currentcolor"></path>
                </svg>
            </div>

            {stocks ? <div className="search-results">

                {stocks.length > 0 && stocks.slice(0, 5).map((stock, index) => {
                    return <StockContainer key={index} stock={stock} />
                })}

            </div> : <div className="d-flex m-5 p-5 justify-content-center align-items-center">
                <Spinner animation="border" variant="primary"></Spinner>
            </div>
            }
        </>


    );
}

export default SearchPage;
