import React from 'react'
import EmployeeSidebar from '../Components/EmployeeDashboard/EmployeeSidebar'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar'

const EmployeeDashboard = () => {
  return (
    <div className='flex'>
      <EmployeeSidebar />
      <div className='flex-1 ml-64 bg-gray-100 h-screen'>
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default EmployeeDashboard