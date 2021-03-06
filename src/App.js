import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory, withRouter } from 'react-router-dom';
import './App.css';
import Banner from './components/Banner';
import Navbar from './components/Navbar';
import AccountPage from './views/AccountPage';
import HomePage from './views/HomePage';
import LoginPage from './views/LoginPage';
import Networkpage from './views/NetworkPage';
import PortfolioPage from './views/PortfolioPage';
import SignUpPage from './views/SignUpPage';
import StockPage from './views/StockPage';
import UserPage from './views/UserPage';
import WatchlistPage from './views/WatchlistPage';

const ApiUrl = process.env.REACT_APP_MY_API

function App() {
  const { data: { authenticated, user: { _id } } } = useSelector(state => state)
  const dispatch = useDispatch()
  const history = useHistory()

  const [loading, setLoading] = useState(false)

  axios.defaults.withCredentials = true

  const refreshAuthLogic = (failedRequest) => axios.post(`${ApiUrl}/users/refreshToken`,).then(tokenRefreshResponse => {
    console.log(tokenRefreshResponse)
    return Promise.resolve();
  });

  createAuthRefreshInterceptor(axios, refreshAuthLogic);

  useEffect(() => {
    checkToken()
  }, []);

  const checkToken = async () => {
    try {
      setLoading(true)
      const response = await axios.post(`${process.env.REACT_APP_MY_API}/users/checkAccessToken`)

      if (response.statusText === "OK") {
        console.log(response)
        setLoading(false)
        dispatch({
          type: "SET_AUTHENTICATED",
          payload: true
        })
        dispatch({
          type: "SET_USER",
          payload: response.data
        })

      }
    } catch (error) {
      setLoading(false)
      console.log(error)
      history.push("/login")
      dispatch({
        type: "SET_AUTHENTICATED",
        payload: false
      })
    }
  }

  return (

    <Switch>

      <>
        <Container fluid className="app">
          <Row >
            {loading ? <img className="centered" height="200px"  src="/Ripple.svg" />
              : <> {authenticated && _id ? <>
                <Banner />
                <Navbar />
                <Switch>
                  <Route path="/" exact render={(routerProps) => <HomePage routerProps={routerProps} />} />
                  <Route path="/watchlists" exact render={(routerProps) => <WatchlistPage routerProps={routerProps} />} />
                  <Route path="/portfolio" exact render={(routerProps) => <PortfolioPage routerProps={routerProps} />} />
                  <Route path="/stock/:symbol" exact render={(routerProps) => <StockPage routerProps={routerProps} />} />
                  <Route path="/network" exact render={(routerProps) => <Networkpage routerProps={routerProps} />} />
                  <Route path="/profile" exact render={(routerProps) => <AccountPage routerProps={routerProps} />} />
                  <Route path="/user/:id" exact render={(routerProps) => <UserPage routerProps={routerProps} />} />


                </Switch>
              </> :
                <>
                  <Route path="/login" exact render={(routerProps) => <LoginPage routerProps={routerProps} />} />
                  <Route path="/register" exact render={(routerProps) => <SignUpPage routerProps={routerProps} />} />
                </>
              }</>}
          </Row>
        </Container>
      </>


    </Switch>



  );
}

export default withRouter(App);
