import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [text, setText] = useState('');
  const [searchString, setSearchString] = useState('');
  const [replaceString, setReplaceString] = useState('');
  const [replacedText, setReplacedText] = useState('');

  const [wordCount, setWordCount] = useState(0);
  const [uniqueWordCount, setUniqueWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  const handleTextChange = (e) => {
    const inputText = e.target.value;
    setText(inputText);
    setReplacedText(inputText); // Reflect the raw input in replaced text initially
  };

  useEffect(() => {
    const words = text.match(/\b\w+\b/g) || [];
    setWordCount(words.length);

    const uniqueWords = new Set(words.map((word) => word.toLowerCase()));
    setUniqueWordCount(uniqueWords.size);

    const cleanText = text.replace(/[\s\W_]+/g, '');
    setCharCount(cleanText.length);
  }, [text]);

  const handleReplace = () => {
    if (searchString) {
      const regex = new RegExp(searchString, 'g');
      const parts = text.split(regex);

      const replaced = parts.map((part, index) => (
        index < parts.length - 1 ? (
          <>
            {part}
            <span className="highlight">{searchString}</span>
          </>
        ) : part
      ));

      setReplacedText(replaced); // Set the replaced text as an array of React elements
      setText(text.replace(regex, replaceString)); // Update the textarea content without HTML
    }
  };

  return (
    <div className="container">
      <h1>Text Analyzer</h1>
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text here..."
        rows={8}
        className="textarea"
      ></textarea>

      <div className="stats">
        <p>Total Words: {wordCount}</p>
        <p>Unique Words: {uniqueWordCount}</p>
        <p>Character Count (Excluding Spaces & Punctuation): {charCount}</p>
      </div>

      <div className="replace-container">
        <input
          type="text"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          placeholder="Search string"
          className="replace-input"
        />
        <input
          type="text"
          value={replaceString}
          onChange={(e) => setReplaceString(e.target.value)}
          placeholder="Replace with"
          className="replace-input"
        />
        <button onClick={handleReplace} className="replace-btn">Replace</button>
      </div>

      <div className="text-output">
        <h2>Updated Text:</h2>
        <pre>{replacedText}</pre>
      </div>
    </div>
  );
};

export default App;
