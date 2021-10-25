import React, { useState, useEffect } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import axios from 'axios';
import PostContainer from '../components/PostContainer.jsx';
import AddUserContainer from '../components/AddUserContainer.jsx';
import { useSelector } from 'react-redux';


const ApiUrl = process.env.REACT_APP_MY_API

const Networkpage = () => {

    const { following } = useSelector(state => state.data.user)

    const [query, setQuery] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [suggestedUsers, setSuggestedUsers] = useState([])
    const [feedItems, setFeedItems] = useState(null)
    const [feedLoading, setFeedLoading] = useState(false)
    const [searchLoading, setSearchLoading] = useState(false);

    const search = async () => {

        try {
            setSearchLoading(true)
            const res = await axios.get(`${ApiUrl}/network/${query}/search`)
            console.log(res)

            if (res.status === 200) {
                setSearchResults(res.data)
                setSearchLoading(false)
            } else {
                setSearchLoading(false)

            }
        } catch (error) {
            setSearchLoading(false)
            console.log(error)
        }
    }

    const fetchSuggestedUsers = async () => {
        try {
            setFeedLoading(true)
            const res = await axios.get(`${ApiUrl}/network/suggested/search`)
            console.log(res)

            if (res.status === 200) {
                setSuggestedUsers(res.data)
                setFeedLoading(false)

            }
        } catch (error) {
            setFeedLoading(false)
            console.log(error)
        }
    }

    const fetchFeedItems = async () => {
        try {
            setFeedLoading(true)
            const res = await axios.get(`${ApiUrl}/network`)
            console.log(res)
            if (res.status === 200) {
                setFeedItems(res.data)
                setFeedLoading(false)

            }

        } catch (error) {
            console.log(error)
            setFeedLoading(false)

        }
    }


    useEffect(() => {
        search()
    }, [query]);

    useEffect(() => {
        fetchSuggestedUsers()
        fetchFeedItems()
    }, []);

    useEffect(() => {

        fetchFeedItems()
    }, [following]);

    return (
        <Col className="height-90 p-3" xs={12} md={9} lg={10}>
            <Row>

                <Col  xs={12} lg={8} xl={9}>

                    <h1>Feed </h1>

                    {feedItems && feedItems.length > 0 ?
                        feedItems.map((item, index) => {
                            return <PostContainer key={item._id} post={item} />
                        }) :
                        null
                    }
                    {feedItems && feedItems.length === 0 ?
                        <div className="mt-5 d-flex flex-column align-items-center">
                            <img className="img-fluid mb-3" height="150px" src="/sad.png" alt="dog" />
                            <h3 className="text-center my-4">No posts, find some people to follow or make some posts of your own!</h3>
                        </div>
                        : null}
                    {feedLoading ? <Spinner style={{ position: "absolute", right: "50%", top: "50%" }} animation="border" role="status" /> : null}

                </Col>
                <Col xs={12} lg={4} xl={3}>
                    <div className="position-relative">
                        <h1> Friends</h1>
                        <div className="my-3">

                            <div id="search-bar-parent">
                                <input id="search-bar" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Find a friend ... " />
                                <svg className="search-bar-glass" viewBox="0 0 512 512" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M349.714 347.937l93.714 109.969-16.254 13.969-93.969-109.969q-48.508 36.825-109.207 36.825-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 37.841-14.73 71.619t-40.889 58.921zM224 377.397q43.428 0 80.254-21.461t58.286-58.286 21.461-80.254-21.461-80.254-58.286-58.285-80.254-21.46-80.254 21.46-58.285 58.285-21.46 80.254 21.46 80.254 58.285 58.286 80.254 21.461z" fill="currentcolor"></path>
                                </svg>
                            </div>
                        </div>



                        {query.length > 0 && searchResults.length > 0 ?
                            <>
                                <h3 className="my-2">Search Results</h3>
                                <div className="light-bg p-4">

                                    {searchResults.map(item => {
                                        return <AddUserContainer user={item} key={item._id} />
                                    })}

                                </div>
                            </>
                            : null
                        }

                        {suggestedUsers.length > 0 ?
                            <>
                                <h3 className="my-2">Suggested Users</h3>
                                <div className="light-bg p-4 " >
                                    {suggestedUsers.map((item, index) => {
                                        return <AddUserContainer user={item} key={item._id} />
                                    })}
                                </div>
                            </>
                            : null
                        }

                    </div>
                </Col>
            </Row>
        </Col>
    );
}

export default Networkpage;
