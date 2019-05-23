import React, { Component } from 'react';
import Routes from '../src/components/Routes';
import './App.css';
class App extends Component {
  render() {
    return (
      <div className="flexible-content md-4 py-3 text-center">
          <main id="content" >
           <Routes />
        </main>
      </div>
    );
  }
}

export default App;
