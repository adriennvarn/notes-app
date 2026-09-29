import { createContext, useState, useEffect } from "react"
import { useFetchData, useFetchDataMutation } from "../hooks/useFetchData"

const API_URL = "http://localhost:3000/notes"

export const NoteContext = createContext()

export function NoteProvider({ children }) {
    // primary state
    const [notes, setNotes] = useState([])
    // fetches
    const { data } = useFetchData(API_URL)
    const { execute: changeNote } = useFetchDataMutation(API_URL)

    // load notes on mount
    useEffect(() => {
        if (data) setNotes(data)
    }, [data])

    // add notes
    async function addNote(note) {
        // call mutated fetch with post
        const savedNote = await changeNote({
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(note)
        })
        if (!savedNote) {
            console.error("Failed to save note: server did not return saved data")
            return
        }
        // update notes state
        setNotes(prev => {
            const currentArray = Array.isArray(prev) ? prev : []
            return [...currentArray, savedNote]
        })
    }

    // delete notes
    async function deleteNote(noteToDelete) {
        // call mutated fetch, pointing dynamic url to /id
        const response = await changeNote({
            method: "DELETE"
        }, `${API_URL}/${noteToDelete.id}`)
        // if null response, update inventory state, otherwise report error
        if (!response) {
            setNotes(prev => {
                const currentArray = Array.isArray(prev) ? prev : []
                return currentArray.filter(note => (
                    note.id !== noteToDelete.id
                ))
            })
        }
        else {
            console.warn("deleteNote returned non-null object")
            return
        }
    }

    // update notes
    async function updateNote(noteToUpdate) {
        // call mutated fetch, pointing to dynamic url /id
        const updatedNote = await changeNote({
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(noteToUpdate)
        }, `${API_URL}/${noteToUpdate.id}`)

        if (!updatedNote) {
            console.error("Failed to update note: server did not respond")
            return
        }
        // update note state
        setNotes(prev => {
            const currentArray = Array.isArray(prev) ? prev : []
            return currentArray.map(note => (
                note.id !== noteToUpdate.id ? note : updatedNote
            ))
        })
    }

    return (
        <NoteContext value={{ notes, addNote, deleteNote, updateNote }} >
            {children}
        </NoteContext>
    )
}