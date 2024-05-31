'use client'
import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { useRouter } from "next/navigation"
import useLogout from '../hooks/useLogout'

const DashBoard = () => {
    const router = useRouter();
    const [name, setName] = useState<string | undefined>('')
    useAuth().then(res => {
        if (res.status === 'failure') {
            router.push('/')
        } else {
            setName(res?.username)
        }
    })

    const logoutUser = () => {
        router.push('/logout')
    }

    return (
        <>
            <div>DashBoard Welcome - {name}</div>
            <button onClick={logoutUser}>Logout</button>
        </>
    )
}

export default DashBoard