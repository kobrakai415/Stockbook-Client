import * as finnhub from "finnhub"

const token = process.env.REACT_APP_FINNHUB_KEY

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = token

const finnhubClient = new finnhub.DefaultApi()


const socket = new WebSocket(`wss://ws.finnhub.io?token=${token}`);

socket.onopen = () => {
    console.log("Connected to finnhub socket!")
}
socket.onclose = () => {
    console.log("Discconected from finnhub socket!")
}

export { socket, finnhubClient }
