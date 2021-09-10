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
            {yesterdaysClosing && dailyChartData && overview && newsData.length > 1 && <>

                    <Col className="news-panel" md={12} lg={4}>
                        <div className="p-4 black-bg">
                            <h3 className="mb-2">Related News</h3>
                            {newsData.slice(0, 7).map((item, index) => {

                                return <Card key={index} className="m-2 p-2 d-flex justify-content-between">
                                    <a href={item.news_url} rel="noreferrer" target="_blank" className="link-no-decoration">

                                        <div className="d-flex flex-column flex-lg-row justify-content-between">

                                            <strong style={{ fontSize: "14px" }} className="">{item.title}</strong>
                                            <img className="p-2 img-fluid" src={item.image_url} style={{ maxHeight: "60px", maxWidth: "100px" }} height={50} width={100} alt="news" />

                                        </div>
                                        <div>
                                            <p>{item.text}</p>
                                        </div>

                                        <div>

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
                                </Card>

                            })}
                        </div>
                    </Col>
                </>
            
            }
        </>


    );
}

export default NewsPanel;
