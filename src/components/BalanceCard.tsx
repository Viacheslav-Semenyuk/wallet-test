import { useState, useEffect } from 'react'
import './Card.css'

const BalanceCard = () => {
  const [balance, setBalance] = useState(0)
  const [available, setAvailable] = useState(0)

  useEffect(() => {
    // Generate random balance between $10 and $200
    const randomBalance = (Math.random() * 190 + 10).toFixed(2)
    // Generate random available amount between $500 and $3000
    const randomAvailable = (Math.random() * 2500 + 500).toFixed(2)
    setBalance(parseFloat(randomBalance))
    setAvailable(parseFloat(randomAvailable))
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  return (
    <div className="card balance-card">
      <div className="card-content">
        <div className="balance-main">
          <div className="balance-label">Card Balance</div>
          <div className="balance-amount">${formatCurrency(balance)}</div>
        </div>
        <div className="balance-available">${formatCurrency(available)} available</div>
      </div>
    </div>
  )
}

export default BalanceCard
