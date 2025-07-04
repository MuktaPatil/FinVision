import React from 'react'
import LoanOfficersTable from './loanOfficers'
import Landing from '../ClientComponents/landing'

const baseLoanOfficers = () => {
  return (
        <div className='flex'>
    <Landing/>
    <LoanOfficersTable/>
    </div>
  )
}

export default baseLoanOfficers