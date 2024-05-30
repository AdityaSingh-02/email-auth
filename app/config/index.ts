import client from "./client-config";
import { Account, AppwriteException, ID } from 'appwrite'

export interface User {
    name: string;
    email: string;
}

const account = new Account(client);

export class UserManager {
    private userId;
    private static instance: UserManager;

    private constructor() {
        this.userId = "";
    }

    // Singleton Pattern
    public static getInstance(): UserManager {
        if (!UserManager.instance) {
            UserManager.instance = new UserManager();
        }
        return UserManager.instance;
    }

    async createUser({ name, email }: User) {
        try {
            const newAccount = await account.create(ID.unique(), email, ID.unique().toString(), name);
            if (newAccount) {
                await this.sendOtp(email);
                return { status: "success" };
            }
        } catch (error: any) {
            return new AppwriteException(error).response;
        }
    }

    async sendOtp(email: string) {
        try {
            const sessionToken = await account.createEmailToken(ID.unique(), email);
            this.userId = sessionToken.userId;
            return { sessionToken };
        } catch (error: any) {
            if (error.code === 'user-not-found') {
                console.log('User not found. Please check your credentials.');
            } else {
                console.log('An error occurred:', error.message);
            }
        }
    }

    async verifyOtp(otp: string) {
        try {
            const session = await account.createSession(this.userId, otp);
            return { status: "success", session };
        } catch (error) {
            console.error("Error While Verifying Otp / Invalid OTP ", error);
        }
    }

    async isLoggedIn() {
        try {
            const user = await this.getUser();
            return Boolean(user);
        } catch (error) {
            console.error("Error While checking user is logged in ", error);
            return false;
        }
    }

    private async getUser() {
        try {
            const user = await account.get();
            return user;
        } catch (error) {
            console.error("Error While getting user ", error);
        }
    }

    async logout() {
        try {
            await account.deleteSession('current');
            return { status: "success" };
        } catch (error) {
            console.error("Error While logging out ", error);
        }
    }
}

export default UserManager;