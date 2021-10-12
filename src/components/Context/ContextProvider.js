import React, { useState } from 'react'
import Context from './Context'

const saveTransaction = (setTransactions, newTransaction) => {

    //save transaction local storage 

    setTransactions((prevState) => {
        return [...prevState, newTransaction]
    })
}

const ContextProvider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [videoContract, setVideoContract] = useState(null);
    const [userContract, setUserContract] = useState(null);
    const [user, setUser] = useState(null)
    const [transactions, setTransactions] = useState([])

    const contextObject = {
        account,
        setAccount,
        videoContract,
        setVideoContract,
        userContract,
        setUserContract,
        user,
        setUser,
        transactions,
        setTransactions,
        saveTransaction
    }
    return (
        <Context.Provider value={contextObject}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider