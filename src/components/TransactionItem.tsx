import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Transaction } from './TransactionList'
import { formatTransactionDate } from '../utils/dateFormat'
import './TransactionItem.css'

interface TransactionItemProps {
  transaction: Transaction
}

const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/transaction/${transaction.id}`)
  }
  const getIconContent = () => {
    switch (transaction.iconType) {
      case 'apple':
        return (
          <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" fill="white"/>
          </svg>
        )
      case 'payment':
        return (
          <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" fill="white"/>
          </svg>
        )
      case 'ikea':
        return <div className="ikea-text">IKEA</div>
      case 'target':
        return (
          <div className="target-icon-container">
            <div className="target-ring target-ring-outer-red"></div>
            <div className="target-ring target-ring-white"></div>
            <div className="target-ring target-ring-inner-red"></div>
            <div className="target-center-white"></div>
          </div>
        )
      default:
        return <span>{transaction.merchant[0].toUpperCase()}</span>
    }
  }

  const getIconClassName = () => {
    return `transaction-icon transaction-icon-${transaction.iconType}`
  }

  const isCredit = transaction.type === 'Credit'
  const formattedDate = formatTransactionDate(transaction.date)

  return (
    <div className="transaction-item" onClick={handleClick}>
      <div className={getIconClassName()}>
        {getIconContent()}
      </div>
      <div className="transaction-details">
        <div className="transaction-top-row">
          <div className="transaction-merchant">{transaction.merchant}</div>
          <div className="transaction-amount-right">
            <div className={`transaction-amount ${isCredit ? 'credit' : 'debit'}`}>
              {isCredit ? '+' : ''}${transaction.amount.toFixed(2)}
            </div>
          </div>
        </div>
        <div className="transaction-description-row">
          <div className="transaction-description">
            {transaction.isPending && <span className="pending-prefix">Pending · </span>}
            {transaction.description}
          </div>
          {transaction.cashbackPercent && (
            <div className="transaction-cashback">{transaction.cashbackPercent}%</div>
          )}
        </div>
        <div className="transaction-meta">
          {transaction.authorizedUser && formattedDate ? (
            <>
              <span className="transaction-user">{transaction.authorizedUser}</span>
              <span> - </span>
              <span className="transaction-date">{formattedDate}</span>
            </>
          ) : transaction.authorizedUser ? (
            <span className="transaction-user">{transaction.authorizedUser}</span>
          ) : formattedDate ? (
            <span className="transaction-date">{formattedDate}</span>
          ) : null}
        </div>
      </div>
      <div className="transaction-chevron">
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    </div>
  )
}

export default TransactionItem
