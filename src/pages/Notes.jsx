import NavBar from "../components/NavBar"
import NotesList from "../components/NotesList"
import AddNote from "../components/AddNote"
import { NoteProvider } from "../contexts/NoteContext"

export default function Notes() {
    return (
        <>
            <NoteProvider>
                <NavBar />
                <h1>Notes Page</h1>
                <AddNote />
                <NotesList />
            </NoteProvider>
        </>
    )
}