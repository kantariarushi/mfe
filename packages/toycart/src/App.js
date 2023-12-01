import React, {useEffect} from "react";
import { Switch, Route, Router } from 'react-router-dom';
import { Provider } from "react-redux";
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import Cart from "./components/Cart";


const generateClassName = createGenerateClassName({
    productionPrefix: 'au'
})

const App = ({history}) => {
    return(
        <div>
        <StylesProvider generateClassName={generateClassName}>
            <Router history={history}>
                <Switch>
                    <Route path='/cart/signin'>
                        <Cart />
                    </Route> 
                </Switch>
            </Router>
        </StylesProvider>
    </div>
    )
};

// export default ({history, onSignIn}) => {
//     return(
//         <div>
//             <StylesProvider generateClassName={generateClassName}>
//                 <Router history={history}>
//                     <Switch>
//                         <Route path='/cart/signin'>
//                             <Cart />
//                         </Route> 
//                     </Switch>
//                 </Router>
//             </StylesProvider>
//         </div>
//     )
// };

const AppWrapper = (props) => {
    const { store = {} } = props;
    // useEffect(() => {
    //   store.injectReducer("toyStoreReducer", reducer);
    // }, []);
    return (
      <Provider store={store || {}}>
        <App history={props.history}/>
      </Provider>
    );
  };
  
  export default AppWrapper;