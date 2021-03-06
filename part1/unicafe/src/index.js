import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = (props) => {
    return (
        <button onClick={props.handleClick}>{props.title}</button>
    )
}

const Stadistic = ({text, value}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
          </tr>
    )
}

const Stadistics = ({good, neutral, bad}) => {
    const totalComments = good + neutral + bad
    const average = (good + neutral + bad) / 3
    const positive =  good / (good + neutral + bad) * 100

    if (totalComments === 0) {
        return (
            <>
                <h2>Stadistics</h2>
                <p>No feedback given</p>
            </>
        )
    }
    
    return (
        <>

            <h2>Stadistics</h2>
            <table>
                <thead>
                  <tr>
                    <th>Feedback</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                    <Stadistic text="Good" value={good} />
                    <Stadistic text="Bad" value={bad} />
                    <Stadistic text="Positive" value={positive} />
                    <Stadistic text="Total comments" value={totalComments} />
                    <Stadistic text="Average" value={average} />
                    <Stadistic text="Positive" value={positive + "%"} />
                </tbody>
            </table>
        </>
    )
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <>
            <h1>Give a feedback</h1>
            <Button handleClick={ () => {setGood(good + 1 )} } title="good" />
            <Button handleClick={ () => {setNeutral(neutral + 1 )} } title="neutral" />
            <Button handleClick={ () => {setBad(bad + 1 )} } title="bad" />
            <Stadistics good={good} neutral={neutral} bad={bad} />
        </>
    )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
