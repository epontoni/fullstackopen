import React from 'react'

const TotalExcercises = (props) => {
    const totalExcercises = props.total.reduce( (sum, part) => sum + part.exercises, 0)
    return (
        <div>
            <b>Total of { totalExcercises } excercises</b>
        </div>
    )
}

export default TotalExcercises