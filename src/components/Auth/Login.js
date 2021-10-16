import React, { useContext, useState } from 'react'
import Context from '../Context/Context'

import ethUtil from 'ethereumjs-util';

async function verifyUsingSignature(userName, account) {
    const web3 = window.web3
    var msg = ethUtil.bufferToHex(new Buffer(userName, 'utf8'));
    var params = [msg, account]
    var method = "personal_sign"
    return new Promise((resolve, reject) => {
        web3.currentProvider.sendAsync({
            method,
            params,
            account
        }, (err, result) => {
            if (err) { reject(err); return }
            method = 'personal_ecRecover';
            var params = [msg, result.result];
            web3.currentProvider.sendAsync({
                method, params, account
            }, (err, result) => {
                if (err) { reject(err); return }
                if (result.result.toLowerCase() === account.toLowerCase()) { resolve(true); }
                else { resolve(false) }
            })
        })
    })
}

function Login() {

    const { setUser, contract, account } = useContext(Context)
    const [userName, setUserName] = useState("")
    const [loginStatus, setLoginStatus] = useState("free")
    const [wrongUserName, setWrongUserName] = useState(false)
    let loginButton = null

    return (
        <div>
            <h1>Login</h1>
            <input
                type="text"
                placeholder="UserName"
                value={userName}
                onChange={(e) => { setUserName(e.target.value) }}
                onKeyPress={(e) => { if (e.key === "Enter") { loginButton.click() } }}
            />
            {wrongUserName === true ? <div className="alert alert-danger">Invalid</div> : null}
            <button onClick={async () => {
                setLoginStatus("fired"); setWrongUserName(false);
                let publicKey = await contract.methods.UserName_User(userName).call();
                if (publicKey !== account) {
                    setLoginStatus("failed");
                    setWrongUserName(true)
                    return
                }

                //verifying using signature
                verifyUsingSignature(userName, account, setLoginStatus)
                    .then(async (res) => {
                        if (res === false) { setWrongUserName(true); throw new Error(); }
                        let user = await contract.methods.PublicKey_User(publicKey).call();
                        console.log(user)
                        //console.log(await contract.methods.getUserSubscriptions(account).call())
                        let now = new Date()
                        //save in local storage
                        let userSession = {
                            userName: userName,
                            publicKey: publicKey,
                            timestamp: now,
                            transactions: []
                        }
                        window.localStorage.setItem(publicKey, JSON.stringify(userSession))
                        setUser(user)
                    })
                    .catch((err) => {
                        setLoginStatus("failed")
                    })
            }}
                disabled={userName === "" ? true : false}
                ref={(node) => { loginButton = node }}
            >Login</button>
            {loginStatus === "free" ? null :
                loginStatus === "fired" ? <h3>Loading</h3> :
                    loginStatus === "failed" ? <h3>failed</h3> : null}
        </div>
    )
}

export default Login