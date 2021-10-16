import React, { useState } from 'react'
import Context from './Context'


const ContextProvider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);
    const [user, setUser] = useState(null)
    const [transactions, setTransactions] = useState([])

    const saveTransaction = (account, setTransactions, newTransaction) => {

        //save transaction local storage 
        let userSession = JSON.parse(window.localStorage.getItem(account))
        userSession.transactions = [...userSession.transactions, newTransaction]
        window.localStorage.setItem(account, JSON.stringify(userSession))
        setTransactions((prevState) => {
            return [...prevState, newTransaction]
        })
    }

    const removeTransaction = (account, setTransactions, index, transactions) => {

        //remove transaction from local storage
        let userSession = JSON.parse(window.localStorage.getItem(account))
        userSession.transactions.splice(index, 1)
        window.localStorage.setItem(account, JSON.stringify(userSession))
        let temp = transactions.slice()
        temp.splice(index, 1)
        setTransactions(temp)
    }

    const contextObject = {
        account,
        setAccount,
        contract,
        setContract,
        user,
        setUser,
        transactions,
        setTransactions,
        saveTransaction,
        removeTransaction
    }
    return (
        <Context.Provider value={contextObject}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider