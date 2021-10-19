import React, { useState, useContext } from 'react'
import Context from '../Context/Context'
import { Link } from 'react-router-dom'

async function duplicacyCheck(contract, userName, publicKey) {
    let publicKeyCheck = await contract.methods.PublicKey_User(publicKey).call();
    let userNameCheck = await contract.methods.UserName_User(userName).call();
    let result = "";
    if (userNameCheck === "") { result = "0" }
    else { result = "1"; }
    if (publicKeyCheck.userName === "") { result += "0"; }
    else { result += "1" }
    return result;
}

function isAlphaNumeric(str) {
    var code, i, len;

    for (i = 0, len = str.length; i < len; i++) {
        code = str.charCodeAt(i);
        if (!(code > 47 && code < 58) && // numeric (0-9)
            !(code > 64 && code < 91) && // upper alpha (A-Z)
            !(code > 96 && code < 123)) { // lower alpha (a-z)

            if (code === 95)
                continue
            return false;
        }
    }
    return true;
};
function Signup() {

    const { contract, account } = useContext(Context)

    const [userName, setUserName] = useState("")
    const [duplicatePublicKey, setDupicatePublicKey] = useState(false)
    const [duplicateUserName, setDuplicateUserName] = useState(false)
    const [signupStatus, setSignupStaus] = useState("free")

    return (
        <div>
            <div className="row">
                <div className="col-md-3 border border-danger overflow-auto text-center" style={{ maxHeight: '768px', minWidth: '175px', margin: '10px' }}>
                    <h5><b>Signup</b></h5>
                    <form onSubmit={async (event) => {
                        if (!isAlphaNumeric(userName)) {
                            window.alert("Username can only have letters and numbers.")
                            setUserName("")
                            return
                        }
                        setSignupStaus("fired")
                        event.preventDefault()
                        console.log(account)
                        console.log(userName)
                        const result = await duplicacyCheck(contract, userName, account)
                        if (result[0] === "1") {
                            setDuplicateUserName(true)
                            setSignupStaus("failed")
                        }
                        if (result[1] === "1") {
                            setDupicatePublicKey(true)
                            setSignupStaus("failed")
                        }
                        if (result === "00") {
                            try {
                                await contract.methods.signup(userName, account).send({ from: account }).on('transactionHash', (hash) => {
                                    setSignupStaus("success")
                                })
                            } catch (err) {
                                setSignupStaus("failed")
                            }
                        }
                    }
                    } >
                        &nbsp;
                        <div className="form-group mr-sm-2">
                            <label>Public Key</label>
                            <input type='text' style={{ width: '250px' }} value={account} disabled={true} />
                            {duplicatePublicKey === true ?
                                <div className="alert alert-danger">Public Key already exists, connect with another account via metamask</div> :
                                null
                            }
                            <label style={{ padding: '10px' }}>Username </label>
                            <input
                                id="userName"
                                type="text"
                                onChange={(e) => { setUserName(e.target.value) }}
                                className="form-control-sm"
                                placeholder="Enter username"
                                maxLength="40"
                                minLength="10"
                                required />
                            {duplicateUserName === true ?
                                <div className="alert alert-danger">Username already exists</div> :
                                null
                            }
                        </div>
                        <br />
                        <button type="submit" className="btn btn-danger btn-block btn-sm">Signup</button>
                        {signupStatus === "fired" ? <h3>Loading</h3> :
                            signupStatus === "free" ? null :
                                signupStatus === "failed" ? <h3>Transaction failed</h3> : <h3>
                                    Transaction successful, try <Link to='/login' strict="true" exact="true"> login</Link>
                                </h3>
                        }
                        &nbsp;
                    </form>
                </div>
            </div>
        </div >
    )
}

export default Signup