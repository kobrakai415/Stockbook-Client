import { useEffect, useState } from 'react';
import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const myApi = process.env.REACT_APP_MY_API

const NewsPanel = ({ symbol }) => {

    const [newsData, setNewsData] = useState([]);


    useEffect(() => {
        fetchNews()
    }, [])

    const fetchNews = async () => {
        try {
            const res = await fetch(`${myApi}/news/${symbol}`)
            if (res.ok) {
                const json = await res.json()
                setNewsData(json)
                console.log(json)
            }

        } catch (error) {
            console.log(error)
        }
    }
    return (

        <Col md={4} lg={3}>

            {newsData && <>
                <h3>Related News</h3>
                {newsData.map((item, index) => {

                    return <Card key={index} className="m-2 p-2 d-flex justify-content-between">
                        <div className="d-flex flex-row">

                            <img className="me-2 img-fluid" src={item.image_url} style={{maxHeight: "50px", maxWidth: "100px"}} height={50} width={100} />
                        
                            <h6 href={item.news_url} className="">{item.title}</h6>
                        
                        </div>
                        {/* <div className="pt-1">

                            <p >{item.text}</p>
                        </div> */}
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
                    </Card>

                })}
            </>}

        </Col>

    );
}

export default NewsPanel;
