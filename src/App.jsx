import React, { useEffect, useState } from 'react';
import './App.css';

const currentUrl = window.location.pathname;
const params = currentUrl.substring(1);
console.log(params)

export default function App(){
  React.useEffect(() => {
    redirect();
  }, []);
  var data;
  async function redirect(){
    if(params == "" || undefined){
      return;
    }
    try {
      const response = await fetch(`https://lilurl-back2.vercel.app/${params}`)
      data = await response.json();
      if(response.status==200){
        //redirect
        console.log(data.longUrl)
        window.location.href = data.longUrl
      }
      else {
        console.log(data.message)
        setShow(true);
      }
    } catch (error) {
      console.error('Error', error);
    }}
  
  const [show, setShow] = useState(false)
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleShorten = async () => {

    const isValidUrl = (string) => {
      try {
        new URL(string);
        return true;
      } catch (_) {
        return false;
      }
    };
  
    if (!isValidUrl(longUrl)) {
      alert('Please enter a valid URL!');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('https://lilurl-back2.vercel.app/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ longUrl }),
      });
      const data = await response.json();
      setShortUrl(`lilurls.vercel.app/${data.shortUrl}`);
    } catch (error) {
      console.error('Error shortening URL:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false); // Stop loading animation
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
      {show ? <p>"Url not found"</p> : ""}
      <h1 className="title">LilURL</h1>
      <input
        type="text"
        placeholder="Enter a long URL..."
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        className="input"
        disabled={loading}
      />
      <div className="button-row">
        <button onClick={handleShorten} className="small-button">{loading ? 'Loading...' : 'Shorten It'}</button>
        <button onClick={handleClear} className="small-button">New URL</button>
      </div>
      {loading && <div className="loader"></div>} {/* Loader component */}
      {shortUrl && <p className="output">Your short URL: <a href={`https://${shortUrl}`} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>}
      <button onClick={handleCopy} className="large-button">Copy</button>
    </div>
  );
};