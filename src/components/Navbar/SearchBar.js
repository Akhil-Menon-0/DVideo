import React, { useState,useContext } from 'react'
import Context from '../Context/Context'
import { Link } from 'react-router-dom';

function SearchBar() {

    const [lsearchString, setlSearchString] = useState("")
    const {setSearchString}=useContext(Context)
    let searchButton = null

    return (
        <React.Fragment>
            <div className="col-6">
                <input
                    type='text'
                    value={lsearchString}
                    maxLength="100"
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            setlSearchString("")
                            searchButton.click()
                        }
                    }}
                    onChange={(e) => { setlSearchString(e.target.value)}}
                />
                <Link to={`/search/`} exact="true" strict="true">
                    <button
                        onClick={() => { 
                        
                        setSearchString(lsearchString)
                        setlSearchString("") }}
                        className="btn btn-outline-danger"
                        disabled={lsearchString === "" ? true : false}
                        ref={node => { searchButton = node }}
                    >
                        Search
                    </button>
                </Link>
            </div>
        </React.Fragment>
    )
}

export default SearchBar