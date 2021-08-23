import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import { watchlistReducer, dataReducer, formReducer } from "../reducers"
import thunk from "redux-thunk"

export const initialState = {

    data: {
        overview: null,
        quotedPrice: null,
        livePrice: null,
        yesterdaysClosing: null,
        dailyChartData: {},
        percentageChange: null,
        chartXValues: null,
        chartYValues: null,
        user: null

    },
    form: {
        email: "",
        password: "",
        name: "",
        surname: "",
        signUpEmail: "",
        signUpPassword: "",
    },
    watchlist: {

    },

}

const mainReducer = combineReducers(
    {
        data: dataReducer,
        form: formReducer,
        watchlist: watchlistReducer
    }
)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const configureStore = () => createStore(mainReducer, initialState, composeEnhancers(applyMiddleware(thunk)))

export default configureStore