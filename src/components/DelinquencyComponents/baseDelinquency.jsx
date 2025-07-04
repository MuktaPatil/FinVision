import React from 'react'
import Landing from '../ClientComponents/landing'
import DelinquencyTable from './delinquency'

const BaseDelinquency = () => {
  return (
    <div>
        <Landing/>
        <DelinquencyTable/>
    </div>
  )
}

export default BaseDelinquency