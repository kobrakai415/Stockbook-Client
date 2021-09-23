import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux'


const myApi = process.env.REACT_APP_MY_API

const NewsPanel = ({ symbol }) => {

    const [newsData, setNewsData] = useState([]);
    const { yesterdaysClosing, overview, dailyChartData } = useSelector(state => state.data)

    useEffect(() => {
        fetchNews()
    }, [])

    const fetchNews = async () => {
        try {
            const res = await axios.get(`${myApi}/news/${symbol}`)
            if (res.status === 200) {
                setNewsData(res.data)

            }

        } catch (error) {
            console.log(error)
        }
    }
    return (

        <>
            {yesterdaysClosing && dailyChartData && overview && newsData.length > 1 ? <>

                    <h1 className="mb-2">Related News</h1>
                    <div className="p-4 light-bg">
                        {newsData.slice(0, 7).map((item, index) => {

                            return <div key={item._id} className="m-2 p-2 d-flex light-bg3 justify-content-between">
                                <a href={item.news_url} rel="noreferrer" target="_blank" className="link-no-decoration">

                                    <div className="d-flex flex-column flex-xl-row justify-content-between">

                                        <h5 className="line-clamp2">{item.title}</h5>
                                        <img className=" rounded p-md-2" src={item.image_url} style={{ maxHeight: "100px", maxWidth: "150px" }} alt="news" />

                                    </div>
                                    <div>
                                        <p className=" line-clamp"> {item.text}</p>
                                    </div>

                                    <div className="text-info">

                                        <span>Source: </span>
                                        <span>{item.source_name}</span>
                                    </div>
                                    <div>
                                        <span>Sentiment: </span>
                                        <span className={(item.sentiment === "Positive" ? "positive" : "") +
                                            (item.sentiment === "Neutral" ? "neutral" : "") +
                                            (item.sentiment === "Negative" ? "negative" : "")}
                                        >{item.sentiment}</span>

                                    </div>
                                </a>
                            </div>

                        })}
                    </div>
               
            </>
                : null}
        </>


    );
}

export default NewsPanel;
