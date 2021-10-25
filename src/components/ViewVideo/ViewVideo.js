import React, { useContext, useState, useEffect } from 'react'
import Context from '../Context/Context'

function ViewVideo(props) {

    const { account, user, transactions, setTransactions, saveTransaction, contract } = useContext(Context)
    const [comment, setComment] = useState("")
    const [video, setVideo] = useState();
    const [comments, setComments] = useState();
    const [init, setinit] = useState(true)
    const [likeBtn, setLikeBtn] = useState("")
    const [subscribeBtn, setSubscribeBtn] = useState("")
    const [pendingComments, setPendingComments] = useState(0)
    const [saveBtn, setSaveBtn] = useState("")
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
            if (user === null) {
                setLikeBtn("Login to continue")
                setSaveBtn("Login to continue")
                setSubscribeBtn("Login to continue")
            }
            else {
                setPendingComments(0)
                let now = new Date()
                let newTransaction = {
                    type: "view",
                    userId: user.publicKey,
                    timestamp: now,
                    params: [props.videoId]
                }
                saveTransaction(account, setTransactions, newTransaction)
                if (user.liked.includes(props.videoId)) { setLikeBtn("Liked") }
                if (user.saved.includes(props.videoId)) { setSaveBtn("Saved") }
                if (user.subscriptions.includes(video.creatorId)) { setSubscribeBtn("Subscribed") }
                for (let i of transactions) {
                    if (i.type === "like" && i.params[0] === props.videoId) { setLikeBtn("Pending transaction") }
                    if (i.type === "subscribe" && i.params[0] === video.creatorId) { setSubscribeBtn("Pending transaction") }
                    if (i.type === "save" && i.params[0] === props.videoId) { setSaveBtn("Pending transaction") }
                    if (i.type === "comment" && i.params[0] === props.videoId) { let temp = pendingComments; setPendingComments(temp + 1) }
                }
                setinit(false)
            }
        }
        setinit(true)
        fecthVideo()
    }, [props.videoId])
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
            <button disabled={likeBtn === "" ? false : true} onClick={() => {
                let now = new Date()
                setLikeBtn("Pending transaction")
                let newTransaction = {
                    type: "like",
                    userId: user.publicKey,
                    timestamp: now,
                    params: [props.videoId]
                }
                saveTransaction(account, setTransactions, newTransaction)
            }} data-toggle="tooltip" title={likeBtn}>Like</button>
            <button disabled={subscribeBtn === "" ? false : true} onClick={() => {
                let now = new Date();
                setSubscribeBtn("pendng transaction")
                let newTransaction = {
                    type: "subscribe",
                    userId: user.publicKey,
                    timestamp: now,
                    params: [video.creatorId]
                }
                saveTransaction(account, setTransactions, newTransaction)
            }} data-toggle="tooltip" title={subscribeBtn}>Subscribe</button>
            <br />
            <button disabled={saveBtn === "" ? false : true} onClick={() => {
                let now = new Date();
                setSaveBtn("pedning transaction")
                let newTransaction = {
                    type: "save",
                    userId: user.publicKey,
                    timestamp: now,
                    params: [video.id]
                }
                saveTransaction(account, setTransactions, newTransaction)
            }} data-toggle="tooltip" title={saveBtn}>Watch later</button>
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
                    let temp = pendingComments
                    setPendingComments(temp + 1)
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
                data-toggle="tooltip" title={`Pending Comments:${pendingComments}`}>Comment</button>
            <button onClick={() => { console.log(transactions); }}> show</button>
        </div >
    )
}

export default ViewVideo