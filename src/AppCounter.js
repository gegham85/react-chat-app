import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';


function App() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    document.title = `you clicked ${counter} times`;
  });

  return (
    <div>
      <button onClick={() => {setCounter(counter + 1)}}>Click Me</button>
    </div>
  )
}

export default App;
