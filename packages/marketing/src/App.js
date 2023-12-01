import React, {useEffect} from "react";
import { Switch, Route, Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import reducer from "../reducers/marketing.reducer";
import { Provider } from "react-redux";

import Landing from './components/Landing'
import Pricing from './components/Pricing'

const generateClassName = createGenerateClassName({
    productionPrefix: 'ma'
})

const App = ({history}) => {
    return(
            <div>
                <StylesProvider generateClassName={generateClassName}>
                    <Router history={history}>
                        <Switch>
                            <Route exact path='/pricing' component={Pricing}></Route>
                            <Route path='/' component={Landing} />
                        </Switch>
                    </Router>
                </StylesProvider>
            </div>
    )
};

const AppWrapper = (props) => {
    const { store = {} } = props;
    useEffect(() => {
      store.injectReducer("app1", reducer);
    }, []);
    return (
      <Provider store={store || {}}>
        <App history={props.history}/>
      </Provider>
    );
  };
  
  export default AppWrapper;