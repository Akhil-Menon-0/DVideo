import React from 'react'
import { Link } from 'react-router-dom'

function UploadOption() {
    return (
        <React.Fragment>
            <Link to="/upload/IPFS_Only" strict="true" exact="true">IPFS ONLY</Link>
            <br />
            <Link to="/upload/Scratch" strict="true" exact="true">Scratch</Link>
        </React.Fragment>
    )
}

export default UploadOption