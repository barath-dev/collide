import './Countdown.css'

function Countdown() {
  return (
    <>
            <div className="flex flex-col element">
            <span className="text-2xl font-bold">00</span>
            <span className="text-xs">Days</span>
            </div>
            <div className="flex flex-col element">
            <span className="text-2xl font-bold">00</span>
            <span className="text-xs">Hours</span>
            </div>
            <div className="flex flex-col element">
            <span className="text-2xl font-bold">00</span>
            <span className="text-xs">Minutes</span>
            </div>
            <div className="flex flex-col element">
            <span className="text-2xl font-bold">00</span>
            <span className="text-xs">Seconds</span>
            </div>
    </>
  )
}

export default Countdown