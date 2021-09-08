import React, { useState, useEffect } from "react"
import Note from './components/Note'
import axios from 'axios'

axios
.get('http://localhost:3001/notes')
.then(response => {
    const notes = response.data
    console.log(notes)
})

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(false)

    const hook = () => {
        console.log('effect')
        axios
        .get('http://localhost:3001/notes')
        .then(response => {
            console.log('promise fulfilled')
            setNotes(response.data)
        })
    }

    useEffect(hook, [])
    
    console.log('render', notes.length, 'notes')

    const handleNoteChange = (event) => {
        console.log(event.target.value)
        setNewNote(event.target.value)
    }

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
            id: notes.length + 1
        }
        setNotes(notes.concat(noteObject))
        setNewNote('')
        console.log('button submit clicked', event.target)
    }

    const notesToShow = showAll
        ? notes
        : notes.filter( note => note.important )
    return (
        <div>
            <h1>Notes</h1>
            <button onClick={ () => setShowAll(!showAll) }>
                show { showAll ? 'important' : 'all' }
            </button>

            <ul>
                { notesToShow.map( note => <Note key={note.id} content={note.content} /> )}
            </ul>

            <form onSubmit={addNote}>
                <input
                    value={newNote}
                    onChange={handleNoteChange}
                    placeholder="Add a new note..."
                />
                <button type="submit">save</button>
            </form>
        </div>
    );
}

export default App;
