import React from 'react'
import { Link } from 'react-router'

const Start = () => {
  return (
    <div>
        <div className='h-screen w-full pt-8 flex flex-col justify-between bg-[url("https://images.unsplash.com/photo-1624724126923-e2c021df1311?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")] bg-cover bg-bottom-right'>
            <img className='w-16 ml-8' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'/>
            <div className='bg-white pb-7 py-4 px-4'>
                <h2 className='text-3xl font-bold'>Get Started With Uber</h2>
                <Link  to='/user-login'  className=' flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Start