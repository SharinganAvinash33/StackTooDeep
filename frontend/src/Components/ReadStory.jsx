import React, { useState, useEffect } from 'react';
import { fetchFromIPFS } from '../utils/ipfs'; // Import your IPFS utility function
import './styles.css'; // Import your CSS file

const ReadStory = ({ stories, contract }) => {
  const [selectedStory, setSelectedStory] = useState(null);
  const [storyContent, setStoryContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleStoryClick = async (story) => {
    setLoading(true);
    setError(null); // Clear any previous errors
    setSelectedStory(story);
    setStoryContent(null); // Clear previous content

    try {
      const content = await fetchFromIPFS(story.ipfsHash); // Fetch from IPFS
      if (content) {
        setStoryContent(content);
      } else {
        setError("Error fetching story content from IPFS.");
      }
    } catch (err) {
      console.error("Error reading story:", err);
      setError("Error reading story. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="read-story">
      <h2>Read Stories</h2>
      {loading && <p>Loading stories...</p>} {/* Display loading message */}
      {error && <p className="error-message">{error}</p>} {/* Display error message */}
      <ul>
        {stories.map((story) => (
          <li key={story.id} onClick={() => handleStoryClick(story)}>
            {story.title} {/* Or display other relevant story info */}
          </li>
        ))}
      </ul>

      {selectedStory && (
        <div className="selected-story">
          <h3>{selectedStory.title}</h3>
          {storyContent && <p>{storyContent}</p>} {/* Display story content */}
          {loading && <p>Loading story content...</p>} {/* Loading for content */}
          {error && <p className="error-message">{error}</p>} {/* Error for content */}
          {!storyContent && !loading && <p>No content available for this story.</p>} {/* No content */}
        </div>
      )}
    </div>
  );
};

export default ReadStory;