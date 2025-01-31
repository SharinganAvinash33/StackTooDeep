import { useState, useEffect } from 'react';
// import { ethers } from 'ethers';
import { contractAbi, contractAddress } from './Constants/Constants';
import Login from './Components/Login';
import Connected from './Components/Connected';
import './App.css';
const ethers = require('ethers');


function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  // Connect to MetaMask
  async function connectToMetamask() {
    if (window.ethereum) {
      try {
        // Create a provider from MetaMask
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);

        // Request accounts from MetaMask
        await provider.send('eth_requestAccounts', []);

        // Get the signer and address
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        console.log('Metamask connected: ', address);

        // Set the account and connection state
        setAccount(address);
        setIsConnected(true);

      } catch (err) {
        console.error('Error connecting to MetaMask:', err);
      }
    } else {
      console.error('MetaMask is not detected in the browser');
    }
  }

  return (
    <div className="App">
      {isConnected ? (
        // If connected, show the Connected component
        <Connected account={account} provider={provider} />
      ) : (
        // If not connected, show the Login component
        <Login connectWallet={connectToMetamask} />
      )}
    </div>
  );
}

export default App;
