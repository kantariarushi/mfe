import React from 'react'
import ReactDOM from 'react-dom'
import { createMemoryHistory, createBrowserHistory } from 'history'
import App from './App';

//Mount function to start up the app
const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath, store }) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    });
    if(onNavigate){
        history.listen(onNavigate);
    }
    ReactDOM.render(<App onSignIn={onSignIn} history={history} store={store}/>,el);

    return {
        onParentNavigate({pathname: nextPathname}){
            const { pathname } = history.location;

            if(pathname !== nextPathname){
                history.push(nextPathname)
            }
        }
    }
};

//if we are in development and in isolation,
//call mount immdiately
if(process.env.NODE_ENV === 'development'){
    const devRoot = document.querySelector('#_toycart-dev-root');
    if(devRoot){
        mount(devRoot, { defaultHistory: createBrowserHistory() });
    }
}

//we are running through contaniner
//and we should export the mount function
export { mount };