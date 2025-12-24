import React, { memo, Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./store";
import { NotificationProvider } from "../shared/components/notification-provider";
import Suspensee from "../shared/ui/Suspensee";

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
            <Suspense fallback={<Suspensee />}>{children}</Suspense>
          </NotificationProvider>
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  );
};

export default memo(AppProvider);
