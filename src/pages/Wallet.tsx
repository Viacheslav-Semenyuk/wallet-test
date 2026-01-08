import BalanceCard from '../components/BalanceCard'
import PaymentStatusCard from '../components/PaymentStatusCard'
import DailyPointsCard from '../components/DailyPointsCard'
import TransactionList from '../components/TransactionList'
import './Wallet.css'

const Wallet = () => {
  return (
    <div className="wallet-page">
      <div className="wallet-content">
        <BalanceCard />
        <PaymentStatusCard />
        <DailyPointsCard />
        <TransactionList />
      </div>
    </div>
  )
}

export default Wallet
