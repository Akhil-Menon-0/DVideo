import React, { useContext } from 'react'
import Context from '../Context/Context'

function PrivateProfile() {

    const { user } = useContext(Context)

    return (
        <h1>Private profile of, fetch {user} from context</h1>
    )
}

export default PrivateProfile