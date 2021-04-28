import { useState, useEffect } from 'react';
/** 
 * 可以將倒數時間放進第一個參數內，預設為一分鐘。
 * */
const useTimerLock = (period: number = 60000) => {
  const [timesUp, setTimesUp] = useState(false);

  useEffect(() => {
    //setInterval定期檢查
    let lastTouch = Date.now();

    const interval = setInterval(() => {
      let now = Date.now();

      let timeGap = now - lastTouch;
      if (timeGap > period) {
        setTimesUp(true);
      }
    }, period / 6);

    function handler() {
      setTimesUp(false);//點擊時重新紀錄
      lastTouch = Date.now();
    }
    window.addEventListener(
      'touchstart',
      handler,
      false
    );

    return (() => {//ComponentWillUnmount
      clearInterval(interval)
      removeEventListener('touchstart', handler);
    });
  }, [])
  return timesUp;
}

export default useTimerLock;