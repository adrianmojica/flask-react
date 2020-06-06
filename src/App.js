import React, { useState, useEffect } from 'react';
import MailForm from './MailForm'
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  // useEffect(() => {
  //   fetch('/api/email-out').then(res => res.json()).then(data => {
  //     setCurrentTime(data.message);
  //   });
  // }, []);

  return (
    <div className="App">
      <p>The current time is {currentTime}.</p>
      <MailForm/>
    </div>
  );
}

export default App;
