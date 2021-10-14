import { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import StockContainer from '../components/StockContainer';
import { finnhubClient } from '../finnhub';

const SearchPage = () => {

    const [query, setQuery] = useState("");
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(false);
    const debouncedQuery = useDebounce(query, 1000)

    useEffect(() => {

        setLoading(true)

        finnhubClient.symbolSearch(debouncedQuery.length > 2 ? debouncedQuery : "AAPL", (error, data, response) => {
            console.log(response)
            console.log(data)
            setStocks(data?.result)
            setLoading(false)
        });

    }, [debouncedQuery])




    return (

        <div>
            <h1>Search </h1>

            <div className="light-bg p-4 mb-4">

                <div className="my-3">

                    <div id="search-bar-parent">
                        <input id="search-bar" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Find your favourite stocks " />
                        <svg className="search-bar-glass" viewBox="0 0 512 512" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M349.714 347.937l93.714 109.969-16.254 13.969-93.969-109.969q-48.508 36.825-109.207 36.825-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 37.841-14.73 71.619t-40.889 58.921zM224 377.397q43.428 0 80.254-21.461t58.286-58.286 21.461-80.254-21.461-80.254-58.286-58.285-80.254-21.46-80.254 21.46-58.285 58.285-21.46 80.254 21.46 80.254 58.285 58.286 80.254 21.461z" fill="currentcolor"></path>
                        </svg>
                    </div>
                </div>

                {!loading && stocks ? <div className="search-results">

                    {stocks.length > 0 && stocks.slice(0, 2).map((stock, index) => {
                        return <StockContainer key={index} stock={stock} />
                    })}

                </div> : <div className="d-flex m-5 p-5 justify-content-center align-items-center">
                    <Spinner animation="border" variant="primary"></Spinner>
                </div>
                }
            </div>
        </div>


    );
}

export default SearchPage;


function useDebounce(value, delay) {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(
        () => {
            // Update debounced value after delay
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);
            // Cancel the timeout if value changes (also on delay change or unmount)
            // This is how we prevent debounced value from updating if value is changed ...
            // .. within the delay period. Timeout gets cleared and restarted.
            return () => {
                clearTimeout(handler);
            };
        },
        [value, delay] // Only re-call effect if value or delay changes
    );
    return debouncedValue;
}