import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Coin } from "./routes/Coin"
import { Coins } from "./routes/Coins"


export const Router = () => {
    return <BrowserRouter>
        <Switch>
            <Route path={`${process.env.PUBLIC_URL}/:coinId`}>
                <Coin />
            </Route>
            <Route path={`${process.env.PUBLIC_URL}/`} >
                <Coins />
            </Route>
        </Switch>
    </BrowserRouter>
}