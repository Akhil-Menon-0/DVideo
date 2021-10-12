import React ,{useState} from 'react'
import UploadIPFS from './UploadIPFS'
import UploadScratch from './UploadScratch'
import UploadInvalid from './UploadInvalid'
function UploadForm(props) {
    console.log(props)
    const [buffer, setBuffer] = useState(null);
    if (props.uploadOption === "IPFS_Only") {
        return (
            <UploadIPFS/>
        )
    }
    else if (props.uploadOption === "Scratch")
        return (
            <UploadScratch />
        )
    else {
        return (
            <UploadInvalid/>
        )
    }
}

export default UploadForm