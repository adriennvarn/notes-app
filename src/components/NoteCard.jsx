import { useContext } from "react"
import { NoteContext } from "../contexts/NoteContext"

// adjustable format options
const FORMAT_OPTIONS = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false  // should be adjusted by user setting
}

export default function NoteCard({ note }) {
    const { deleteNote } = useContext(NoteContext)

    const handleDeleteButton = (e) => {
        deleteNote(note)
    }

    // returns date edited as a sane format.
    // TODO: add user option for 12 or 24 hour time
    function formatDateTime() {
        const date = new Date(note.date_edited)
        // locale is undefined so it matches user system
        return new Intl.DateTimeFormat(undefined, FORMAT_OPTIONS).format(date)
    }

    return (
        <div className="mb-8">
            <h4 className="font-bold">{note.title}</h4>
            <p>{formatDateTime()}</p>
            <p>{note.content}</p>
            <p><button type="button" onClick={handleDeleteButton}>Delete note</button></p>
        </div>
    )
}