import React, { useState, useEffect } from 'react';

const sessionStartTime = Date.now();


export default function TimerSesi() {
  const [seconds, setSeconds] = useState(()=> Math.floor((Date.now() - sessionStartTime) / 1000));

  useEffect(() => {
     
    const intervalId = setInterval(() => {
      setSeconds(Math.floor((Date.now() - sessionStartTime) / 1000));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div style={{ fontSize: '14px', padding: '4px 8px', backgroundColor: '#e6f7ff', border: '1px solid #91d5ff', borderRadius: '4px' }}>
        Lama Sesi: <strong>{formatTime(seconds)}</strong>
    </div>
  );
}