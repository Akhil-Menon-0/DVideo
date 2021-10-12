import React, { useContext,useState } from 'react'
import Context from '../Context/Context'


//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values


function UploadIPFS(props) {
    const {
        account,
        user,
        setAccount,
        videoContract,
        setVideoContract,
        userContract,
        setUserContract,
        setTransactions, 
        saveTransaction
      } = useContext(Context)

      console.log(videoContract)
      console.log(account)
      const [videoTitle, setVideoTitle]=useState("")
      const[description,setDescription]=useState("")
      const [tags,setTags] = useState("0")
      const [videoHash,setVideoHash] = useState("")
      const [upload,setUpload]=useState(false)
      const selectShortlistedApplicant = (e) => {
        const checked = e.target.checked;
        const k=parseInt(e.target.name)
        let no=1<<k
        let tempTag=parseInt(tags)
        console.log(no)
        console.log(tempTag)
        
        if (checked) {
          let newTag=tempTag|no
          let StringTag=newTag.toString()
          console.log(StringTag)
         setTags(StringTag)
        } else {
          let newTag=tempTag^no
          let StringTag=newTag.toString()
          console.log(StringTag)
        setTags(StringTag)
        }
      };
      return (
        <div className="container-fluid text-monospace">
          <br></br>
          &nbsp;
          <br></br>
          <div className="row">
            <div className="col-md-3 border border-danger overflow-auto text-center" style={{ maxHeight: '768px', minWidth: '175px' ,margin:'10px'}}>
              <h5><b>Upload Video</b></h5>
              <form onSubmit={(event) => {
                event.preventDefault()
                console.log("Submitting")
                setUpload(true)
                let now = new Date()
                let newTransaction = {
                type: "upload",
                userId: user,
                timestamp: now,
                params: [videoTitle,description,tags]
                }
                saveTransaction(account, setTransactions, newTransaction)
                setVideoHash("")
                setVideoTitle("")
                setDescription("")
                setTags("0")
                window.location.reload()
              }} >
                &nbsp;
                <div className="form-group mr-sm-2">
                <label>IPFS Hash</label>
                <input type='text' style={{ width: '250px' }} value={videoHash} onChange={(e) => { setVideoHash(e.target.value) }} placeholder="Enter the IPFS hash"/>
                <label style={{padding:'10px'}}>Title </label>
                  <input
                    id="videoTitle"
                    type="text"
                    ref={(input) => { setVideoTitle(input) }}
                    className="form-control-sm"
                    placeholder="Enter the title"
                    required />
                <label>Description</label>
                <input type='text' style={{ width: '250px' }} value={description} onChange={(e) => { setDescription(e.target.value) }} placeholder="Enter the Description"/>
                <br/><label>Tags</label>
                <div className="check">
                <label>
                <input type="checkbox" value="off" name="1" onClick={(e) => {selectShortlistedApplicant(e);}} autocomplete="off"/>
                Option 1
                </label>
                </div>
                <div className="check">
                <label>
                <input type="checkbox" value="off" name="2" onClick={(e) => {selectShortlistedApplicant(e);}} autocomplete="off"/>
                Option 2
                </label>
                </div>
                <div className="check">
                <label>
                <input type="checkbox" value="off"name="3"onClick={(e) => {selectShortlistedApplicant(e);}} autocomplete="off" />
                Option 3
                </label>
                </div>
                </div>

                <button type="submit" className="btn btn-danger btn-block btn-sm">Upload!</button>
                &nbsp;
              </form>
              {upload===true&&(
                <video
                  src={`https://ipfs.infura.io/ipfs/${videoHash}`}
                  controls
                >
                </video>
              )
                
              }
              
              
            </div>
          </div>
        </div >
      );
}

export default UploadIPFS