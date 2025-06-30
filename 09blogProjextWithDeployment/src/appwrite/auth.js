import conf from './config'

import { Client, Account, ID } from "appwrite";

export class AuthService {
    Client = new Client();
    account;

    constructor() {
        this.Client
            .setEndPoint(conf.appwriteUrl)
            .setProject(conf.appwritePROJECT_ID);
        this.account = new Account(this.Client)
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                return this.login({ email, password })
            }
        } catch (error) {
            throw error;
        }

    }
    async login({ email, password }) {
        try {
            await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }

    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        }
        catch (error) {
            throw error;
        }

        return null;
    }

    async logout() {
        try {
            await this.account.deleteSession();
        }
        catch (error) {
            throw error
        }
    }
}

const authService = new AuthService();

export default authService