import React from 'react'
import Landing from '../ClientComponents/landing'
import LoanProductsTable from './loanProducts'

const BaseloanProducts = () => {
  return (
    <div className='flex'>
    <Landing/>
    <LoanProductsTable/>
    </div>
  )
}

export default BaseloanProducts