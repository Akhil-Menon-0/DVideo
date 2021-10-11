import React, { useContext } from 'react'
import SearchBar from './SearchBar'
import Context from '../Context/Context'
import { Link } from 'react-router-dom'

function Navbar() {

    const { user, setUser } = useContext(Context)
    return (
        <React.Fragment>
            <div style={{ backgroundColor: "blue" }}>
                <Link to="/" exact="true" strict="true"><h2>Home</h2></Link>
                <SearchBar />
                {user === null ?
                    <React.Fragment>
                        <button onClick={() => { setUser("User") }}>Login</button>
                    </React.Fragment> :
                    <React.Fragment>
                        <Link to='/upload' exact="true" strict="true">Upload</Link>
                        <button onClick={() => { setUser(null) }}>Logout</button>
                    </React.Fragment>}
            </div>
        </React.Fragment>
    )
}

export default Navbar