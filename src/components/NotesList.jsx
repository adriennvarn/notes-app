import NoteCard from "../components/NoteCard"
import NoteCardExpanded from "../components/NoteCardExpanded"

export default function NotesList() {
    return (
        <>
            <h2>Notes List</h2>
            <NoteCard />
            <NoteCardExpanded />
        </>
    )
}