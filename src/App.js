import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchPage from './pages/SearchPage';
import StockPage from './pages/StockPage';
import Navbar from './components/Navbar';
import Banner from './components/Banner';

import { Container, Row } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {

  return (
    <Container fluid className="app">
      <Row>
        <Banner />


        <Router>
          <Navbar />
          
          <Route path="/search" exact render={(routerProps) => <SearchPage routerProps={routerProps} />} />
          <Route path="/stock/:symbol" exact render={(routerProps) => <StockPage routerProps={routerProps} />} />

          {/* <Route path="/" exact render={(routerProps) => <MainPage routerProps={routerProps} />} /> */}

        </Router>

      </Row>
    </Container>
  );
}

export default App;
