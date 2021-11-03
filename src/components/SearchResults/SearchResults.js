import React, { useEffect,useContext,useState } from 'react'
import Context from '../Context/Context'
import { Link } from 'react-router-dom'
function SearchResults(props) {
    const { contract, account, user ,searchString} = useContext(Context)

    const [searchResult,setSearchResult]=useState([])

    useEffect(() => {
        const s = async () => {
            let temp=[]
            let str=[]
            let s1=""
            for(let i=0;i<searchString.length;i++){
                if(searchString[i]==' '){
                    str.push(s1)
                    s1=""
                }
                else
                s1=s1+searchString[i];
            }
            str.push(s1);
            s1=""
            let arr=[]
            for(let i=0;i<str.length;i++){
                s1=""
                for(let j=i;j<str.length;j++){
                    if(i!==j){
                        s1=s1+" ";
                    }
                    s1=s1+str[j];
                    arr.push(s1)
                }
            }

            arr.sort();
            arr.reverse()
            for(let i=0;i<arr.length;i++){
                let t=await contract.methods.getVideo(arr[i]).call()
                temp=temp.concat(t);
            }
            let ttemp = await Promise.all(temp.map(async (item) => {
                let t = await contract.methods.getVideoHash(item).call()
                let title = await contract.methods.getVideoTitle(item).call();
                return [item, t, title];
            }))
            setSearchResult(ttemp)
        }
        s();
    }, [searchString])
    let compT1 = searchResult.map((hash, index) => {
        return (<Link to={`/video/${hash[0]}`} exact="true" strict="true"><p style={{ width: "150px" }} key={index}>{hash[2]}<video src={`https://ipfs.infura.io/ipfs/${hash[1]}`} /></p></Link>)
    })
    return (

        <div>
            <h1>Search for string {searchString} and display results</h1>
            <p>{compT1}</p>
        </div>
        
    )
}

export default SearchResults