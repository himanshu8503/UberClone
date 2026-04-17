import React, {createContext, useState} from 'react'

export const CaptainDataContext = createContext();


const CaptainContext = ({children}) => {

    const [captain, setCaptain] = useState({});

    const value = {
        captain,
        setCaptain,
    }


  return (
    <CaptainDataContext.Provider value={value}>
        {children}
    </CaptainDataContext.Provider>
  )
}

export default CaptainContext