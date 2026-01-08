import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faCreditCard } from '@fortawesome/free-solid-svg-icons'
import { Transaction } from './TransactionList'
import './TransactionItem.css'

interface TransactionItemProps {
  transaction: Transaction
}

const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const getMerchantIcon = (merchant: string) => {
    // For demo purposes, using simple icons and backgrounds
    // In production, you'd use actual merchant logos
    if (merchant === 'Apple') {
      return <div className="merchant-icon apple-icon">🍎</div>
    } else if (merchant === 'Payment') {
      return (
        <div className="merchant-icon payment-icon">
          <FontAwesomeIcon icon={faCreditCard} />
        </div>
      )
    } else if (merchant === 'IKEA') {
      return <div className="merchant-icon ikea-icon">I</div>
    } else if (merchant === 'Target') {
      return <div className="merchant-icon target-icon">T</div>
    }
    return <div className="merchant-icon default-icon">{merchant[0]}</div>
  }

  return (
    <div className="transaction-item">
      <div className="transaction-icon">
        {getMerchantIcon(transaction.merchant)}
      </div>
      <div className="transaction-details">
        <div className="transaction-main">
          <div className="transaction-merchant">{transaction.merchant}</div>
          <div className="transaction-amount-wrapper">
            <div
              className={`transaction-amount ${
                transaction.isCredit ? 'credit' : 'debit'
              }`}
            >
              {transaction.isCredit ? '+' : ''}${transaction.amount.toFixed(2)}
            </div>
            {transaction.cashbackPercent && (
              <div className="transaction-cashback">
                {transaction.cashbackPercent}%
              </div>
            )}
          </div>
        </div>
        <div className="transaction-meta">
          <div className="transaction-description">
            {transaction.isPending && 'Pending - '}
            {transaction.description}
          </div>
          <div className="transaction-date-location">
            {transaction.location && transaction.location !== transaction.description && `${transaction.location} - `}
            {transaction.date}
          </div>
        </div>
      </div>
      <div className="transaction-arrow">
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    </div>
  )
}

export default TransactionItem
