import React, { useContext, useState } from 'react'
import Context from '../Context/Context'

function Login() {

    const { setUser } = useContext(Context)
    const [publicKey, setPublicKey] = useState("")
    let loginButton = null

    return (
        <div>
            <h1>Login</h1>
            <input
                type="text"
                placeholder="Public Key"
                value={publicKey}
                onChange={(e) => { setPublicKey(e.target.value) }}
                onKeyPress={(e) => { if (e.key === "Enter") { loginButton.click() } }}
            />
            <button onClick={() => {
                let now = new Date()
                setUser(publicKey)
                //save in local storage
                // let userSession = {
                //     userName: "Fetch from contract",
                //     publicKey: publicKey,
                //     timestamp: now,
                //     transactions: []
                // }
                // window.localStorage.setItem(publicKey, JSON.stringify(userSession))
            }}
                disabled={publicKey === "" ? true : false}
                ref={(node) => { loginButton = node }}
            >Login</button>
        </div>
    )
}

export default Login