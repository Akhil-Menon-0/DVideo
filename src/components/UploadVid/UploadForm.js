import React, { useState } from 'react'
import UploadIPFS from './UploadIPFS'
import UploadScratch from './UploadScratch'
import UploadInvalid from './UploadInvalid'
function UploadForm(props) {
    if (props.uploadOption === "IPFS_Only") {
        return (
            <UploadIPFS />
        )
    }
    else if (props.uploadOption === "Scratch")
        return (
            <UploadScratch />
        )
    else {
        return (
            <UploadInvalid />
        )
    }
}

export default UploadForm