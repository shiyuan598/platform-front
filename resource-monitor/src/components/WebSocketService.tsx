// WebSocketService.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

const WebSocketContext = createContext<{ socket: WebSocket | null; message: any }>({
  socket: null,
  message: '',
});

const WebSocketService: React.FC<{ socketUrl: string; children: React.ReactNode }> = ({ socketUrl, children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<string>('');

  const connectWebSocket = () => {
    const newSocket = new WebSocket(socketUrl);

    // 连接成功时触发
    newSocket.onopen = () => {
      console.log('WebSocket连接已建立');
      newSocket.send('Hi, server');
    };

    // 接收消息时触发
    newSocket.onmessage = (event) => {
      const messageFromServer = event.data;
      console.log('收到消息:', messageFromServer);
      setMessage(messageFromServer);
    };

    // 连接关闭时触发
    newSocket.onclose = () => {
      console.log('WebSocket连接已关闭');
      // Attempt to reconnect after a delay
      setTimeout(() => connectWebSocket(), 3000);
    };

    setSocket(newSocket);
  };

  useEffect(() => {
    connectWebSocket();

    // Clean up on unmount
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socketUrl]);

  return (
    <WebSocketContext.Provider value={{ socket, message }}>
      {children}
    </WebSocketContext.Provider>
  );
};

const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketService');
  }
  return context;
};

export { WebSocketService, useWebSocket };
