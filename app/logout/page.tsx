'use client'
import useLogout from '../hooks/useLogout'

const page = () => {
    useLogout();
    return (
        <div>Logging out</div>
    )
}

export default page