"use client";

import { useEffect } from "react";

export function AskForNotificationPermission() {}

export default function ServiceWorker() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("service-worker.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
          // Subscribe to push notifications only if the registration is successful
          // askForNotificationPermission();
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);

  const urlBase64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
  };

  const saveSubscription = async (subscription) => {
    const response = await fetch("http://localhost:8000/api/v1/subscribe", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(subscription),
    });

    const contentType = response.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Invalid content type. Expected JSON.");
    }

    return response.json();
  };

  const subscribe = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const pushSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          "BJifpEIMX9V2SFeoxZ85yQ0G1kpDzn8e7Tntz9cgz-DVF7excJ0eENwOrwzSa-kH0VLIngNk6gWpEyJL7v82lSc"
        ),
      });

      const response = await saveSubscription(pushSubscription);
      console.log(response);
    } catch (error) {
      console.error("Failed to subscribe:", error);
    }
  };

  const askForNotificationPermission = async () => {
    try {
      if (typeof window !== "undefined" && "Notification" in window) {
        const permission = await Notification.requestPermission();
        console.log(permission);
        if (permission === "granted") {
          // User granted permission, now subscribe to push notifications
          subscribe();
        } else if (permission === "denied") {
          console.log("Notification permission denied.");
        } else if (permission === "default") {
          console.log(
            "Notification permission prompt closed without a choice."
          );
        }
      } else {
        console.log("Notification API not available.");
      }
    } catch (error) {
      console.error("Error asking for notification permission:", error);
    }
  };
}
