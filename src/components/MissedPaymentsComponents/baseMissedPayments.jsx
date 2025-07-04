import React from 'react'
import Landing from '../ClientComponents/landing'
import MissedPaymentsTable from './missedpayments'

const BaseMissedPayments = () => {
  return (
    <div>
        <Landing/>
        <MissedPaymentsTable/>
    </div>
  )
}

export default BaseMissedPayments