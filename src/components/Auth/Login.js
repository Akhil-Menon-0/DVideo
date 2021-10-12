import React, { useContext, useState } from 'react'
import Context from '../Context/Context'

function Login() {

    const { setUser } = useContext(Context)
    const [userName, setUserName] = useState("")

    return (
        <div>
            <h1>Login</h1>
            <input
                type="text"
                placeholder="Public Key"
                value={userName}
                onChange={(e) => { setUserName(e.target.value) }}
            />
            <button onClick={() => {
                setUser(userName)
                //save in local storage
            }} disabled={userName === "" ? true : false}>Login</button>
        </div>
    )
}

export default Login