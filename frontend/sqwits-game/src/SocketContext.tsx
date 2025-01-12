import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

// Define a type for the context's value (the Socket instance or null)
interface SocketContextType {
  socket: Socket | null;
}

// Create the context with the default value set to null
const SocketContext = createContext<SocketContextType | undefined>(undefined);

// Custom hook to use the WebSocket context
export const useSocket = (): SocketContextType => {
  const context = React.useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

// Define the provider's props type
interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io("http://127.0.0.1:5051/");  // Your Flask SocketIO server URL
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
