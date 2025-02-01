import React, { useState } from 'react';
import './styles.css';
import { uploadToIPFS } from '../utils/ipfs'; // Import your IPFS upload utility

const CreateStory = ({ generatePlot, uploadStoryToBlockchain }) => { // Add uploadStoryToBlockchain prop
  const [genre, setGenre] = useState('');
  const [keywords, setKeywords] = useState('');
  const [plot, setPlot] = useState('');
  const [storyLayout, setStoryLayout] = useState('');
  const [showCreateStory, setShowCreateStory] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');

  const handleGeneratePlot = async () => {
    const generatedPlot = await generatePlot(genre, keywords);
    setPlot(generatedPlot);
    setShowCreateStory(true);
  };

  const handleUpload = async () => {
    setUploading(true);
    setUploadMessage('Uploading to IPFS...');

    try {
      const cid = await uploadToIPFS(storyLayout);
      if (cid) {
        setUploadMessage(`Story uploaded to IPFS with CID: ${cid}`);

        // Call the function to store the CID on the blockchain:
        const success = await uploadStoryToBlockchain(cid, genre, keywords); // Pass genre and keywords
        if (success) {
          setUploadMessage('Story details saved on the blockchain!');
          setStoryLayout(''); // Clear the textarea after successful upload
          setPlot(''); // Clear the generated plot too
          setGenre(''); // Clear genre input
          setKeywords(''); // Clear keywords input
          setShowCreateStory(false); // Hide the story creation area
        } else {
          setUploadMessage('Failed to save story details on the blockchain.');
        }

      } else {
        setUploadMessage('IPFS upload failed.');
      }
    } catch (error) {
      console.error('Error uploading to IPFS or to blockchain:', error);
      setUploadMessage('An error occurred during upload or blockchain interaction.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="create-story">
      <h2>Generate Plot</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Keywords"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />
      </div>
      <button onClick={handleGeneratePlot}>Generate Plot</button>

      {plot && (
        <div className="generated-plot">
          <h3>Generated Plot:</h3>
          <p>{plot}</p>
        </div>
      )}

      {showCreateStory && (
        <div className="create-story-container">
          <div className="story-layout">
            <h3>Write Your Story Layout</h3>
            <textarea
              placeholder="Enter your story layout here..."
              value={storyLayout}
              onChange={(e) => setStoryLayout(e.target.value)}
              rows={10}
            />
          </div>
          <button onClick={handleUpload} disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
          {uploadMessage && <p>{uploadMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default CreateStory;