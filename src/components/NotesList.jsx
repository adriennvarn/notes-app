import { useContext } from "react"
import NoteCard from "../components/NoteCard"
import { NoteContext } from "../contexts/NoteContext"

export default function NotesList() {
    const { notes } = useContext(NoteContext)

    return (
        <>
            <h2>Notes List</h2>
            {notes.map(note => (
                <NoteCard key={note.id} note={note} />
            ))}
        </>
    )
}