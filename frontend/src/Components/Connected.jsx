// Connected.jsx (Home.jsx)
import React, { useState } from 'react';
import CreateStory from './CreateStory';
import ReadStory from './ReadStory';
import { Link } from 'react-router-dom';

function Home(props) {
  const [showCreateStory, setShowCreateStory] = useState(false);
  const [storyLayout, setStoryLayout] = useState('');

  const handleCreateStoryClick = () => {
    setShowCreateStory(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="navbar">
        <div className="logo">Prophesy</div>
        <nav>
        <Link to="/create">Create Story</Link> | <Link to="/read">Read Story</Link>
      </nav>
        <p className="search-box">Hello {props.account}</p>
      </nav>

      <section className="hero">
        <div>
          <h1 className="hero-title">Rewarding Creativity</h1>
          <p className="hero-subtitle">Engage in AI-Driven Story Creation</p>
        </div>
      </section>

      <section className="services">
        <h2>Get Started</h2>
        <div className="service-list">
          <div className="service-item">
            <h3>Read a Story</h3>
          </div>
          <div className="service-item">
            <h3>Write a Story</h3>
            <button onClick={handleCreateStoryClick}>Go</button>
            {/* <button onClick={() => window.location.href = "https://www.example.com"}>Go</button> */}
          </div>
        </div>
      </section>
<a href="q"></a>
      {showCreateStory && (
        <div>
          <CreateStory generatePlot={props.generatePlot} />
          <div>
            <h3>Write Your Story Layout</h3>
            <textarea
              placeholder="Enter your story layout here..."
              value={storyLayout}
              onChange={(e) => setStoryLayout(e.target.value)}
              rows={10}
            />
          </div>
        </div>
      )}

      <ReadStory stories={props.stories} />
    </div>
  );
}

export default Home;