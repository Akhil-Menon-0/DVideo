import React, { useState } from 'react'
import Context from './Context'

const saveTransaction = (account, setTransactions, newTransaction) => {

    //save transaction local storage 
    let userSession = JSON.parse(window.localStorage.getItem(account))
    userSession.transactions = [...userSession.transactions, newTransaction]
    window.localStorage.setItem(account, JSON.stringify(userSession))
    setTransactions((prevState) => {
        return [...prevState, newTransaction]
    })
}

const ContextProvider = ({ children }) => {
    const [account, setAccount] = useState("0x66b9143ee518b8CFe6F671c7D2f253ED289e0A40");   //for testing otherwise null
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