import React from "react"

const Note = ({content, important, toggleImportance}) => {
    const label = important
    ? 'make not important' : 'make important'

    return (
        <li>
            { content }
            <button onClick={toggleImportance}>{label}</button>
        </li>
    )
}

export default Note