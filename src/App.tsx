import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Wallet from './pages/Wallet'
import TransactionDetail from './pages/TransactionDetail'
import './App.css'

function App() {
  return (
    <div className="mobile-container">
      <Router>
        <Routes>
          <Route path="/" element={<Wallet />} />
          <Route path="/transaction/:id" element={<TransactionDetail />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
