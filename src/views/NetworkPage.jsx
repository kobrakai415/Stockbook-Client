import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import axios from 'axios';

const ApiUrl = process.env.REACT_APP_MY_API

const Networkpage = () => {

    const [query, setQuery] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [feedItems, setFeedItems] = useState([])


    const search = async () => {

        try {
            const res = await axios.get(`${ApiUrl}/network/${query}/search`)

        } catch (error) {
            console.log(error)
        }
    }

    const fetchFeedItems = async () => {
        try {
            const res = await axios.get(`${ApiUrl}/network/}`)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        search()
    }, [query]);

    useEffect(() => {
     
        fetchFeedItems()
    }, []);


    return (
        <Col className="height-90 p-3" xs={12} md={9} lg={10}>
            <Row>

                <Col xs={12} lg={9}>
                    <div>

                        <h1>Feed </h1>



                        {feedItems.length > 0 ?
                            feedItems.map((item, index) => {
                                return <h1>item container </h1>
                            }) :
                            null
                        }

                    </div>
                </Col>
                <Col xs={12} lg={3}>
                    <div >
                        <h1> Friends</h1>
                        <div className="my-3">

                            <div id="search-bar-parent">
                                <input id="search-bar" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Find a friend ... " />
                                <svg className="search-bar-glass" viewBox="0 0 512 512" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M349.714 347.937l93.714 109.969-16.254 13.969-93.969-109.969q-48.508 36.825-109.207 36.825-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 37.841-14.73 71.619t-40.889 58.921zM224 377.397q43.428 0 80.254-21.461t58.286-58.286 21.461-80.254-21.461-80.254-58.286-58.285-80.254-21.46-80.254 21.46-58.285 58.285-21.46 80.254 21.46 80.254 58.285 58.286 80.254 21.461z" fill="currentcolor"></path>
                                </svg>
                            </div>
                        </div>

                        <div>
                            {searchResults.length > 0 ? searchResults.map((item, index) => {
                                return <h1>hello</h1>
                            })
                                : null
                            }
                        </div>

                    </div>
                </Col>
            </Row>
        </Col>
    );
}

export default Networkpage;
