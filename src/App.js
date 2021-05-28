import logo from './vahaklogo.png';
import {UserForm} from './components/UserForm';
import './App.css';
import React from 'react';

function App() {
  return (
    <div className="App">
      <img src={logo} alt='VAAHAK'></img>
      <UserForm />
    </div>
  );
}

export default App;
