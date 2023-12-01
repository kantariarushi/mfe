import React from "react";
import { Switch, Route, Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import Cart from './components/Cart';

const generateClassName = createGenerateClassName({
    productionPrefix: 'ca'
})

const App = ({history}) => {
    return(
            <div>
                <StylesProvider generateClassName={generateClassName}>
                    <Router history={history}>
                        <Switch>
                            <Route path="/cart" component={Cart} />
                        </Switch>
                    </Router>
                </StylesProvider>
            </div>
    )
};
  
export default App;