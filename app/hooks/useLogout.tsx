'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import UserManager from '../config';

const useLogout = () => {
    const router = useRouter();
    useEffect(() => {
        UserManager.getInstance().logout().then((res) => {
            router.push('/')
        })
    }, [])
    return (
        <></>
    )
}

export default useLogout