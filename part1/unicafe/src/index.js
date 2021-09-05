import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = (props) => {
    return (
        <button onClick={props.handleClick}>{props.title}</button>
    )
}
const Stadistics = (props) => {
    return (
        <>
            <h2>Stadistics</h2>
            <ul>
                <li>Good: {props.good}</li>
                <li>Neutral: {props.neutral}</li>
                <li>Bad: {props.bad}</li>
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
