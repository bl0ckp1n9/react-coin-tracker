import { useQuery } from "react-query";
import { Link, Route, Switch, useLocation, useParams, useRouteMatch } from "react-router-dom"
import styled from "styled-components";
import { fetchCoinInfo, fetchTickers } from "./api";
import { Chart } from "./Chart";
import { Price } from "./Price";
import { Helmet } from 'react-helmet'
import { Button } from "@mui/material";


const Container = styled.div`
    padding: 0px 20px;
    max-width:480px;
    margin:0 auto;
`;

const Header = styled.header`
    height:15vh;
    display:flex;
    align-items:center;
    justify-content:center;
    margin-top:20px;
`;

const Title = styled.h1`
    font-size:48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.div`
    text-align:center;
`

interface RouteParams {
    coinId: string;
}
interface RouteState {
    name: string
};

export interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    logo: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    whitepaper: object;
    first_data_at: string;
    last_data_at: string;
}

export interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            price: number,
            volume_24h: number,
            volume_24h_change_24h: number,
            market_cap: number,
            market_cap_change_24h: number,
            percent_change_15m: number,
            percent_change_30m: number,
            percent_change_1h: number,
            percent_change_6h: number,
            percent_change_12h: number,
            percent_change_24h: number,
            percent_change_7d: number,
            percent_change_30d: number,
            percent_change_1y: number,
            ath_price: number,
            ath_date: string,
            percent_from_price_ath: number
        }
    };
}


const initInfo = {
    id: "",
    name: "",
    symbol: "",
    rank: 0,
    is_new: false,
    is_active: false,
    type: "",
    logo: "",
    description: "",
    message: "",
    open_source: false,
    started_at: "",
    development_status: "",
    hardware_wallet: false,
    proof_type: "",
    org_structure: "",
    hash_algorithm: "",
    whitepaper: {},
    first_data_at: "",
    last_data_at: "",
}


const initPrice = {
    id: "",
    name: "",
    symbol: "",
    rank: 0,
    circulating_supply: 0,
    total_supply: 0,
    max_supply: 0,
    beta_value: 0,
    first_data_at: "",
    last_updated: "",
    quotes: {
        USD: {
            price: 0,
            volume_24h: 0,
            volume_24h_change_24h: 0,
            market_cap: 0,
            market_cap_change_24h: 0,
            percent_change_15m: 0,
            percent_change_30m: 0,
            percent_change_1h: 0,
            percent_change_6h: 0,
            percent_change_12h: 0,
            percent_change_24h: 0,
            percent_change_7d: 0,
            percent_change_30d: 0,
            percent_change_1y: 0,
            ath_price: 0,
            ath_date: "",
            percent_from_price_ath: 0
        }
    },
}
const Overview = styled.div`
display: flex;
justify-content: space-between;
background-color: rgba(0, 0, 0, 0.5);
padding: 10px 20px;
border-radius: 10px;
`;
const OverviewItem = styled.div`
display: flex;
flex-direction: column;
align-items: center;
span:first-child {
    font-size: 10px;
font-weight: 400;
text-transform: uppercase;
margin-bottom: 5px;
    }
`;
const Description = styled.p`
margin: 20px 0px;
`;

const Tabs = styled.div`
    display:grid;
    grid-template-columns: repeat(2,1fr);
    margin: 25px 0px;
    gap:10px;
`

const Tab = styled.span<{ isActive: boolean }>`
    text-align:center;
    text-transform:uppercase;
    font-size:12px;
    font-weight: 400;
    background-color: rgba(0,0,0,0.5);
    padding: 7px 0px;
    border-radius: 10px;
    color: ${props => props.isActive ? props.theme.accentColor : props.theme.textColor};
    a {
        display:block
    }
`
export const Coin = () => {
    const { coinId } = useParams<RouteParams>()
    const { state } = useLocation<RouteState>();
    const priceMatch = useRouteMatch(`${process.env.PUBLIC_URL}/:coinId/price`);
    const chartMatch = useRouteMatch(`${process.env.PUBLIC_URL}/:coinid/chart`);

    const { isLoading: infoLoading, data: info } = useQuery<InfoData>(["info", coinId], () => fetchCoinInfo(coinId));
    const { isLoading: tickersLoading, data: tickers } = useQuery<PriceData>(["tickers", coinId], () => fetchTickers(coinId), { refetchInterval: 5000 })

    const loading = infoLoading || tickersLoading;
    return (
        <Container>
            <Helmet>
                <title>{state?.name ? state.name : info?.name}</title>
            </Helmet>
            <Header>
                <Title>{state?.name ? state.name : info?.name}</Title>
            </Header>
            {
                loading ? <Loader>Loading...</Loader>
                    :
                    <>
                        <Link to={`${process.env.PUBLIC_URL}/`} >
                            <Button variant="text" color="secondary">Back</Button>
                        </Link>
                        <Overview>
                            <OverviewItem>
                                <span>Rank:</span>
                                <span>{info?.rank}</span>
                            </OverviewItem>
                            <OverviewItem>
                                <span>Symbol:</span>
                                <span>${info?.symbol}</span>
                            </OverviewItem>
                            <OverviewItem>
                                <span>Price:</span>
                                <span>{tickers?.quotes.USD.price ? `$${tickers?.quotes.USD.price.toFixed(2)}` : "Failed"}</span>
                            </OverviewItem>
                        </Overview>
                        <Description>{info?.description}</Description>
                        <Overview>
                            <OverviewItem>
                                <span>Total Suply:</span>
                                <span>{tickers?.total_supply}</span>
                            </OverviewItem>
                            <OverviewItem>
                                <span>Max Supply:</span>
                                <span>{tickers?.max_supply}</span>
                            </OverviewItem>
                        </Overview>
                        <Tabs>
                            <Tab isActive={chartMatch !== null}>
                                <Link to={`${process.env.PUBLIC_URL}/${coinId}/chart`}>
                                    Chart
                                </Link>
                            </Tab>
                            <Tab isActive={priceMatch !== null}>
                                <Link to={`${process.env.PUBLIC_URL}/${coinId}/price`}>
                                    Price
                                </Link>
                            </Tab>
                        </Tabs>

                        <Switch>
                            <Route path={`${process.env.PUBLIC_URL}/${coinId}/price`}>
                                <Price coinId={coinId} />
                            </Route >
                            <Route path={`${process.env.PUBLIC_URL}/${coinId}/chart`}>
                                <Chart coinId={coinId} />
                            </Route>
                        </Switch>
                    </>
            }
        </Container >
    )
}


