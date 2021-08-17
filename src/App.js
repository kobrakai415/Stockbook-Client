import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchPage from './pages/SearchPage';
import StockPage from './pages/StockPage';
import Navbar from './components/Navbar';
import Banner from './components/Banner';

import { Container, Row } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

function App() {

  return (
    <Container fluid className="app">
      <Row>

        <Router>

          <Switch>
            <Route path="/login" exact render={(routerProps) => <LoginPage routerProps={routerProps} />} />
            <Route path="/register" exact render={(routerProps) => <SignUpPage routerProps={routerProps} />} />

            <>
              <Banner />
              <Navbar />

              <Route path="/search" exact render={(routerProps) => <SearchPage routerProps={routerProps} />} />

              <Route path="/stock/:symbol" exact render={(routerProps) => <StockPage routerProps={routerProps} />} />
            </>



          </Switch>


        </Router>

      </Row>
    </Container>
  );
}

export default App;
