import React from 'react'
import Landing from '../ClientComponents/landing'
import RepaymentsTable from './repayments'

const BaseRepayments = () => {
  return (
    <div>
        <Landing/>
        <RepaymentsTable/>
    </div>
  )
}

export default BaseRepayments