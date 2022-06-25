import { useEffect } from "react"

interface redirectType {
    path: string;
}

export const Redirect = ({path}: redirectType) => {
    useEffect(() => {
        console.log(path)
        window.location.href = path; 
    }, [])
    return <></>
}