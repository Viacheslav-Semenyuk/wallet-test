import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import './Card.css'

const DailyPointsCard = () => {
  return (
    <div className="card points-card">
      <div className="card-content">
        <div className="points-label">Daily Points</div>
        <div className="points-container">
          <div className="points-icon-wrapper">
            <FontAwesomeIcon icon={faCheck} className="points-icon" />
          </div>
          <div className="points-amount">456K</div>
        </div>
      </div>
    </div>
  )
}

export default DailyPointsCard
