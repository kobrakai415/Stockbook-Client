import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import { dataReducer } from "../reducers"
import thunk from "redux-thunk"

export const initialState = {

    data: {
        user: {
            startingBalance: 0,
            balance: 0,
            portfolio: [],
            watchlists: [{
                stocks: [],
                name: "",
                _id: ""
            },],
            progress: [],
            followers: [], 
            following: [],
        },
        overview: null,
        yesterdaysClosing: null,
        dailyChartData: {},
        percentageChange: null,
        chartXValues: null,
        chartYValues: null,
        authenticated: false,
        unrealized: 0,
        invested: 0,
        netUnrealized: 0

    },



}

const mainReducer = combineReducers(
    {
        data: dataReducer,
    }
)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const configureStore = () => createStore(mainReducer, initialState, composeEnhancers(applyMiddleware(thunk)))

export default configureStore