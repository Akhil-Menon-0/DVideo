import React, { useContext, useEffect, useState } from 'react'
import Context from '../Context/Context'


function Home() {

    const { contract } = useContext(Context)
    const [init, setinit] = useState(true)
    const [uc, setuc] = useState(1);
    const [vc, setvc] = useState(2)
    useEffect(() => {
        const fun = async () => {
            let vc = await contract.methods.videoCount().call();
            let uc = await contract.methods.usersCount().call();
            setuc(uc); setvc(vc); setinit(false);
        }
        setinit(true)
        fun();
    }, [])
    if (init === true) { return (<h1>Home loading</h1>) }
    return (
        <div>
            <h1>HOME</h1>
            {vc}
            {uc}
        </div>
    )
}

export default Home