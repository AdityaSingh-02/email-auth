import UserManager from '../config';

const useAuth = () => {
    const user: Promise<boolean> = UserManager.getInstance().isLoggedIn();
    Promise.resolve(user).then((res) => {
        if (res) {
            return true;
        }
    })
    return false;
}

export default useAuth