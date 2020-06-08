import React, { useState, useEffect } from 'react';
import MailForm from './MailForm'
import Image from 'react-bootstrap/Image';
import './App.scss';

function App() {
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          <div className="col">
          </div>
          <div className="col-6">
          <Image src="/logo.png" className="logo" />
            <div id="form-card" className="card">
              <div className="card-header">
                <h5>Email Configuration</h5>
              </div>
              <div className="card-body">
                <MailForm/>
              </div>
            </div>
          </div>
          <div className="col">
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
