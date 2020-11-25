import axios from 'axios';

export const iex = axios.create({
    baseURL: 'https://cloud.iexapis.com/stable',
    params: {
        token: 'pk_3b947a81cbae4bf58d17ac59be367efd'
    }
})

export const finnhub = axios.create({
    baseURL: 'https://finnhub.io/api/v1',
    params: {
        token: 'buqgi8v48v6qdskvns3g'
    }
})

export const alphavantage = axios.create({
    baseURL: 'https://www.alphavantage.co',
    params: {
        apikey: 'ZVB3LQ9SFLDYN3LM'
    }
})