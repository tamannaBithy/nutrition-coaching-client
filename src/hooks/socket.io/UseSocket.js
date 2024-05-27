"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { io } from "socket.io-client";

const useSocket = (event, callback) => {
  const { data: session } = useSession(); // Destructure data from useSession hook

  useEffect(() => {
    // Connect to the socket server
    const socket = io("http://localhost:8000");

    // Sending user data to the backend
    socket.emit("setup", session?.user);

    // Listen for the specified event from the server
    socket.on(event, callback);

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, [event, callback, session]); // Run effect whenever the event or callback changes
};

export default useSocket;
