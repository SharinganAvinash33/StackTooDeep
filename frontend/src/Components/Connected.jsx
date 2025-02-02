import React, { useState, useEffect } from 'react';
import CreateStory from './CreateStory';
import ReadStory from './ReadStory';
// import { getContract } from './utils/contract';
import { getContract } from '../utils/Contract';
import './styles.css';
import Login from './Login';
import { ethers } from 'ethers';

const Home = () => {
    const [contract, setContract] = useState(null);
    const [provider, setProvider] = useState(null);
    const [account, setAccount] = useState(null);
    const [stories, setStories] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [loadingStories, setLoadingStories] = useState(false);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                setProvider(provider);

                const signer = await provider.getSigner();
                const address = await signer.getAddress();
                setAccount(address);
                setIsConnected(true);

                const contract = await getContract(provider);
                setContract(contract);

                setLoadingStories(true);
                if (contract) {
                    try {
                        const fetchedStories = await contract.getAllStories();
                        setStories(fetchedStories);
                    } catch (error) {
                        console.error("Error fetching stories:", error);
                    } finally {
                        setLoadingStories(false);
                    }
                }

            } catch (error) {
                console.error("Error connecting to MetaMask:", error);
            }
        } else {
            alert("Please install MetaMask!");
        }
    };

    useEffect(() => {
        connectWallet();
    }, []);

    const generatePlot = async (genre, keywords) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`A thrilling ${genre} adventure involving ${keywords}.`);
            }, 500)
        });
    };

    const uploadStoryToBlockchain = async (cid, genre, keywords) => {
        if (!contract) {
            console.error("Contract not initialized!");
            return false;
        }
        try {
            const tx = await contract.createStory(cid, genre, keywords);
            await tx.wait();
            return true;
        } catch (error) {
            console.error("Error uploading to blockchain:", error);
            return false;
        }
    };

    return (
        <div className="home-container">
            {!isConnected ? (
                <Login connectWallet={connectWallet} />
            ) : (
                <div>
                    <h2>Welcome to Prophesy</h2>
                    <CreateStory
                        generatePlot={generatePlot}
                        uploadStoryToBlockchain={uploadStoryToBlockchain}
                    />
                    {loadingStories ? (
                        <p>Loading stories...</p>
                    ) : (
                        <ReadStory stories={stories} contract={contract} /> // Pass the contract here
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;