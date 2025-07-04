import React from 'react'
import Landing from '../ClientComponents/landing'
import TransactionsTable from './transactions'

const BaseTransactions = () => {
  return (
    <div>
        <Landing/>
        <TransactionsTable/>
    </div>
  )
}

export default BaseTransactions