import { compose, createStore, applyMiddleware } from "redux";
import { rootReducer } from "./reducers";
import { createEpicMiddleware } from "redux-observable";
import { rootEpic } from "./epics";
declare var window: any;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const epicMiddleware = createEpicMiddleware();
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(rootEpic);
