import React, { useContext, useEffect, useState } from 'react'
import Context from '../Context/Context'
import { Link } from 'react-router-dom'

function Home() {

    const { contract, account, user } = useContext(Context)
    const [tag1, setTag1] = useState([])
    const [tag2, setTag2] = useState([])
    const [tag3, setTag3] = useState([])
    const [tag4, setTag4] = useState([])
    const [tag5, setTag5] = useState([])
    const [savedv, setSavedv] = useState([])
    const [myv, setMyv] = useState([])
    const [subscriptions, setSubscriptions] = useState([])
    const [tag1l, setTag1l] = useState(true)
    const [tag2l, setTag2l] = useState(true)
    const [tag3l, setTag3l] = useState(true)
    const [tag4l, setTag4l] = useState(true)
    const [tag5l, setTag5l] = useState(true)
    const [savedl, setSavedl] = useState(true)
    const [myl, setMyl] = useState(true)
    const [subscriptionsl, setSubscriptionsl] = useState(true)
    useEffect(() => {
        const t1 = async () => {
            let temp = await contract.methods.getTagsVideos(1).call()
            let ttemp = await Promise.all(temp.map(async (item) => {
                let t = await contract.methods.getVideoHash(item).call()
                let title = await contract.methods.getVideoTitle(item).call();
                return [item, t, title];
            }))
            setTag1(ttemp)
            setTag1l(false)
        }
        const t2 = async () => {
            let temp = await contract.methods.getTagsVideos(2).call()
            let ttemp = await Promise.all(temp.map(async (item) => {
                let t = await contract.methods.getVideoHash(item).call()
                let title = await contract.methods.getVideoTitle(item).call();
                return [item, t, title];
            }))
            setTag2(ttemp)
            setTag2l(false)
        }
        const t3 = async () => {
            let temp = await contract.methods.getTagsVideos(3).call()
            let ttemp = await Promise.all(temp.map(async (item) => {
                let t = await contract.methods.getVideoHash(item).call()
                let title = await contract.methods.getVideoTitle(item).call();
                return [item, t, title];
            }))
            setTag3(ttemp)
            setTag3l(false)
        }
        const t4 = async () => {
            let temp = await contract.methods.getTagsVideos(4).call()
            let ttemp = await Promise.all(temp.map(async (item) => {
                let t = await contract.methods.getVideoHash(item).call()
                let title = await contract.methods.getVideoTitle(item).call();
                return [item, t, title];
            }))
            setTag4(ttemp)
            setTag4l(false)
        }
        const t5 = async () => {
            let temp = await contract.methods.getTagsVideos(5).call()
            let ttemp = await Promise.all(temp.map(async (item) => {
                let t = await contract.methods.getVideoHash(item).call()
                let title = await contract.methods.getVideoTitle(item).call();
                return [item, t, title];
            }))
            setTag5(ttemp)
            setTag5l(false)
        }
        const subs = async () => {
            let subVideos = await Promise.all(user.subscriptions.map(async (sub) => {
                let subUserName = await contract.methods.getUserName(sub).call()
                let temp = await contract.methods.getUserVideos(sub).call()
                let ttemp = await Promise.all(temp.map(async (item) => {
                    let t = await contract.methods.getVideoHash(item).call()
                    let title = await contract.methods.getVideoTitle(item).call();
                    return [item, t, title];
                }))
                ttemp.unshift(subUserName)
                return ttemp;
            }))
            setSubscriptions(subVideos)
            setSubscriptionsl(false)
        }
        const saved = async () => {
            let temp = await Promise.all(user.saved.map(async (item) => {
                let t = await contract.methods.getVideoHash(item).call()
                let title = await contract.methods.getVideoTitle(item).call();
                return [item, t, title];
            }))
            setSavedv(temp)
            setSavedl(false)
        }
        const my = async () => {
            let temp = await Promise.all(user.myVideos.map(async (item) => {
                let t = await contract.methods.getVideoHash(item).call()
                let title = await contract.methods.getVideoTitle(item).call();
                return [item, t, title];
            }))
            setMyv(temp)
            setMyl(false)
        }
        t1(); t2(); t3(); t4(); t5();
        if (user !== null) { subs(); saved(); my(); }
    }, [])
    let compT1 = tag1.map((hash, index) => {
        return (<Link to={`/video/${hash[0]}`} exact="true" strict="true" key={index}  ><p style={{ width: "150px" }} >{hash[2]}<video src={`https://ipfs.infura.io/ipfs/${hash[1]}`} /></p></Link>)
    })
    let compT2 = tag2.map((hash, index) => {
        return (<Link to={`/video/${hash[0]}`} exact="true" strict="true" key={index}  ><p style={{ width: "150px" }} >{hash[2]}<video src={`https://ipfs.infura.io/ipfs/${hash[1]}`} /></p></Link>)
    })
    let compT3 = tag3.map((hash, index) => {
        return (<Link to={`/video/${hash[0]}`} exact="true" strict="true" key={index}  ><p style={{ width: "150px" }} >{hash[2]}<video src={`https://ipfs.infura.io/ipfs/${hash[1]}`} /></p></Link>)
    })
    let compT4 = tag4.map((hash, index) => {
        return (<Link to={`/video/${hash[0]}`} exact="true" strict="true" key={index}  ><p style={{ width: "150px" }} >{hash[2]}<video src={`https://ipfs.infura.io/ipfs/${hash[1]}`} /></p></Link>)
    })
    let compT5 = tag5.map((hash, index) => {
        return (<Link to={`/video/${hash[0]}`} exact="true" strict="true" key={index}  ><p style={{ width: "150px" }} >{hash[2]}<video src={`https://ipfs.infura.io/ipfs/${hash[1]}`} /></p></Link>)
    })
    let compSaved = savedv.map((hash, index) => {
        return (<Link to={`/video/${hash[0]}`} exact="true" strict="true" key={index}  ><p style={{ width: "150px" }} >{hash[2]}<video src={`https://ipfs.infura.io/ipfs/${hash[1]}`} /></p></Link>)
    })
    let compMy = myv.map((hash, index) => {
        return (<Link to={`/video/${hash[0]}`} exact="true" strict="true" key={index}><p style={{ width: "150px" }} >{hash[2]}<video src={`https://ipfs.infura.io/ipfs/${hash[1]}`} /></p></Link>)
    })
    let compSubs = subscriptions.map((sub, index) => {
        let temp = sub.map((hash, index) => {
            if (index === 0) { return null }
            return (<Link to={`/video/${hash[0]}`} exact="true" strict="true"  key={index}><p style={{ width: "150px" }}>{hash[2]}<video src={`https://ipfs.infura.io/ipfs/${hash[1]}`} /></p></Link>)
        })
console.log(sub)
        return (
            <React.Fragment key={index}>
                <h4>{sub[0]}</h4>
                {temp}
            </React.Fragment>
        )
    })
    return (
        <div>
            <h1>HOME</h1>
            {user === null ? null :
                <React.Fragment>
                    <h2>Saved</h2>
                    {savedl === true ? <h3>Videos loading</h3> : compSaved}
                    <h2>My Videos</h2>
                    {myl === true ? <h3>Videos loading</h3> : compMy}
                    <h2>Subscriptions</h2>
                    {subscriptionsl === true ? <h3>Videos loading</h3> : compSubs}
                </React.Fragment>}
            <h2>tag1</h2>
            {tag1l === true ? <h3>Videos loading</h3> : compT1}
            <h2>tag2</h2>
            {tag2l === true ? <h3>Videos loading</h3> : compT2}
            <h2>tag3</h2>
            {tag3l === true ? <h3>Videos loading</h3> : compT3}
            <h2>tag4</h2>
            {tag4l === true ? <h3>Videos loading</h3> : compT4}
            <h2>tag5</h2>
            {tag5l === true ? <h3>Videos loading</h3> : compT5}
        </div>
    )
}

export default Home