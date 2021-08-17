import { useEffect, useState } from 'react';
import { Col, Card } from 'react-bootstrap';


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
            }

        } catch (error) {
            console.log(error)
        }
    }
    return (

        <Col md={3}>

            {newsData && <>
                <h3>Related News</h3>
                {newsData.map((item, index) => {

                    return <Card key={index} className="m-2 p-2" style={{ height: "10em" }}>
                        <div className="d-flex flex-row">
                            <img className="me-2" src={item.image_url} height={50} />
                            <h5 className="text-truncate">{item.title}</h5>
                        </div>
                        <div>
                            <p >{item.text}</p>
                        </div>
                    </Card>

                })}
            </>}

        </Col>

    );
}

export default NewsPanel;
