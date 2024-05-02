import S from './Countdown.module.css'

function Countdown() {
  return (
    
    <div className={S.container}>
            <div className={S.element}>
            <span className={S.timer}>00</span>
            <span className={S.subtitle}>days</span>
            </div>
            <div className={S.element}>
            <span className={S.timer}>00</span>
            <span className={S.subtitle}>hours</span>
            </div>
            <div className={S.element}>
            <span className={S.timer}>00</span>
            <span className={S.subtitle}>minutes</span>
            </div>
            <div className={S.element}>
            <span className={S.timer}>00</span>
            <span className={S.subtitle}>seconds</span>
            </div>
        </div>
  )
}

export default Countdown