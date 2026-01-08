import './Card.css'

const BalanceCard = () => {
  return (
    <div className="card balance-card">
      <div className="card-content">
        <div className="balance-main">
          <div className="balance-label">Card Balance</div>
          <div className="balance-amount">$17.30</div>
        </div>
        <div className="balance-available">$1,482.70 Available</div>
      </div>
    </div>
  )
}

export default BalanceCard
