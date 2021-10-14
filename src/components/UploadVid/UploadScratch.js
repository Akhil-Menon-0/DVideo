import React, { useContext,useState } from 'react'
import Context from '../Context/Context'


//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values


const captureFile = (event, setBuffer) => {
  event.preventDefault()
  const file = event.target.files[0]
  const reader = new window.FileReader()
  reader.readAsArrayBuffer(file)

  reader.onloadend = () => {
    setBuffer(Buffer(reader.result))
  }

}

const uploadVideo = (title, setinit, buffer, setVideoHash) => {
  console.log("Submitting file to IPFS...")

  //adding file to the IPFS
  ipfs.add(buffer, (error, result) => {
    console.log('IPFS result', result)
    if (error) {
      console.error(error)
      return
    }
    setinit(true)
    console.log(result[0].hash)
    setVideoHash(result[0].hash)
    console.log(title)
    
  })
}
function UploadScratch(props) {
    const {
        account,
        user,
        setAccount,
        videoContract,
        setVideoContract,
        userContract,
        setUserContract,
        transactions, 
        setTransactions, 
        saveTransaction
      } = useContext(Context)

      console.log(videoContract)
      console.log(account)
      const [videoHash, setVideoHash]=useState("")
      const [videoTitle, setVideoTitle]=useState("")
      const[description,setDescription]=useState("")
      const[buffer,setBuffer]=useState(null)
      const[init,setinit]=useState(null)
      const [tags,setTags] = useState("0")
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
      
                if(parseInt(tags)===0){
                  alert("Please select atleast one tag!")
                  return
                }
                console.log("Submitting")
                console.log(tags)
                setUpload(true)
                
                uploadVideo(videoTitle.value,setinit,buffer,setVideoHash)
                let now = new Date()
                let newTransaction = {
                type: "upload",
                userId: user,
                timestamp: now,
                params: [videoTitle,description,tags,videoHash]
                }
                saveTransaction(account, setTransactions, newTransaction)
                setVideoTitle("")
                setDescription("")
                setTags("0")
                window.location.reload()
              }} >
                &nbsp;
                <input id="upload-file" onChange={(event)=>{
                  let file_size = event.target.files[0].size;
                  if(file_size>0&&file_size>70000000){
                    alert("Too big daddy")
                    event.target.value=""
                  }
                  captureFile(event,setBuffer)
                }} type='file' accept=".mp4, .mkv .ogg .wmv"  style={{ width: '250px' }}  required/>
                <div className="form-group mr-sm-2">
                <label style={{padding:'10px'}}>Title </label>
                  <input
                    id="videoTitle"
                    type="text"
                    ref={(input) => { setVideoTitle(input) }}
                    className="form-control-sm"
                    placeholder="Enter the title"
                    maxLength="500"
                    required />
                <label>Description</label>
                <input type='text' style={{ width: '250px' }} maxLength="5000" value={description} onChange={(e) => { setDescription(e.target.value) }} placeholder="Enter the Description"required />
                <br/>
                <label>Tags</label>
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
                <button type="submit" className="btn btn-danger btn-block btn-sm" >Upload!</button>
                &nbsp;
              </form>
              
            </div>
          </div>
        </div >
      );
}


export default UploadScratch