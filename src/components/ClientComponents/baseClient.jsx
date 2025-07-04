import React from 'react'
import Landing from './landing'
import ClientsTable from './clients'

const Base = () => {
  return (
    <div className='flex'>
    <Landing/>
    <ClientsTable/>
    </div>
  )
}

export default Base