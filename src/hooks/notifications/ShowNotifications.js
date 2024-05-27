"use client";

// Import necessary hooks and components
import useSocket from "@/hooks/socket.io/UseSocket";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

export default function ShowNotifications() {
  const { locale } = useParams();
  // Retrieve session data using useSession hook
  const { data: session } = useSession(); // Destructure data from useSession hook

  // Function to handle notification
  const handleNotification = (data) => {
    // Extract message from data
    const { message } = data;

    // Check if session and user are available
    if (session && session.user) {
      // Play notification sound
      const audio = new Audio("/assets/audio/order-placed.mp3");
      audio.play();

      // Display toast notification
      toast.success(<div>{message[locale]}</div>, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  // Function to handle deletion notification
  const handleDeleteNotification = (data) => {
    // Extract message from data
    const { message } = data;

    // Check if session and user are available
    if (session && session.user) {
      // Play notification sound
      const audio = new Audio("/assets/audio/order-placed.mp3");
      audio.play();

      // Display toast notification
      toast.warn(<div>{message[locale]}</div>, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  // Listen for socket events and call appropriate handler functions
  /* Order events */
  useSocket("orderPlacedAdmin", handleNotification);
  useSocket("orderPlacedUser", handleNotification);
  useSocket("orderStatusUser", handleNotification);
  useSocket("orderDeliveryStatusUser", handleNotification);
  useSocket("orderPaymentStatusUser", handleNotification);
  /* Customized meal events */
  useSocket("requestForCustomizedMealAdmin", handleNotification);
  useSocket("requestForCustomizedMealUser", handleNotification);
  useSocket("customizedMealConfirmed", handleNotification);
  useSocket("mealInputDeleted", handleDeleteNotification);
  /* Book sessions with instructor events */
  useSocket("sessionCreated", handleNotification);
  useSocket("newSessionBooked", handleNotification);
  useSocket("sessionUpdated", handleNotification);

  // Return null because this component doesn't render anything visible
  return null;
}
