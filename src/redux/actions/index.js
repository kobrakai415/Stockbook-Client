const key = process.env.REACT_APP_ALPHAVANTAGE_KEY

export const setOverview = (data) => ({
    type: 'SET_OVERVIEW',
    payload: data
})
export const setQuotedPrice = (data) => ({
    type: 'SET_QUOTED_PRICE',
    payload: data
})
export const setLivePrice = (data) => ({
    type: 'SET_LIVE_PRICE',
    payload: data
})
export const setYesterdaysClosing = (data) => ({
    type: 'SET_YESTERDAY_CLOSING',
    payload: data
})
export const setDailyChartData = (data) => ({
    type: 'SET_DAILY_CHART_DATA',
    payload: data
})
export const setPercentageChange = (data) => ({
    type: 'SET_PERCENTAGE_CHANGE',
    payload: data
})
export const setChartXValues = (data) => ({
    type: 'SET_CHART_XVALUES',
    payload: data
})
export const setChartYValues = (data) => ({
    type: 'SET_CHART_YVALUES',
    payload: data
})


export const setUser = (user) => ({
    type: 'SET_USER',
    payload: user
})
export const setAuthenticated = (boolean) => ({
    type: 'SET_AUTHENTICATED',
    payload: boolean
})

export const setUnrealizedProfits = (unrealized) => ({
    type: "SET_UNREALIZED",
    payload: unrealized
})

export const logout = (payload) => ({
    type: "LOGOUT",
    payload: payload
})

export const fetchStockOverview = (symbol) => {
    return async (dispatch, getState) => {
        try {
            try {
                const res = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${key}`)

                if (res.ok) {
                    const json = await res.json()
                    console.log("redux", json)
                    dispatch(setOverview(json))

                }
            } catch (error) {
                console.log(error)
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const fetchStokDailyChart = (symbol) => {
    return async (dispatch, getState) => {

        try {
            const res = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${key}`)

            if (res.ok) {
                const json = await res.json()
                console.log("json", json)
                dispatch(setDailyChartData(json["Time Series (Daily)"]))

                const key = Object.keys(json["Time Series (Daily)"])[0]
                const yesterdayPrice = json["Time Series (Daily)"][`${key}`]["4. close"]
                dispatch(setYesterdaysClosing(yesterdayPrice))

                let stockChartXValues = []
                let stockChartYValues = []

                for (let key in json["Time Series (Daily)"]) {
                    stockChartXValues.push(key)
                    stockChartYValues.push(json["Time Series (Daily)"][key]["4. close"])
                }
                dispatch(setChartXValues(stockChartXValues))
                dispatch(setChartYValues(stockChartYValues))
            }
        } catch (error) {
            console.log(error)
        }
    }
}


