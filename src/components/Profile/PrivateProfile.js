import React, { useContext, useEffect, useState } from 'react'
import Context from '../Context/Context'

function PrivateProfile() {

    const { user, setUser, contract } = useContext(Context)
    const [init, setInit] = useState(true)
    useEffect(() => {
        let fetch = async () => {
            let temp = await contract.methods.PublicKey_User(user.publicKey).call();
            let subscriptions = await contract.methods.getUserSubscriptions(user.publicKey).call();
            let likedVideos = await contract.methods.getUserPlaylist(user.publicKey, "liked").call();
            let savedVideos = await contract.methods.getUserPlaylist(user.publicKey, "later").call();
            temp.subscriptions = subscriptions
            temp.liked = likedVideos
            temp.saved = savedVideos
            setUser(temp)
            setInit(false)
        }
        fetch();
    }, [])
    if (init === true) {
        return <h1>Loading private profile</h1>
    }
    console.log(user)
    return (
        <h1>Private profile of, fetch {user.userName} from context</h1>
    )
}

export default PrivateProfile