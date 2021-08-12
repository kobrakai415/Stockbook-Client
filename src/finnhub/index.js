const token = process.env.REACT_APP_FINNHUB_KEY
const finnhub = require('finnhub');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = token

export const finnhubClient = new finnhub.DefaultApi()
export const socket = new WebSocket(`wss://ws.finnhub.io?token=${token}`);