// CreateStory.js
import React, { useState } from 'react';

function CreateStory({ generatePlot }) {
  const [genre, setGenre] = useState('');
  const [keywords, setKeywords] = useState('');
  const [plot, setPlot] = useState('');

  const handleGeneratePlot = async () => {
    const generatedPlot = await generatePlot(genre, keywords);
    setPlot(generatedPlot);
  };

  return (
    <div>
      <h2>Generate Plot</h2>
      <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
      <input type="text" placeholder="Keywords" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
      <button onClick={handleGeneratePlot}>Generate Plot</button>
      {plot && (
        <div>
          <h3>Generated Plot:</h3>
          <p>{plot}</p>
        </div>
      )}
    </div>
  );
}

export default CreateStory;