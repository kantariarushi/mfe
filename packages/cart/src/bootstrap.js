import React from 'react'
import ReactDOM from 'react-dom'
import { createMemoryHistory, createBrowserHistory } from 'history'
import App from './App';

//Mount function to start up the app
const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    });
    console.log('historyyyy ---->', onNavigate, initialPath)
    if(onNavigate){
        history.listen(onNavigate);
    }
    ReactDOM.render(<App history={history}/>,el);

    return {
        onParentNavigate({pathname: nextPathname}){
            const { pathname } = history.location;
            console.log('nextPathname ---->', nextPathname)
            if(pathname !== nextPathname){
                history.push(nextPathname)
            }
        }
    }
};

//if we are in development and in isolation,
//call mount immdiately
if(process.env.NODE_ENV === 'development'){
    const devRoot = document.querySelector('#_cart-dev-root');
    if(devRoot){
        mount(devRoot, { defaultHistory: createBrowserHistory() });
    }
}

//we are running through contaniner
//and we should export the mount function
export { mount };