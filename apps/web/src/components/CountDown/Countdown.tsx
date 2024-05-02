import { useState, useEffect } from 'react';
import S from './Countdown.module.css'

function Countdown() {

  const useCountdown = (targetDate: string | number | Date) => {
    const countDownDate = new Date(targetDate).getTime();
  
    const [countDown, setCountDown] = useState(
      countDownDate - new Date().getTime()
    );
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCountDown(countDownDate - new Date().getTime());
      }, 1000);
  
      return () => clearInterval(interval);
    }, [countDownDate]);
  
    return getReturnValues(countDown);
  };
  
  const getReturnValues = (countDown: number) => {
    // calculate time left
    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);
  
    return [days, hours, minutes, seconds];
  };

  const [days, hours, minutes, seconds] = useCountdown('2024-05-10T00:00:00');

  

  return (    
    
    <div className={S.container}>
            <div className={S.element}>
            <span className={S.timer}>{days}</span>
            <span className={S.subtitle}>days</span>
            </div>
            <div className={S.element}>
            <span className={S.timer}>{hours}</span>
            <span className={S.subtitle}>hours</span>
            </div>
            <div className={S.element}>
            <span className={S.timer}>{minutes}</span>
            <span className={S.subtitle}>minutes</span>
            </div>
            <div className={S.element}>
            <span className={S.timer}>{seconds}</span>
            <span className={S.subtitle}>seconds</span>
            </div>
        </div>
  )
}

export default Countdown