import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Base from './components/ClientComponents/baseClient';
import AddClient from './components/ClientComponents/AddClient';
import AddLoanOfficer from './components/LoanOfficierComponents/AddLoanOfficer';
import BaseLoanOfficers from './components/LoanOfficierComponents/baseLoanOfficers';
import AddLoanProducts from './components/LoanProductComponents/AddLoanProducts';
import BaseloanProducts from './components/LoanProductComponents/baseLoanProducts';
import BaseLoans from './components/LoanComponents/baseLoans';
import AddLoan from './components/LoanComponents/AddLoan';
import BaseCollateral from './components/CollateralComponents/baseCollateral';
import AddCollateral from './components/CollateralComponents/AddCollateral';
import BaseTransactions from './components/TransactionComponents/baseTransactions';
import AddTransaction from './components/TransactionComponents/AddTransaction';
import BaseRepayments from './components/RepaymentsComponents/baseRepayments';
import BaseMissedPayments from './components/MissedPaymentsComponents/baseMissedPayments';
import BaseDelinquency from './components/DelinquencyComponents/baseDelinquency';
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route index element={<Base/>} />
        <Route path="/clients" element={<Base/>}/>
        <Route path="/add-client" element={<AddClient/>}/>
        <Route path="/loan-officers" element={<BaseLoanOfficers/>}/>
        <Route path="/add-loan-officer" element={<AddLoanOfficer/>}/>
        <Route path="/loan-products" element={<BaseloanProducts/>}/>
        <Route path="/add-loan-product" element={<AddLoanProducts/>}/>
        <Route path="/loans" element={<BaseLoans/>}/>
        <Route path="/add-loan" element={<AddLoan/>}/>
        <Route path="/collaterals" element={<BaseCollateral/>}/>
        <Route path="/add-collateral" element={<AddCollateral/>}/>
        <Route path="/transactions" element={<BaseTransactions/>}/>
        <Route path="/add-transaction" element={<AddTransaction/>}/>
        <Route path="/repayments" element={<BaseRepayments/>}/> 
        <Route path="/missed-payments" element={<BaseMissedPayments/>}/>
        <Route path="/delinquency" element={<BaseDelinquency/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
