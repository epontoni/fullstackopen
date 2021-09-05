import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

    
    function randomAnecdote() {
        var randomNumber =  Math.floor(Math.random()* (props.anecdotes.length))
        setSelected(randomNumber)
    }

    function votar(){
        const copy = { ...votes }
        copy[selected] += 1
        
        setVotes(copy)
    }
  
    return (
      <div>
        <blockquote>{props.anecdotes[selected]}</blockquote>
        <p>has {votes[selected]<=1 ? votes[selected] + ' vote' : votes[selected] + ' votes'}</p>
        <br />
        <button onClick={ () => votar()}>vote</button>
        <button onClick={ () => randomAnecdote() }>next anecdote</button>
      </div>
    )
  }
  

ReactDOM.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} />
  </React.StrictMode>,
  document.getElementById('root')
);