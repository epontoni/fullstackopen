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

const Anecdote = (props) => {
    return (
        <>
            <blockquote>{props.anecdote}</blockquote>
            <p>{props.votes}</p>
        </>
    )
}

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
    const [mostVoted, setMostVoted] = useState(0)
    
    
    function randomAnecdote() {
        var randomNumber =  Math.floor(Math.random()* (props.anecdotes.length))
        setSelected(randomNumber)
    }
    
    function votar(){
        // Create a copy of votes..
        const copy = [...votes]
        copy[selected] += 1

        // Update the most popular
        let mostPopular = 0
        let n = 0

        for (let i = 0; i<copy.length; i++) {
            if (copy[i] > mostPopular) {
                mostPopular = copy[i]
                n = i
            }
        }

        // Update the states
        setVotes(copy)
        setMostVoted(n)
        
    }
    
    return (
      <div>
        <h2>Anecdote of the day</h2>
        <Anecdote
            anecdote={ props.anecdotes[selected] }
            votes={ votes[selected] }
        />
        <br />
        <button onClick={ () => votar() }>vote</button>
        <button onClick={ () => randomAnecdote() }>next anecdote</button>
        <h2>Anecdote with most votes</h2>
        <Anecdote
            anecdote={ props.anecdotes[mostVoted] }
            votes={ votes[mostVoted] }
        />
      </div>
    )
  }
  

ReactDOM.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} />
  </React.StrictMode>,
  document.getElementById('root')
);