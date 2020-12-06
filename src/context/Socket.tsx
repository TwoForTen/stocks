import { createContext } from 'react';
import io, { Socket } from 'socket.io-client';

interface SocketContextType {
  socket: typeof Socket;
}

export const SocketContext = createContext({} as SocketContextType);

const SocketProvider: React.FC = ({ children }) => {
  const socket = io('http://localhost:3001');

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
