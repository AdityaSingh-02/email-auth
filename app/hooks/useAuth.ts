import UserManager from '../config';

const useAuth = async () => {
    const user = await UserManager.getInstance().isLoggedIn();
    if (user) {
        return { status: "success", username: user?.name || "", email: user.email };
    } else {
        return { status: "failure" };
    }
}

export default useAuth