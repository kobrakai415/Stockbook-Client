import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';

const token = process.env.REACT_APP_KEY
const socket = new WebSocket(`wss://ws.finnhub.io?token=${token}`);

function App() {

  useEffect(() => {
    socket.addEventListener('open', function (event) {
      socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': 'AAPL' }))
    })

    socket.addEventListener('message', function (event) {
      console.log(event.data);
    });

  }, [])


  return (
    <Container fluid className="app">
      <Row>
        <Banner />


        <Router>
          <Navbar />

          <Route path="/search" exact render={(routerProps) => <SearchPage routerProps={routerProps} />} />

          {/* <Route path="/" exact render={(routerProps) => <MainPage routerProps={routerProps} />} /> */}

        </Router>

      </Row>
    </Container>
  );
}

export default App;
