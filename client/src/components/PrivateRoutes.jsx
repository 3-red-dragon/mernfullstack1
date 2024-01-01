import React from 'react'
import { Navigate } from "react-router-dom";

function PrivateRoutes({children}) {
    const usert = localStorage.getItem('token'); 
    if (!usert){
      return <Navigate to="/login" />
      
    }
    return (
    children
  )
}

export default PrivateRoutes