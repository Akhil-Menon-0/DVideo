import React, { useContext, useState } from 'react'
import Context from '../Context/Context'

function Login() {

    const { setUser } = useContext(Context)
    const [publicKey, setPublicKey] = useState("")

    return (
        <div>
            <h1>Login</h1>
            <input
                type="text"
                placeholder="Public Key"
                value={publicKey}
                onChange={(e) => { setPublicKey(e.target.value) }}
            />
            <button onClick={() => {
                let now = new Date()
                setUser(publicKey)
                //save in local storage
                let userSession = {
                    userName: "Fetch from contract",
                    publicKey: publicKey,
                    timestamp: now,
                    transactions: []
                }
                window.localStorage.setItem(publicKey, JSON.stringify(userSession))
            }} disabled={publicKey === "" ? true : false}>Login</button>
        </div>
    )
}

export default Login