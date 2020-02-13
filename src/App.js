import React from 'react';
import './App.css';
import Calculator from './Calculator.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>JavaScript Calculator</h1>
      </header>
      <Calculator/>
      <footer>
        <span>Made by <a href="https://sgonzo3.github.io/">Santos Gonzalez</a></span>
      </footer>
    </div>
  );
}

export default App;