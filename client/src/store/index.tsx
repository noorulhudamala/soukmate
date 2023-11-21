import React, { createContext, useReducer, useContext } from "react";
import { storeIntialState } from "../types";
import { storeReducer } from "./reducer";

const storeInitialData: storeIntialState = {
    cartItems: [],
    showCart: false
};
const StoreContext = createContext<{
  state: storeIntialState;
  dispatch: React.Dispatch<any>;
}>({ state: storeInitialData, dispatch: () => null });

export const StoreProvider = ({children}: {children: React.ReactNode}) => {
  const [state, dispatch] = useReducer(storeReducer, storeInitialData);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);