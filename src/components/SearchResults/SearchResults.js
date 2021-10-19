import React, { useEffect,useContext } from 'react'
import Context from '../Context/Context'
function SearchResults(props) {
    const { searchString} = useContext(Context)
    return (
        <h1>Search for string {searchString} and display results</h1>
    )
}

export default SearchResults