"use client";
import { Provider } from "react-redux";
import store, { persistor } from "../index";
import { PersistGate } from "redux-persist/lib/integration/react";

export function CustomProvider({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
