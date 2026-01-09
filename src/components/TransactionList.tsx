import { useState, useEffect } from 'react'
import TransactionItem from './TransactionItem'
import transactionsData from '../data/transactions.json'
import './TransactionList.css'

export interface Transaction {
  id: string
  type: 'Payment' | 'Credit'
  amount: number
  merchant: string
  description: string
  date: string
  isPending: boolean
  authorizedUser: string | null
  iconType: 'apple' | 'payment' | 'ikea' | 'target'
  cashbackPercent: number | null
}

const TransactionList = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    // Load transactions from JSON file (limit to 10)
    setTransactions((transactionsData as Transaction[]).slice(0, 10))
  }, [])

  return (
    <div className="transaction-list-container">
      <h2 className="transaction-list-header">Latest Transactions</h2>
      <div className="transaction-list">
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  )
}

export default TransactionList
