import { useContext, useRef, useState } from "react"
import { NoteContext } from "../contexts/NoteContext"

const blankNote = {
    id: crypto.randomUUID(),
    title: "",
    content: "",
    date_edited: new Date().toISOString()
}

export default function AddNote() {
    // addNote function
    const { addNote } = useContext(NoteContext)
    // input state
    const [newNote, setNewNote] = useState(blankNote)
    // input ref for focusing on title
    const inputRef = useRef(null)

    // update state and values on change
    const handleChange = (e) => {
        const { name, value } = e.target
        setNewNote((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // call context to add note to db
        addNote(newNote)
        // reset form to default data and put focus on title
        setNewNote(blankNote)
        inputRef.current.focus()
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" placeholder="Title" value={newNote.title} onChange={handleChange} ref={inputRef} />
                <label htmlFor="content">Content</label>
                <input type="text" id="content" name="content" placeholder="Content" value={newNote.content} onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}