import React from 'react';
import {Card} from 'react-bootstrap';


const NewsContainer = ({ item, index }) => {
    return (
        <div>
            <div  className="m-2 light-bg3 p-2 d-flex justify-content-between">
                <a href={item.url} rel="noreferrer" target="_blank" className="link-no-decoration">

                    <div className="d-flex flex-column flex-xl-row ">

                        <h5 className="line-clamp2">{item.headline}</h5>
                        <img className="p-xl-2 img-fluid rounded" src={item.image} style={{ maxHeight: "100px", maxWidth: "150px" }} alt="news" />

                    </div>
                    <div>
                        <p className="text-white line-clamp">{item.summary}</p>
                    </div>

                    <div className="text-info">

                        <span>Source: </span>
                        <span>{item.source}</span>
                    </div>
                </a>

            </div>
               
        </div>
    );
}

export default NewsContainer;
