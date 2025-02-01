// ReadStory.js
import React from 'react';
import { useState } from 'react';

function ReadStory({ stories }) {
  const [selectedStory, setSelectedStory] = useState(null);

  return (
    <div>
      <h2>Read Stories</h2>
      <ul>
        {stories.map((story) => (
          <li key={story.id} onClick={() => setSelectedStory(story)}> {/* Assuming stories have an 'id' */}
            {story.title}
          </li>
        ))}
      </ul>

      {selectedStory && (
        <div>
          <h3>{selectedStory.title}</h3>
          <p>{selectedStory.story}</p>
          {/* Add tipping functionality here */}
        </div>
      )}
    </div>
  );
}

export default ReadStory;