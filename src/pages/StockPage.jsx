import { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { finnhubClient } from '../finnhub';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { socket } from '../finnhub/index';


// const request = require('request');

const key = process.env.REACT_APP_ALPHAVANTAGE_KEY

const StockPage = () => {

    const { symbol } = useParams()

    useEffect(() => {

        fetchStockData()

    }, [])

    const fetchStockData = async () => {
        try {
            const res = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${key}`)

            if (res.ok) {
                const json = await res.json()
                console.log(json)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Col className="height-90" md={10}>

        </Col>
    );
}

export default StockPage;
