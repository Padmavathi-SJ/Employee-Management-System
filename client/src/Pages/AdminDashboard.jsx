import React from 'react'
import { useAuth } from '../context/authContext'
import AdminSidebar from '../Components/AdminSidebar'
import Navbar from '../Components/Navbar'
import AdminSummary from '../Components/AdminSummary'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {
  const { user } = useAuth()

  return (
    <div className='flex'>
      <AdminSidebar />
      <div className='flex-1 ml-64 bg-gray-100 h-screen'>
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default AdminDashboard

/*
import React from 'react'
import {useAuth} from '../context/authContext'
import { Navigate } from 'react-router-dom'

const AdminDashboard = () => {
    const {user, loading} = useAuth()

    if(loading) {
        return <div>Loading...</div>
    }
    if(!user) {
      return <Navigate to="/login" />;
    }
  return (
    <div>AdminDashboard {user && user.name}</div>
  )
}

export default AdminDashboard
*/