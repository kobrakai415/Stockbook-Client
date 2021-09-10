import React from 'react';
import {Card} from 'react-bootstrap';


const NewsContainer = ({ item, index }) => {
    return (
        <div>
            <Card key={index} className="m-2 p-2 d-flex justify-content-between">
                <a href={item.url} rel="noreferrer" target="_blank" className="link-no-decoration">

                    <div className="d-flex flex-column flex-lg-row justify-content-between">

                        <strong style={{ fontSize: "14px" }} className="">{item.headline}</strong>
                        <img className="p-2 img-fluid" src={item.image} style={{ maxHeight: "100px", maxWidth: "150px" }} height={50} width={150} alt="news" />

                    </div>
                    <div>
                        <p>{item.summary}</p>
                    </div>

                    <div>

                        <span>Source: </span>
                        <span>{item.source}</span>
                    </div>
                </a>
            </Card>
        </div>
    );
}

export default NewsContainer;
