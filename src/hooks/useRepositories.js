import { useState, useEffect } from 'react'

const useRepositories = () => {
    const [repositories, setRepositories] = useState()
    const [loading, setLoading] = useState(false)

    const fetchRepositories = async () => {
        console.log('hello world')
        setLoading(true)

        const response = await fetch(
            'http://192.168.10.35:5000/api/repositories'
        )
        const json = await response.json()

        setLoading(false)
        setRepositories(json)
    }

    useEffect(() => {
        fetchRepositories()
    }, [])

    return { repositories, loading, refetch: fetchRepositories }
}

export default useRepositories
