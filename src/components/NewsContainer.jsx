import React from 'react';
import {Card} from 'react-bootstrap';


const NewsContainer = ({ item, index }) => {
    return (
        <div>
            <Card key={index} className="m-2 p-2 d-flex justify-content-between">
                <a href={item.url} rel="noreferrer" target="_blank" className="link-no-decoration">

                    <div className="d-flex flex-column flex-lg-row justify-content-between">

                        <h4 className="">{item.headline}</h4>
                        <img className="p-2 img-fluid rounded" src={item.image} style={{ maxHeight: "100px", maxWidth: "150px" }} height={50} width={150} alt="news" />

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
