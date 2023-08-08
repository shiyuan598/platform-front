import React, { useEffect, useRef } from "react";
import flvjs from "flv.js";

export default function Video(props: { url: string }) {
    const videoRef = useRef<HTMLMediaElement>();
    // 初始化
    useEffect(() => {
        console.info("初始化视频组件");
        if (!videoRef.current) {
            return;
        }
        // 初始化视频
        const player = flvjs.createPlayer({
            type: "flv",
            isLive: true,
            hasAudio: false,
            url: props.url
        });
        // 绑定视频元素
        player.attachMediaElement(videoRef.current);

        // 加载和播放视频
        player.load();
        player.play();

        videoRef.current.addEventListener("keydown", (e) => {
            if (e.code === "Enter") {
                if (!document.fullscreenElement) {
                    videoRef.current?.requestFullscreen();
                }
            }
        });

        return () => {
            // 在组件卸载时销毁 flv.js 播放器实例
            player.destroy();
        };
    }, [props]);
    // @ts-ignore
    return <video controls={true} muted={true} ref={videoRef}></video>;
}
