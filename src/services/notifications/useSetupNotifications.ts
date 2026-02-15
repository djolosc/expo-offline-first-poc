import * as Notifications from "expo-notifications";
import { useEffect } from "react";

export const useSetupNotifications = () => {
  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        console.warn("Notifications not granted");
      }
    })();
  }, []);
};
