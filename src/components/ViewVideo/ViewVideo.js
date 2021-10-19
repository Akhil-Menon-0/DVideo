import React, { useContext, useState, useEffect } from 'react'
import Context from '../Context/Context'

function ViewVideo(props) {

    const { account, user, transactions, setTransactions, saveTransaction, contract } = useContext(Context)
    const [comment, setComment] = useState("")
    const [video, setVideo] = useState();
    const [comments, setComments] = useState();
    const [init, setinit] = useState(true)
    let commentButton = null

    useEffect(() => {
        //to-do
        //use a formula for calculating a view
        const fecthVideo = async () => {
            let video = await contract.methods.Id_Video(props.videoId).call();
            let comments = await contract.methods.getVideoComments(props.videoId).call()
            console.log(video)
            console.log(comments)
            setVideo(video)
            setComments(comments)
            setinit(false)
        }
        setinit(true)
        fecthVideo()
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

    if (init === true) {
        return (
            <h1>Video loading</h1>
        )
    }
    return (
        <div>
            <video
                src={`https://ipfs.infura.io/ipfs/${video.hash}`}
                style={{ width: '500px', height: '500px' }}
                controls
            >
                VIDEOEOEOEO
            </video>

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
                    params: [video.creatorId]
                }
                saveTransaction(account, setTransactions, newTransaction)
            }}>Subscribe</button>
            <br />
            <button disabled={user === null ? true : false} onClick={() => {
                let now = new Date();
                let newTransaction = {
                    type: "save",
                    userId: user.publicKey,
                    timestamp: now,
                    params: [video.id]
                }
                saveTransaction(account, setTransactions, newTransaction)
            }}>Watch later</button>
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