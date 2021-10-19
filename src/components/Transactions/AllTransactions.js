import React, { useContext } from "react"
import Context from "../Context/Context"
import { Link } from "react-router-dom"

function AllTransactions() {

    const { account, transactions, setTransactions, removeTransaction, sendTransactions } = useContext(Context)
    let transactionsComp = transactions.map((transaction, index) => {
        return (
            <tr key={index}>
                <th scope="col">{transaction.type}</th>
                <th scope="col">{transaction.timestamp.toLocaleString()}</th>
                {transaction.type === "like" &&
                    <th scope="col"><Link to={`/video/${transaction.params[0]}`} exact="true" strict="true">Video title</Link></th>
                }
                {transaction.type === "comment" &&
                    <th scope="col"><Link to={`/video/${transaction.params[0]}`} exact="true" strict="true">Video title</Link>
                        :<b>{transaction.params[1]}</b>
                    </th>
                }
                {transaction.type === "view" &&
                    <th scope="col"><Link to={`/video/${transaction.params[0]}`} exact="true" strict="true">Video title</Link></th>
                }
                {transaction.type === "subscribe" &&
                    <th scope="col"><Link to={`/publicProfile/${transaction.params[0]}`} exact="true" strict="true">subscribed username</Link></th>
                }
                <th onClick={() => {
                    removeTransaction(account, setTransactions, index, transactions)
                }} role="button">Remove</th>
            </tr >
        )
    })
    return (
        <div>
            <h1>All transactions</h1>
            <button onClick={sendTransactions}>Submit</button>
            <table className="table table-striped">
                <tbody>
                    {transactionsComp}
                </tbody>
            </table>
        </div>
    )
}

export default AllTransactions