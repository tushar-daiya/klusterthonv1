import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header'

function ClientHeader() {
  return (
    <div className='w-full'>
        <Header title="Clients" desc="Create and manage client information" />
        <Outlet/>
    </div>
  )
}

export default ClientHeader