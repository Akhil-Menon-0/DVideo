import React from 'react';

class Auth extends React.Component {

    constructor() {
        super();
        this.state = {
            userName: ""
        }
    }

    changeHandler = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value })
    }

    signMessage = (e) => {
        e.preventDefault();
        //prepare user data in a string by combining all the params separated by a common symbol
        this.props.signAndSend(this.state.userName);
    }

    render() {
        return (
            <React.Fragment>
                <br /><br /><br /><br />
                <form onSubmit={this.signMessage}>
                    <input name="userName" onChange={this.changeHandler} style={{ margin: "5px" }} type="text" placeholder="Username" />
                    <br />
                    <button type="submit" style={{ margin: "5px" }} >Sign and send</button>
                </form>
                <br /><br /><br /><br />
                <hr style={{ border: "5px black solid" }} />
            </React.Fragment>
        );
    }
}

export default Auth