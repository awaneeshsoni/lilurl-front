import React, { useState } from 'react';
import './App.css';

export default function App(){
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleShorten = async () => {
    try {
      const response = await fetch('https://lilurl-back.onrender.com/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ longUrl }),
      });
      const data = await response.json();
      setShortUrl(`https://lilurl-back.onrender.com/${data.shortUrl}`);
    } catch (error) {
      console.error('Error shortening URL:', error);
    }
  };

  const handleClear = () => {
    setLongUrl('');
    setShortUrl('');
  };

  const handleCopy = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      alert('Copied to clipboard!');
    }
  };

  return (
    <div className="container">
      <h1 className="title">LilURL</h1>
      <input
        type="text"
        placeholder="Enter a long URL..."
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        className="input"
      />
      <div className="button-row">
        <button onClick={handleShorten} className="small-button">Shorten It</button>
        <button onClick={handleClear} className="small-button">New URL</button>
      </div>
      <button onClick={handleCopy} className="large-button">Copy</button>
      {shortUrl && <p className="output">Your short URL: <a href={`https://${shortUrl}`} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>}
    </div>
  );
};
