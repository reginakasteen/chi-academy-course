"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import NotificationProvider from "@/providers/NotificationProvider";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <NotificationProvider>
        {children}
      </NotificationProvider>
    </Provider>
  );
}
