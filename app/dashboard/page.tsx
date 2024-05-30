'use client'
import React, { useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import { useRouter } from "next/navigation"
import UserManager from '../config'

const page = () => {
    const router = useRouter();
    const auth = useAuth();
    if (!auth) {
        router.push('/')
    }

    return (
        <div>DashBoard</div>
    )
}

export default page