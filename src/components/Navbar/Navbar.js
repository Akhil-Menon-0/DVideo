import React, { useContext } from 'react'
import SearchBar from './SearchBar'
import Context from '../Context/Context'
import { Link } from 'react-router-dom'

function Navbar() {

    const { user, setUser, setTransactions } = useContext(Context)
    return (
        <div className="container">
            <Link to="/video/771">view video</Link>&nbsp;
            <Link to="/profile">my profile</Link>
            <div className="row" style={{ backgroundColor: "blue" }}>
                <div className="col-2"><Link to="/" exact="true" strict="true"><h2>Home</h2></Link></div>
                <SearchBar />
                {user === null ?
                    <div className="col-4">
                        <Link to="/login" exact="true" strict="true"><button >Login</button></Link>
                        <Link to="/signup" exact="true" strict="true"><button>Signup</button></Link>
                    </div> :
                    <div className="col-4">
                        <Link to='/upload' exact="true" strict="true"><button>Upload</button></Link>
                        <button onClick={() => {
                            setUser(null)
                            setTransactions([])
                            //delete session from local storage
                            // window.localStorage.removeItem(user)
                        }}>Logout</button>
                        <Link to="/profile/transactions" exact="true" strict="true"><button>Transactions</button></Link>
                    </div>}
            </div>
        </div>
    )
}

export default Navbar