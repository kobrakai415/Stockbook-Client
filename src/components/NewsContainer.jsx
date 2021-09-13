import React from 'react';
import {Card} from 'react-bootstrap';


const NewsContainer = ({ item, index }) => {
    return (
        <div>
            <Card key={index} className="m-2 black-bg p-2 d-flex justify-content-between">
                <a href={item.url} rel="noreferrer" target="_blank" className="link-no-decoration">

                    <div className="d-flex flex-column flex-xl-row ">

                        <h5 className="">{item.headline}</h5>
                        <img className="p-2 img-fluid rounded" src={item.image} style={{ maxHeight: "100px", maxWidth: "150px" }} alt="news" />

                    </div>
                    <div>
                        <p className="text-white">{item.summary}</p>
                    </div>

                    <div className="text-info">

                        <span>Source: </span>
                        <span>{item.source}</span>
                    </div>
                </a>
            </Card>
        </div>
    );
}

export default NewsContainer;
