import React, { useState, useEffect } from "react"
import Note from './components/Note'
import noteService from './services/notes'
import './index.css'
import Notification from "./components/Notification"
import Footer from './components/Footer'

/* axios
.get('http://localhost:3001/notes')
.then(response => {
    const notes = response.data
    console.log(notes)
}) */

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        setTimeout( () => {
            setErrorMessage(null)
        }, 3000)
    }, [errorMessage])

    const hook = () => {
        noteService
            .getAll()
            .then(initialNotes => {
                setNotes(initialNotes)
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
            date: new Date(),
            important: Math.random() < 0.5
            //id: notes.length + 1
        }
        noteService
            .create(noteObject)
            .then( returnedNote => {
                setNotes(notes.concat(returnedNote))
                setNewNote('')
                setErrorMessage('Nota creada con éxito!')
            })
            .catch( error => {
                setErrorMessage('Algo salió mal al crear la nota!')
            })
        // console.log('button submit clicked', event.target)
    }

    const toggleImportanceOf = (id) => {
        const note = notes.find( n => n.id === id)
        const changedNote = { ...note, important: !note.important }

        noteService
            .update(id, changedNote)
            .then(returnedNote => {
                setNotes(notes.map(note => note.id !== id ? note : returnedNote))
                setErrorMessage('Se ha cambiado la importancia de la nota.')
            })
            .catch(error => {
                setErrorMessage('La nota ya ha sido borrada del servidor.')
                setNotes(notes.filter(n => n.id !== id))
            })
    } 

    const notesToShow = showAll
        ? notes
        : notes.filter( note => note.important )
    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
            <button onClick={ () => setShowAll(!showAll) }>
                show { showAll ? 'important' : 'all' }
            </button>

            <ul>
                { notesToShow.map( (note, i) => (
                    <Note
                        key={note.id}
                        content={note.content}
                        important={note.important}
                        toggleImportance={() => toggleImportanceOf(note.id) }
                    />) 
                    )
                }
            </ul>

            <form onSubmit={addNote}>
                <input
                    value={newNote}
                    onChange={handleNoteChange}
                    placeholder="Add a new note..."
                />
                <button type="submit">save</button>
            </form>

            <Footer />
        </div>
    );
}

export default App;
