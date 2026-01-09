import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import './Card.css'

const PaymentStatusCard = () => {
  return (
    <div className="card payment-status-card">
      <div className="card-content">
        <div className="payment-status-left">
          <div className="payment-status-title">No Payment Due</div>
          <div className="payment-status-message">
            You've paid your September balance.
          </div>
        </div>
        <div className="payment-status-icon-wrapper">
          <FontAwesomeIcon icon={faCheck} className="payment-status-icon" />
        </div>
      </div>
    </div>
  )
}

export default PaymentStatusCard
