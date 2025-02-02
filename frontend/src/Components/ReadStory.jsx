import React, { useState } from 'react';
import { fetchFromIPFS } from '../utils/ipfs';
import './styles.css';

const ReadStory = ({ stories }) => {
    const [selectedStory, setSelectedStory] = useState(null);
    const [storyContent, setStoryContent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleStoryClick = async (story) => {
        setLoading(true);
        setError(null);
        setSelectedStory(story);
        setStoryContent(null);

        try {
            const content = await fetchFromIPFS(story.ipfsHash.path); // Access ipfsHash.path
            if (content) {
                setStoryContent(content);
            } else {
                setError("Error: Could not retrieve story content.");
            }
        } catch (err) {
            console.error("Error reading story:", err);
            setError("Error reading story. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="read-story">
            <h2>Read Stories</h2>
            <ul>
                {stories.map((story) => (
                    <li key={story.id} onClick={() => handleStoryClick(story)}>
                        {story.title}
                    </li>
                ))}
            </ul>

            {selectedStory && (
                <div className="selected-story">
                    <h3>{selectedStory.title}</h3>
                    {loading && <p>Loading story content...</p>}
                    {error && <p className="error-message">{error}</p>}
                    {storyContent ? (
                        <p>{storyContent}</p>
                    ) : !loading ? (
                        <p>No content available for this story.</p>
                    ) : null}
                </div>
            )}
        </div>
    );
};

export default ReadStory;