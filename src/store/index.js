import { createStore, compose, applyMiddleware } from "redux";
import RootReducer from "../redux-reducers"
import thunk from 'redux-thunk';



var store = createStore(
    RootReducer,
    compose(applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f)
);
store.subscribe(() => {
    //var str = store.getState();

})


export default store;