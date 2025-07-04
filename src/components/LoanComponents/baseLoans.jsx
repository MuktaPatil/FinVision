import React from 'react'
import Landing from '../ClientComponents/landing'
import LoansTable from './loans'

const BaseLoans = () => {
  return (
    <div>
        <Landing/>
        <LoansTable/>
    </div>
  )
}

export default BaseLoans