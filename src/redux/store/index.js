import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import { watchlistReducer, dataReducer } from "../reducers"
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
            },]
        },
        overview: null,
        yesterdaysClosing: null,
        dailyChartData: {},
        percentageChange: null,
        chartXValues: null,
        chartYValues: null,
        authenticated: false,
        unrealized: 0

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