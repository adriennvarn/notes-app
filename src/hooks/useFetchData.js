import { useState, useEffect } from "react"

function useFetchData(url, options = {}) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // get data automatically on useFetchData call
    const fetchData = () => {
        setLoading(true)
        console.log("Fetching data from: ", url)

        fetch(url, options)
            .then(r => {
                if (r.ok) return r.json()
                else throw new Error("Failed fetching resource")
            })
            .then(posts => setData(posts))
            .catch(err => {
                console.error(err)
                setError(err.message)
            })
            .finally(() => setLoading(false))
    }

    // fetch data on component load
    useEffect(() => fetchData(url), [url])

    return { data, loading, error, refetch: fetchData }
}

// used to execute more specific functions that can be called from within functions in InventoryContext
function useFetchDataMutation(url) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // This is the trigger function you call inside event handlers
    const execute = async (options = {}, dynamicUrl = null) => {
        setLoading(true)
        setError(null)
        const targetUrl = dynamicUrl || url

        return fetch(targetUrl, options)
            .then(r => {
                if (!r.ok) throw new Error("fetch failed:", r.status)
                return isEmptyResponse(r) ? null : r.json()
            })
            .then(result => {
                setData(result)
                return result
            })
            .catch(err => {
                console.error(err)
                setError(err.message)
                throw err
            })
            .finally(() => setLoading(false))
    }

    return { execute, data, loading, error }
}

// utility function to check if a response is empty, particularly useful for DELETE fetches
async function isEmptyResponse(r) {
    // return immediately if status 204
    if (r.status === 204) return true
    // extract response as text to avoid parsing errors
    const text = await r.text()
    if (!text.trim()) return true  // it is empty text

    // check for various types of content
    try {
        const data = JSON.parse(text)
        if (data === null) return true
        if (Array.isArray(data) && data.length === 0) return true
        if (typeof data === "object" && Object.keys(data).length === 0) return true
        // if it passed all checks, it must have content
        return false
    }
    catch (err) {
        // if json parsing fails, assume response was not empty
        // handle response according to your API
        return false
    }

}

export { useFetchData, useFetchDataMutation }