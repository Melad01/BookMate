import { useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import { useNotificationStore } from "../store";
import Notification from "../types/Notification";
import { END_POINT } from "../services/data";

const useNotifications = () => {
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );
  const notifications = useNotificationStore((state) => state.notifications);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${END_POINT}/notificationHub`)
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => console.log("SignalR connected"))
      .catch((err) =>
        console.error("SignalR connection error:", err.toString())
      );

    connection.on("ReceiveNotification", (id: string, message: string) => {
      const notification: Notification = { id, message, isRead: false };
      addNotification(notification);
      console.log(notification);
    });

    return () => {
      connection
        .stop()
        .catch((err) =>
          console.error("SignalR disconnection error:", err.toString())
        );
    };
  }, [addNotification]);

  return notifications;
};

export default useNotifications;
