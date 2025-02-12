import React, { useState } from 'react';

const ContentPage = () => {
  const [content, setContent] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/content', {
      method: 'POST',
      body: JSON.stringify({ content, instructions }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      alert('Content submitted successfully!');
    } else {
      alert('Failed to submit content');
    }
  };

  return (
    <div>
      <h1>Manage Content</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter content to post"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <textarea
          placeholder="Enter instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
        />
        <button type="submit">Submit Content</button>
      </form>
    </div>
  );
};

export default ContentPage;
