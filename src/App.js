import React from 'react';
import ComplaintForm from './components/ComplaintForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Customer Complaint Form</h1>
      </header>
      <ComplaintForm />
    </div>
  );
};

export default App;
