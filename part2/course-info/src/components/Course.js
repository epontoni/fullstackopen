import React from 'react'
import Header from './Header'
import Content from './Content'
import TotalExcercises from './TotalExcercises'


const Course = ({ course }) => {
    return (
        <>
          <Header name={ course.name } />
          <Content parts={ course.parts } />
          <TotalExcercises total={course.parts}/>
        </>
    )
}

export default Course