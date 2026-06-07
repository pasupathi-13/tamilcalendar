import './MonthlyCalendar.css'

const MonthlyCalendar = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const firstDayOffset = 0 // June 2026 starts on Sunday? Adjust as needed
  const totalDays = 30
  const blanks = Array(firstDayOffset).fill(null)
  const dates = Array.from({ length: totalDays }, (_, i) => i + 1)
  const events = { 6: '🌕 Full Moon', 21: '🌑 New Moon', 14: '💒 Wedding Muhurtham' }

  return (
    <div className="page-container">
      <h1 className="page-title">📅 Monthly Calendar – June 2026</h1>
      <p className="page-subtitle">ஆனி (Aani) | Shukla Paksha – Krishna Paksha</p>
      <div className="calendar-grid">
        {days.map(day => <div key={day} className="calendar-weekday">{day}</div>)}
        {blanks.map((_, i) => <div key={`blank-${i}`} className="calendar-day empty"></div>)}
        {dates.map(date => (
          <div key={date} className="calendar-day">
            <span className="day-number">{date}</span>
            {events[date] && <span className="event-marker">{events[date]}</span>}
          </div>
        ))}
      </div>
      <div className="note-card">📌 Full Moon: June 6 | New Moon: June 21 | Pradosham: June 11, 26</div>
    </div>
  )
}
export default MonthlyCalendar