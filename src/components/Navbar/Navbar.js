import React, { useContext } from 'react'
import SearchBar from './SearchBar'
import Context from '../Context/Context'
import { Link } from 'react-router-dom'

function Navbar() {

    const { user, setUser } = useContext(Context)
    return (
        <div className="container">
            <div className="row" style={{ backgroundColor: "blue" }}>
                <div className="col-2"><Link to="/" exact="true" strict="true"><h2>Home</h2></Link></div>
                <SearchBar />
                {user === null ?
                    <div className="col-4">
                        <button onClick={() => { setUser("User") }}>Login</button>
                        <Link to="/signup" exact="true" strict="true"><button>Signup</button></Link>
                    </div> :
                    <div className="col-4">
                        <Link to='/upload' exact="true" strict="true"><button>Upload</button></Link>
                        <button onClick={() => { setUser(null) }}>Logout</button>
                    </div>}
            </div>
        </div>
    )
}

export default Navbar