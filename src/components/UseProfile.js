import { useState, useEffect } from "react"
export const useProfile = () => {
    const [data, setData] = useState(false)
    const [loading, setLaoding] = useState(false)
    useEffect(()=>{
        const apiURl = process.env.API_URL
        setLaoding(true)
        fetch(`${apiURl}/api/profile`).then(response =>{
            response.json().then(data => {
                setData(data)
                setLaoding(false)
            })
        })
    }, [])
    return {data, loading};
}