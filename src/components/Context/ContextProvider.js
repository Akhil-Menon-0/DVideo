import React, { useState } from 'react'
import Context from './Context'


const ContextProvider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);
    const [user, setUser] = useState(null)
    const [searchString, setSearchString] = useState("");
    const [transactions, setTransactions] = useState([])

    const sendTransactions = () => {
        let type = []
        let userId = []
        let timestamp = []
        let params = []
        for (let transaction of transactions) {
            type.push(transaction.type);
            userId.push(transaction.userId)
            timestamp.push(JSON.stringify(transaction.timestamp))
            params.push(transaction.params)
        }

    }

    const saveTransaction = (account, setTransactions, newTransaction) => {

        //save transaction local storage 
        let userSession = JSON.parse(window.localStorage.getItem(account))
        userSession.transactions = [...userSession.transactions, newTransaction]
        window.localStorage.setItem(account, JSON.stringify(userSession))
        setTransactions([...transactions, newTransaction])
        if (newTransaction.type === "upload") {
            sendTransactions()
        }
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
        searchString,
        setSearchString,
        setAccount,
        contract,
        setContract,
        user,
        setUser,
        transactions,
        setTransactions,
        saveTransaction,
        removeTransaction,
        sendTransactions
    }
    return (
        <Context.Provider value={contextObject}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider