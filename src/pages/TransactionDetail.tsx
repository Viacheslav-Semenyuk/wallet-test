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

  return (
    <div className="transaction-detail-page">
      <div className="transaction-detail-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <h1>Transaction Details</h1>
      </div>
      <div className="transaction-detail-content">
        <div className="transaction-detail-card">
          <div className="detail-section">
            <div className="detail-label">Merchant</div>
            <div className="detail-value">{transaction.merchant}</div>
          </div>
          <div className="detail-section">
            <div className="detail-label">Amount</div>
            <div className={`detail-value detail-amount ${isCredit ? 'credit' : 'debit'}`}>
              {isCredit ? '+' : ''}${transaction.amount.toFixed(2)}
            </div>
          </div>
          <div className="detail-section">
            <div className="detail-label">Description</div>
            <div className="detail-value">{transaction.description}</div>
          </div>
          <div className="detail-section">
            <div className="detail-label">Type</div>
            <div className="detail-value">{transaction.type}</div>
          </div>
          <div className="detail-section">
            <div className="detail-label">Status</div>
            <div className="detail-value">
              {transaction.isPending ? 'Pending' : 'Completed'}
            </div>
          </div>
          {transaction.authorizedUser && (
            <div className="detail-section">
              <div className="detail-label">Authorized User</div>
              <div className="detail-value">{transaction.authorizedUser}</div>
            </div>
          )}
          {transaction.cashbackPercent && (
            <div className="detail-section">
              <div className="detail-label">Cashback</div>
              <div className="detail-value">{transaction.cashbackPercent}%</div>
            </div>
          )}
          <div className="detail-section">
            <div className="detail-label">Date</div>
            <div className="detail-value">{formatTransactionDate(transaction.date) || transaction.date || 'N/A'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionDetail
