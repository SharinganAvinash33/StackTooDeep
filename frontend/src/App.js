import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers'; // Import ethers if you're still using it for wallet connection (even with mock data)
import { contractAbi, contractAddress } from './Constants/Constants'; // Keep these if needed
import Login from './Components/Login';
import Home from './Components/Connected';
import './App.css';

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [stories, setStories] = useState([]);

  const mockStories = [
    { id: 1, title: "Story 1", story: "Once upon a time...", genre: "Fantasy", keywords: "magic, adventure" },
    { id: 2, title: "Story 2", story: "In a galaxy far, far away...", genre: "Sci-Fi", keywords: "space, aliens" },
    { id: 3, title: "Story 3", story: "A mysterious tale...", genre: "Mystery", keywords: "detective, clues" },
  ];

  const generatePlot = async (genre, keywords) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`A thrilling ${genre} adventure involving ${keywords}.`);
        }, 500)
    })
  };

  const uploadStory = async (storyData) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            mockStories.push({
                ...storyData,
                id: mockStories.length + 1,
            })
            resolve();
        }, 500)
    })
  };

  const getStories = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockStories);
        }, 500)
    })
  };

  useEffect(() => {
    const fetchStories = async () => {
      const fetchedStories = await getStories();
      setStories(fetchedStories);
    };

    fetchStories();
  }, []);


  async function connectToMetamask() {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const address = accounts[0];

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
        <div>
          <Home 
            account={account} 
            provider={provider} 
            generatePlot={generatePlot} 
            uploadStory={uploadStory} 
            stories={stories} 
          />
        </div>
      ) : (
        <Login connectWallet={connectToMetamask} />
      )}
    </div>
  );
}

export default App;