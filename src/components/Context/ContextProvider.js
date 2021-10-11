import React, { useState } from 'react'
import Context from './Context'

const ContextProvider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [videoContract, setVideoContract] = useState(null);
    const [userContract, setUserContract] = useState(null);
    const [user, setUser] = useState(null)

    const contextObject = {
        account,
        setAccount,
        videoContract,
        setVideoContract,
        userContract,
        setUserContract,
        user,
        setUser
    }
    return (
        <Context.Provider value={contextObject}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider