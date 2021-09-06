import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.name} {props.exercises}
        </p>
    )
}

const Content = (props) => {
    return (
        <div>
            { props.parts.map(
                part => <Part name={part.name} exercises={part.exercises} />
            ) }
        </div>
    )
}

const Total = (props) => {
    return (
        <p>Number of exercises { props.parts.reduce( (total, currentPart) => total + currentPart.exercises, 0 ) }</p>
    )
}

const App = () => {
    const course = 'Half Stack application development'
    const parts = [
        {
            name: 'Fundamentals of React',
            exercises: 10
        },
        {
            name: 'Using props to pass data',
            exercises: 7
        },
        {
            name: 'State of a component',
            exercises: 14
        }
    ]
  
    return (
      <div>
          <Header course={course} />
          <Content parts={parts}  />
          <Total parts={parts} />
      </div>
    )
  }


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
