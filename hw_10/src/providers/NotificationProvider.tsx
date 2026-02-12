import React, { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import Swal from "sweetalert2";

import { baseURL } from "../api/axiosInstance";
import type { Notification } from "../types/types";

interface NotificationContextValue {
  notification: Notification | null;
}

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationContext =
  React.createContext<NotificationContextValue>({
    notification: null,
  });

const SOCKET_URL = `${baseURL}notifications`;

export const socket: Socket = io(SOCKET_URL, {
  transports: ["websocket"],
  withCredentials: true,
  reconnection: true,
  reconnectionDelay: 3000,
  autoConnect: true,
});

const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    const handleNewPost = (data: Notification) => {
      setNotification(data);

      Swal.fire({
        icon: "success",
        title: "New post created",
        text: `${data.user} added a new post: ${data.message}`,
        toast: true,
        position: "top",
        timer: 8000,
        showConfirmButton: false,
      });
    };

    socket.on("newPost", handleNewPost);

    return () => {
      socket.off("newPost", handleNewPost);
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ notification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
