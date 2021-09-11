import React, { useState, useEffect } from "react"
import Note from './components/Note'
import noteService from './services/notes'
import './index.css'
import Notification from "./components/Notification"

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
    const [notification, setNotification] = useState({show: false, text: ''})

    const hook = () => {
        noteService
            .getAll()
            .then(initialNotes => {
                setNotes(initialNotes)
            })
    }

    useEffect(hook, [])

    // Notification
    const noti = () => {
        if(notification.show === true){
            var alerta = setTimeout(()=> {
                setNotification({...notification, show: false, text: ''})
                window.clearTimeout(alerta)
            }, 3000)

        }
    }

    useEffect(noti, [notification])
    
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
                setNotification({...notification, show: true, text: 'Nota creada con éxito!'})
            })
            .catch( error => {
                setNotification({...notification, show: true, text: 'Algo salió mal!'})
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
            })
            .catch(error => {
                setNotification({...notification, show: true, text: 'the note was already deleted from server'})
                setNotes(notes.filter(n => n.id !== id))
            })
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

            {
                notification
                    ? (<Notification show={notification.show} text={notification.text} />)
                    : ''
            }
        </div>
    );
}

export default App;
