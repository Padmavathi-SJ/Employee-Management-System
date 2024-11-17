import React from 'react'
import { useAuth } from '../context/AuthContext'
import {Navigate} from 'react-router-dom'

const PrivateRoutes = (children) => {
    const {user, loading} = useAuth()

    if(loading) {
        <cidv>Loading....</cidv>
    }
 
    return user ? children : <Navigate to ="/login" />
}

export default PrivateRoutes