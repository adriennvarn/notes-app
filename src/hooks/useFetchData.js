import { useState, useEffect, useCallback } from "react"

function useFetchData(url) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // get data automatically on useFetchData call
    const fetchData = useCallback(() => {
        setLoading(true)
        console.log("Fetching data from: ", url)

        fetch(url)
            .then(r => {
                if (r.ok) return r.json()
                else throw new Error("Failed fetching resource")
            })
            .then(items => setData(items))
            .catch(err => {
                console.error(err)
                setError(err.message)
            })
            .finally(() => setLoading(false))
    }, [url])

    // fetch data on component load
    useEffect(() => fetchData(), [url])

    return { data, loading, error, refetch: fetchData }
}

// used to execute more specific functions that can be called from within functions in InventoryContext
function useFetchDataMutation(url) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // This is the trigger function you call inside event handlers
    const execute = useCallback(async (options = {}, dynamicUrl = null) => {
        setLoading(true)
        setError(null)
        const targetUrl = dynamicUrl || url

        const finalResult = fetch(targetUrl, options)
            .then(async r => {
                if (!r.ok) throw new Error("fetch failed:", r.status)
                // convert response to text for safe management
                const text = await r.text()

                if (!text.trim()) return true  // it is empty text

                // check for various types of content
                try {
                    const data = JSON.parse(text)
                    if (data === null) return null
                    if (Array.isArray(data) && data.length === 0) return null
                    if (typeof data === "object" && Object.keys(data).length === 0) return null
                    // if it passed all checks, it must have content
                    return data
                }
                catch (err) {
                    // if json parsing fails, assume response was not empty
                    // handle response according to your API
                    console.error("json parsing error:", err)
                    return text
                }
            })
            .then(result => {
                setData(result)
                return result
            })
            .catch(err => {
                console.error(err)
                setError(err.message)
            })
            .finally(() => setLoading(false))

        return finalResult
    }, [url])

    return { execute, data, loading, error }
}


export { useFetchData, useFetchDataMutation }