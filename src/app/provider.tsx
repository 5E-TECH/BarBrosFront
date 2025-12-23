import React, { memo } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./store";
import { NotificationProvider } from "../shared/components/notification-provider";

const queryClient = new QueryClient();

type Props = {
  children?: React.ReactNode;
};

const AppProvider = ({ children }: Props) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <NotificationProvider>
              {children}
          </NotificationProvider>
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  );
};

export default memo(AppProvider);
