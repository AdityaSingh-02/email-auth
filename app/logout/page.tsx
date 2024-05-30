'use client'
import useLogout from '../hooks/useLogout'

const Logout = () => {
    useLogout();
    return (
        <div>Logging out</div>
    )
}

export default Logout