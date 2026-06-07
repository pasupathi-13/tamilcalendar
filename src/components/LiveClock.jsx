import { useState, useEffect } from 'react'
import './LiveClock.css'

const LiveClock = () => {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return (
    <div className="live-clock">
      <span className="date">{time.toLocaleDateString('ta-IN', options)}</span>
      <span className="time">{time.toLocaleTimeString('en-IN')}</span>
    </div>
  )
}
export default LiveClock