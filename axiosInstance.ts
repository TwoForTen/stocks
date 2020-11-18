import axios from 'axios';

export const iex = axios.create({
    baseURL: 'https://cloud.iexapis.com/stable',
    params: {
        token: 'pk_ea1b6441fe2444b2baeb2edc109659aa'
    }
})

export const finnhub = axios.create({
    baseURL: 'https://finnhub.io/api/v1',
    params: {
        token: 'buqgi8v48v6qdskvns3g'
    }
})