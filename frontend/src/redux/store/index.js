import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducer";
import cartReducer from "../reducer/cartReducer";
import shopReducer from "../reducer/shopReducer";
import dashboardReducer from "../reducer/dashboardReducer";

const reducer = combineReducers({
  general: rootReducer,
  dashboard: dashboardReducer,
  carro: cartReducer,
  tienda: shopReducer,
});

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
