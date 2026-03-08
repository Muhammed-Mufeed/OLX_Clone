import React from 'react'
import MyContext from './MyContext'

const ContextProvider = ({children}) => {
    const logState = "Logout"
  return (
    <MyContext.Provider value = {{logState}}>
        {children}
    </MyContext.Provider>
  )
}

export default ContextProvider