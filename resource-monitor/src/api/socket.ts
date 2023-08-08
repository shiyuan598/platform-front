declare global {
    interface Window {
        globalConfig?: any;
    }
}

const getWebSocket = () => {
    const globalConfig = window.globalConfig;
    const socketUrl = globalConfig.socketIo;
    console.info("纳尼", socketUrl);
    const socket = new WebSocket(socketUrl);

    // 连接成功时触发
    socket.onopen = () => {
        console.log("WebSocket连接已建立");
        socket.send("Hi, server");
    };

    // 接收消息时触发
    socket.onmessage = (event) => {
        const message = event.data;
        console.log("收到消息:", message);
    };

    // 连接关闭时触发
    socket.onclose = () => {
        console.log("WebSocket连接已关闭");
    };
    return socket;
};

export default getWebSocket;
