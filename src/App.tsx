import React from 'react';
import './App.css';
import { Sorting } from './components/sorting/Sorting'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className='text-slate-300'>Merge Sort Visualizer</h1>
        <Sorting />
      </header>
    </div>
  );
}

export default App;
