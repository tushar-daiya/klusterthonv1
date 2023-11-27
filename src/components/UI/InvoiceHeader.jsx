import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header'
function InvoiceHeader() {
  return (
    <div className='w-full'>
        <Header title="Invoice" desc="Create, send and manage invoice" />
        <Outlet/>
    </div>
  )
}

export default InvoiceHeader