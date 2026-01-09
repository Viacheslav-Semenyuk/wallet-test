import { useState, useEffect } from 'react'
import { getDailyPoints } from '../utils/dailyPoints'
import './Card.css'

const DailyPointsCard = () => {
  const [points, setPoints] = useState('0')

  useEffect(() => {
    // Calculate daily points based on current season and day index
    const calculatedPoints = getDailyPoints()
    setPoints(calculatedPoints)
  }, [])

  return (
    <div className="card points-card">
      <div className="card-content">
        <div className="points-label">Daily Points</div>
        <div className="points-amount">{points}</div>
      </div>
    </div>
  )
}

export default DailyPointsCard
