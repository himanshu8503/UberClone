import React, { useContext, useEffect } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router'
import axios from 'axios';
import { useState } from 'react';

const CaptainProtectedWrapper = ({children}) => {

    const token = localStorage.getItem('captain-token');
    const navigate = useNavigate();

    const {captain,setCaptain} = useContext(CaptainDataContext);
    const [loading,setLoading] = useState(true);
    
    useEffect(() => {

        if(!token)
        {
            navigate('/captain-home')
        }
        
        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            if(response.status === 200)
            {
                setCaptain(response.data);
                setLoading(false);   
            }
        })
        .catch((err) => {
            console.log(err);
            localStorage.removeItem('captain-token');
            navigate('/captain-login');
        });

    },[token]);

    if(loading){
        return (
            <div>Loading....</div>
        )
    }

  return (
    <>
        {children}
    </>
  )
}

export default CaptainProtectedWrapper