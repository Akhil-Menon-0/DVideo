import React from 'react'

function UploadForm(props) {
    console.log(props)
    if (props.uploadOption === "IPFS_Only") {
        return (
            <h1>IPFS only form</h1>
        )
    }
    else if (props.uploadOption === "Scratch")
        return (
            <h1>From scratch</h1>
        )
    else {
        return (
            <h1>INVALID UPLOAD OPTION</h1>
        )
    }
}

export default UploadForm