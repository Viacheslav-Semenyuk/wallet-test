import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { Transaction } from '../components/TransactionList'
import { formatTransactionDate } from '../utils/dateFormat'
import transactionsData from '../data/transactions.json'
import './TransactionDetail.css'

const TransactionDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [transaction, setTransaction] = useState<Transaction | null>(null)

  useEffect(() => {
    if (id) {
      const found = (transactionsData as Transaction[]).find(t => t.id === id)
      setTransaction(found || null)
    }
  }, [id])

  const getIconContent = () => {
    if (!transaction) return null
    
    switch (transaction.iconType) {
      case 'apple':
        return (
          <svg viewBox="0 0 24 24" width="52" height="52" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" fill="white"/>
          </svg>
        )
      case 'payment':
        return (
          <svg viewBox="0 0 24 24" width="52" height="52" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" fill="white"/>
          </svg>
        )
      case 'ikea':
        return <div className="detail-ikea-text">IKEA</div>
      case 'target':
        return (
          <div className="detail-target-icon-container">
            <div className="detail-target-ring detail-target-ring-outer-red"></div>
            <div className="detail-target-ring detail-target-ring-white"></div>
            <div className="detail-target-ring detail-target-ring-inner-red"></div>
            <div className="detail-target-center-white"></div>
          </div>
        )
      default:
        return <span className="detail-icon-fallback">{transaction.merchant[0].toUpperCase()}</span>
    }
  }

  const getIconClassName = () => {
    if (!transaction) return ''
    return `detail-icon detail-icon-${transaction.iconType}`
  }

  if (!transaction) {
    return (
      <div className="transaction-detail-page">
        <div className="transaction-detail-header">
          <button className="back-button" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <h1>Transaction Not Found</h1>
        </div>
      </div>
    )
  }

  const isCredit = transaction.type === 'Credit'
  const formattedDate = formatTransactionDate(transaction.date)

  return (
    <div className="transaction-detail-page">
      <div className="transaction-detail-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </div>
      <div className="transaction-detail-content">
        <div className="transaction-detail-card">
          <div className="detail-icon-wrapper">
            <div className={getIconClassName()}>
              {getIconContent()}
            </div>
          </div>
          
          <div className="detail-merchant-name">{transaction.merchant}</div>
          
          <div className={`detail-amount-large ${isCredit ? 'credit' : 'debit'}`}>
            {isCredit ? '+' : ''}${transaction.amount.toFixed(2)}
          </div>

          <div className="detail-info-section">
            <div className="detail-info-row">
              <div className="detail-info-label">Type</div>
              <div className="detail-info-value">{transaction.type}</div>
            </div>
            
            <div className="detail-info-row">
              <div className="detail-info-label">Date</div>
              <div className="detail-info-value">{formattedDate || transaction.date || 'N/A'}</div>
            </div>

            {transaction.authorizedUser && (
              <div className="detail-info-row">
                <div className="detail-info-label">Authorized User</div>
                <div className="detail-info-value">{transaction.authorizedUser}</div>
              </div>
            )}

            <div className="detail-info-row">
              <div className="detail-info-label">Status</div>
              <div className="detail-info-value">{transaction.isPending ? 'Pending' : 'Completed'}</div>
            </div>

            <div className="detail-info-row">
              <div className="detail-info-label">Description</div>
              <div className="detail-info-value">{transaction.description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionDetail
