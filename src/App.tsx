// src/App.tsx
import React from 'react';
import ImageToPdf from './components/ImageToPdf';
 

const App: React.FC = () => {
  return (
    <div className="App">
      <h1 style={{textAlign : 'center'}}>Image to PDF Converter</h1>
      <ImageToPdf />
    </div>
  );
};

export default App;
