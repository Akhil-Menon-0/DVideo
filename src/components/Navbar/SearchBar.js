import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function SearchBar() {

    const [searchString, setSearchString] = useState("")
    let searchButton = null

    return (
        <React.Fragment>
            <div >
                <input
                    type='text'
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            searchButton.click()
                        }
                    }}
                    onChange={(e) => { setSearchString(e.target.value) }}
                />
                <Link to={`/search/${searchString}`} exact="true" strict="true">
                    <button
                        className="btn btn-outline-danger"
                        disabled={searchString === "" ? true : false}
                        ref={node => { console.log(node); searchButton = node }}
                    >
                        Search
                    </button>
                </Link>
            </div>
        </React.Fragment>
    )
}

export default SearchBar