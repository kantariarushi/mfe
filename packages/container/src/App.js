import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { createBrowserHistory } from 'history'
import Header from './components/Header';
import Progress from './components/Progress';
import { Provider } from "react-redux";
import { store } from "./store/store";

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const CartLazy = lazy(() => import('./components/CartApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));
const ToycartLazy = lazy(() => import('./components/ToycartApp'));

const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
})

const history = createBrowserHistory();

export default () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        if (isSignedIn) {
            history.push('/');
        }
    }, [isSignedIn])

    return (
        <Provider store={store}>
            <Router history={history}>
                <StylesProvider generateClassName={generateClassName}>
                    <div>
                        <Header onSignOut={() => setIsSignedIn(false)} isSignedIn={isSignedIn} />
                        <Suspense fallback={<Progress />}>
                            <Switch>
                                <Route path='/auth'>
                                    <AuthLazy onSignIn={() => setIsSignedIn(true)} />
                                </Route>
                                <Route path="/dashboard">
                                    {!isSignedIn && <Redirect to="/" />}
                                    <DashboardLazy store={store} />
                                </Route>
                                {/* <Route path='/cart'>
                            <CartLazy />
                        </Route> */}
                                <Route path='/cart'>
                                    <ToycartLazy onSignIn={() => setIsSignedIn(true)} store={store} />
                                </Route>
                                <Route path='/'>
                                    <MarketingLazy store={store} />
                                </Route>
                            </Switch>
                        </Suspense>
                    </div>
                </StylesProvider>
            </Router>
        </Provider>
    )
}