import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchPage from './views/SearchPage';
import StockPage from './views/StockPage';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import { Container, Row } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch, useHistory, withRouter } from 'react-router-dom';
import LoginPage from './views/LoginPage';
import SignUpPage from './views/SignUpPage';
import HomePage from './views/HomePage';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import PortfolioPage from './views/PortfolioPage';

function App() {

  axios.defaults.withCredentials = true
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    checkToken()
  }, [])

  const checkToken = async () => {
    try {
      console.log("hello")
      const response = await axios.post(`${process.env.REACT_APP_MY_API}/users/checkAccessToken`)
      
      if(response.statusText === "OK"){
        console.log(response)
        dispatch({
              type: "SET_USER",
              payload: response.data
            })

      }
      
      // fetch(`${process.env.REACT_APP_MY_API}/users/checkAccessToken`, {
      //   method: "POST",
      //   headers: {
      //     "content-type": "application/json",
      //   },
      //   withCredentials: true,
      //   credentials: "include"
      // })



      // if (response.ok) {
      //   const json = await response.json()
      //   console.log("Ok")
      //   dispatch({
      //     type: "SET_USER",
      //     payload: json
      //   })
      // }
      // else {
      //   console.log("not Ok")

      //   history.push("/login")
      // }

    } catch (error) {
      console.log(error)
      history.push("/login")
    }
  }

  return (

    <Switch>
      <Route path="/login" exact render={(routerProps) => <LoginPage routerProps={routerProps} />} />
      <Route path="/register" exact render={(routerProps) => <SignUpPage routerProps={routerProps} />} />

      <>
        <Container fluid className="app">
          <Row className="">
            <Banner />
            <Navbar />
            <Route path="/" exact render={(routerProps) => <HomePage routerProps={routerProps} />} />
            <Route path="/search" exact render={(routerProps) => <SearchPage routerProps={routerProps} />} />
            <Route path="/portfolio" exact render={(routerProps) => <PortfolioPage routerProps={routerProps} />} />

            <Route path="/stock/:symbol" exact render={(routerProps) => <StockPage routerProps={routerProps} />} />
          </Row>
        </Container>
      </>


    </Switch>



  );
}

export default withRouter(App);
