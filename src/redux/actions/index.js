
const ApiUrl = process.env.REACT_APP_MY_API
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

export const setEmail = (email) => ({
    type: 'SET_EMAIL',
    payload: email
})

export const setPassword = (password) => ({
    type: 'SET_PASSWORD',
    payload: password
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


export const login = async (history, email, password) => {

    return async (dispatch, getState) => {
        try {

            const details = {
                email: email,
                password: password,
            };
            console.log(details)

            const res = await fetch(`${ApiUrl}/users/login`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(details),
            });
            dispatch(setUser(res))
            if (res.ok) {
                const data = await res.json();
                console.log(data)
                history.push("/")
                dispatch(setUser(data))

            } else {
                alert("Wrong credentials, try again!");
            }
        } catch (error) {
            console.log(error);
        }
    }
};
