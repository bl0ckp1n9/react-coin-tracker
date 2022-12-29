import React, { useEffect, useReducer, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "./api";

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

const CoinsList = styled.ul`
    margin-top:20px;
`;

const Coin = styled.li`
    background-color : white;
    color: ${props => props.theme.bgColor};
    margin-bottom:10px;
    padding:20px;
    border-radius:15px;
    a {
        display:flex;
        align-items:center;
        padding:20px;
        transition: color 0.3s ease-in-out;
        font-weight: 400;
    }
    &:hover {
        a {
            color: ${props => props.theme.accentColor} 
        }
    }
`;

const Img = styled.img`
    width:35px;
    height:35px;
    margin-right: 10px;
`

const Title = styled.h1`
    font-size:48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
    text-align:center;
`

interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string
}



export const Coins = () => {
    const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins)
    return (
        <Container>
            <Helmet>
                Coins
            </Helmet>
            <Header>
                <Title>Coins</Title>
            </Header>
            {isLoading ? <Loader>Loading...</Loader> : <CoinsList>
                {data?.slice(0, 100).map(coin =>
                    <Coin key={coin.id}>
                        <Link to={{
                            pathname: `/${coin.id}`,
                            state: { name: coin.name }
                        }}>
                            <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                            {coin.name} &rarr;
                        </Link>
                    </Coin>
                )}
            </CoinsList>}
        </Container >
    );
};
