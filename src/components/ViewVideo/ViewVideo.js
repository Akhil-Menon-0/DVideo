import React, { useContext, useState, useEffect } from 'react'
import Context from '../Context/Context'

function ViewVideo(props) {

    const { account, user, transactions, setTransactions, saveTransaction } = useContext(Context)
    const [comment, setComment] = useState("")
    let commentButton = null

    useEffect(() => {
        //to-do
        //use a formula for calculating a view
        if (user !== null) {
            let now = new Date()
            let newTransaction = {
                type: "view",
                userId: user.publicKey,
                timestamp: now,
                params: [props.videoId]
            }
            saveTransaction(account, setTransactions, newTransaction)
        }
    }, [])

    return (
        <div>
            <h1>View video id {props.videoId}</h1>
            <button disabled={user === null ? true : false} onClick={() => {
                let now = new Date()
                let newTransaction = {
                    type: "like",
                    userId: user.publicKey,
                    timestamp: now,
                    params: [props.videoId]
                }
                saveTransaction(account, setTransactions, newTransaction)
            }}>Like</button>
            <button disabled={user === null ? true : false} onClick={() => {
                let now = new Date();
                let newTransaction = {
                    type: "subscribe",
                    userId: user.publicKey,
                    timestamp: now,
                    params: ["subscribedUserId"]
                }
                saveTransaction(account, setTransactions, newTransaction)
            }}>Subscribe</button>
            <br />
            <input
                type="text"
                placeholder="Comment something"
                value={comment}
                onChange={(e) => { setComment(e.target.value) }}
                onKeyPress={(e) => { if (e.key === "Enter") { commentButton.click() } }}
            />
            <button
                onClick={() => {
                    let now = new Date();
                    let newTransaction = {
                        type: "comment",
                        userId: user.publicKey,
                        timestamp: now,
                        params: [props.videoId, comment]
                    }
                    setComment("")
                    saveTransaction(account, setTransactions, newTransaction)
                }}
                ref={(node) => { commentButton = node }}
                disabled={comment === "" || user === null ? true : false}
            >Comment</button>
            <button onClick={() => { console.log(transactions); }}> show</button>
        </div >
    )
}

export default ViewVideo