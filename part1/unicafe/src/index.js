import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = (props) => {
    return (
        <button onClick={props.handleClick}>{props.title}</button>
    )
}
const Stadistics = ({good, neutral, bad}) => {
    return (
        <>
            <h2>Stadistics</h2>
            <ul>
                <li>Good: {good}</li>
                <li>Neutral: {neutral}</li>
                <li>Bad: {bad}</li>
            </ul>
            <h3>More stadistics</h3>
            <ul>
            <li>Total comments: {good + neutral + bad}</li>
                <li>Average: { (good + neutral + bad) / 3}</li>
                <li>Positive: {good ? (good / (good + neutral + bad) * 100) : 0}%</li>
            </ul>
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
