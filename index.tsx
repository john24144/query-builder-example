import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import QueryBuilder from './QueryBuilder';
import './style.css';

interface AppProps {}
interface AppState {
  name: string;
}

class App extends Component<AppProps, AppState> {
  constructor() {
    super();
    this.state = {
      name: 'React',
    };
  }

  render() {
    return (
      <div>
        <QueryBuilder />
      </div>
    );
  }
}

createRoot(document.getElementById('root')).render(<App />);
