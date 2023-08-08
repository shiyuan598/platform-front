import React, { useState, useRef, useEffect } from "react";
import RosBridgePlayer from '../store/player';

export default function useRosMsgs() {
  const player = useRef(new RosBridgePlayer());
  const [msgs, setMsgs] = useState({});
  useEffect(() => {
    let rafId = null;

    const getMsgs = () => {
      if (player.current) {
        const syncedMsgs = player.current.getSyncMessages();
        if (syncedMsgs) {
          setMsgs(syncedMsgs);
        }
      }
      rafId = requestAnimationFrame(getMsgs);
    }
    getMsgs();

    return () => {
      cancelAnimationFrame(rafId);
    }
  }, [player]);

  return msgs;
}