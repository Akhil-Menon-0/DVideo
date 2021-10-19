import React, { useState, useEffect } from 'react'
import Context from './Context'


const ContextProvider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);
    const [user, setUser] = useState(null)
    const [searchString, setSearchString] = useState("");
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        if (transactions.length > 0 && transactions[transactions.length - 1].type === "upload") { sendTransactions() }
    }, [transactions])

    const sendTransactions = async () => {
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
        console.log(type)
        console.log(userId)
        console.log(timestamp)
        console.log(params)

        //sending to contract
        try {
            await contract.methods.transactions(type, userId, timestamp, params).send({ from: account }).on('transactionHash', (hash) => {
                setTransactions([]);
                let userSession = JSON.parse(window.localStorage.getItem(account))
                userSession.transactions = []
                window.localStorage.setItem(account, JSON.stringify(userSession))
            })
        } catch (err) {
            console.log(err)
        }
    }

    const saveTransaction = (account, setTransactions, newTransaction) => {

        setTransactions([...transactions, newTransaction])
        //save transaction local storage 
        let userSession = JSON.parse(window.localStorage.getItem(account))
        userSession.transactions = [...userSession.transactions, newTransaction]
        window.localStorage.setItem(account, JSON.stringify(userSession))
        // if (newTransaction.type === "upload") {
        //     sendTransactions()
        // }
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