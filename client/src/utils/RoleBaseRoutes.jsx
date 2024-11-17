import React from 'react'
import { useAuth } from '../context/AuthContext'
import {Navigate} from 'react-router-dom'

const RoleBaseRoutes = (children, requiredRole) => {
    const {user, loading} = useAuth()

    if(loading) {
        <div>Loading...</div>
    }

    if(!requiredRole.include(user.role)) {
        <Navigate to="/unauthorized" />
    }

    return user ? children : <Navigate to ="/login" />




  return (

    <div>RoleBaseRoutes</div>
  )
}

export default RoleBaseRoutes