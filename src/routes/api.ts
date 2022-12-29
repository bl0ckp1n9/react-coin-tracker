import { InfoData, PriceData } from "./Coin"

const BASE_URL = "https://api.coinpaprika.com/v1"

export const fetchCoins = async (): Promise<[]> => {
    return await (await fetch(`${BASE_URL}/coins`)).json()
}

export const fetchCoinInfo = async (coinId: string): Promise<InfoData> => {
    return await (await fetch(`${BASE_URL}/coins/${coinId}`)).json()
}


export const fetchTickers = async (coinId: string): Promise<PriceData> => {
    return await (await fetch(`${BASE_URL}/tickers/${coinId}`)).json()
}


export const fetchCoinHistory = async (coinId: string) => {
    const NOMAD_URL = "https://ohlcv-api.nomadcoders.workers.dev/"
    // const endDate = Math.floor(Date.now() / 1000)
    // const startDate = endDate - 60 * 60 * 23;
    // return await (await fetch(`${BASE_URL}/coins/${coinId}/ohlcv/historical/?start=${startDate}&end=${endDate}`)).json()
    return await (await fetch(`${NOMAD_URL}?coinId=${coinId}`)).json()
}