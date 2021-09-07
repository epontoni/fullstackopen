import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const notes = [
    {
        id: 1,
        content: 'Text note 1',
        date: '',
        important: Math.random() < 0.5
    },
    {
        id: 2,
        content: 'Text note 2',
        date: '',
        important: Math.random() < 0.5
    },
    {
        id: 3,
        content: 'Text note 3',
        date: '',
        important: Math.random() < 0.5
    }
]

ReactDOM.render(
  <React.StrictMode>
    <App notes={notes} />
  </React.StrictMode>,
  document.getElementById('root')
);
