import React from 'react'
import Header from './Header'
import Content from './Content'


const Course = ({ course }) => {
    const totalExcercises = course.parts.reduce( (sum, part) => sum + part.exercises, 0)
    return (
        <>
          <Header name={ course.name } />
          <Content parts={ course.parts } />
          <div>
              <b>Total of { totalExcercises } excercises</b>
          </div>
        </>
    )
}

export default Course