import React from 'react'
import Landing from '../ClientComponents/landing'
import CollateralsTable from './collateral'

const BaseCollateral = () => {
  return (
    <div>
        <Landing/>
        <CollateralsTable/>
    </div>
  )
}

export default BaseCollateral