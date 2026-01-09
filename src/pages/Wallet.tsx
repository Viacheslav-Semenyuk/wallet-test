import BalanceCard from '../components/BalanceCard'
import PaymentStatusCard from '../components/PaymentStatusCard'
import DailyPointsCard from '../components/DailyPointsCard'
import TransactionList from '../components/TransactionList'
import './Wallet.css'

const Wallet = () => {
  return (
    <div className="wallet-page">
      <div className="wallet-content">
        <div className="cards-grid">
          <div className="cards-left-group">
            <BalanceCard />
            <DailyPointsCard />
          </div>
          <PaymentStatusCard />
        </div>
        <TransactionList />
      </div>
    </div>
  )
}

export default Wallet
