import TransactionItem from './TransactionItem'
import './TransactionList.css'

export interface Transaction {
  id: string
  merchant: string
  amount: number
  isCredit: boolean
  description: string
  date: string
  cashbackPercent?: number
  isPending?: boolean
  location?: string
  icon?: string
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    merchant: 'Apple',
    amount: 14.06,
    isCredit: false,
    description: 'Card Number Used',
    date: 'Yesterday',
    cashbackPercent: 3,
    isPending: true,
    location: 'Diana',
  },
  {
    id: '2',
    merchant: 'Payment',
    amount: 174.0,
    isCredit: true,
    description: 'From JPMorgan Chase Bank Natio...',
    date: 'Tuesday',
    location: '',
  },
  {
    id: '3',
    merchant: 'Apple',
    amount: 3.24,
    isCredit: false,
    description: 'Card Number Used',
    date: 'Tuesday',
    cashbackPercent: 3,
    location: 'Diana',
  },
  {
    id: '4',
    merchant: 'Payment',
    amount: 99.71,
    isCredit: true,
    description: 'From JPMorgan Chase Bank Natio...',
    date: 'Saturday',
    location: '',
  },
  {
    id: '5',
    merchant: 'Payment',
    amount: 73.58,
    isCredit: true,
    description: 'From JPMorgan Chase Bank Natio...',
    date: 'Monday',
    location: '',
  },
  {
    id: '6',
    merchant: 'IKEA',
    amount: 21.61,
    isCredit: false,
    description: 'Round Rock, TX',
    date: '10/1/22',
    cashbackPercent: 2,
    location: 'Round Rock, TX',
  },
  {
    id: '7',
    merchant: 'Target',
    amount: 73.58,
    isCredit: false,
    description: 'Cedar Park, TX',
    date: '',
    cashbackPercent: 2,
    location: 'Cedar Park, TX',
  },
]

const TransactionList = () => {
  return (
    <div className="transaction-list-container">
      <h2 className="transaction-list-header">Latest Transactions</h2>
      <div className="transaction-list">
        {mockTransactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  )
}

export default TransactionList
