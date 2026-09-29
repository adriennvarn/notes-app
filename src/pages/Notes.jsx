import NavBar from "../components/NavBar"
import NotesList from "../components/NotesList"
import { NoteProvider } from "../contexts/NoteContext"

export default function Notes() {
    return (
        <>
            <NoteProvider>
                <NavBar />
                <h1>Notes Page</h1>
                <NotesList />
            </NoteProvider>
        </>
    )
}