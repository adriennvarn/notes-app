import { NavLink } from "react-router-dom"
import NavBar from "../components/NavBar"

export default function Home() {
    return (
        <>
            <NavBar />
            <header>
                <h1>Notes App</h1>
                <NavLink to="/notes">View Notes</NavLink>
            </header>
        </>
    )
}