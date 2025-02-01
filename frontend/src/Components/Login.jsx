// Login.jsx (remains mostly the same)
import React from "react";

const Login = (props) =>{
    return(
        <div className="login">
            <h1 className="welcome-message">Welcome to Prophesy a decentralised Platform for Readers/Writers.</h1>
            <button className="login-button" onClick={props.connectWallet}>Login MetaMask</button>
        </div>
    )
}

export default Login;