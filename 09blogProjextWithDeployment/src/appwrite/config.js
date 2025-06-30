import conf from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";
export class Service {
    Client = new Client();
    databases;
    bucket;

    constructor() {
        this.Client
            .setEndPoint(conf.appwriteUrl)
            .setProject(conf.appwritePROJECT_ID);
        this.databases = new Databases(this.Client);
        this.bucket = new Storage(this.Client);
    }
    async createPost({ title, slug, content, featuredImage
        , status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDATABASE_ID,
                conf.appwriteCOLLECTION_ID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            throw error
        }
    }
    async updatePost(slug, { title, content, featuredImage
        , status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDATABASE_ID,
                conf.appwriteCOLLECTION_ID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            throw error
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDATABASE_ID,
                conf.appwriteCOLLECTION_ID,
                slug
            )
            return true
        } catch (error) {
            throw error
            return false
        }
    }

    async getPost(slug) {

        try {
            return await this.databases.getDocument(
                conf.appwriteDATABASE_ID,
                conf.appwriteCOLLECTION_ID,
                slug
            )
        } catch (error) {
            throw error
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDATABASE_ID,
                conf.appwriteCOLLECTION_ID,
                queries,

            )
        } catch (error) {
            throw error
        }
    }
    //file uplode services
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBUCKET_ID,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBUCKET_ID,
                fileId
            )
            return true
        } catch (error) {
            throw error
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview
        conf.appwriteBUCKET_ID,
            fileId
    }

}

const service = new Service()

export default Service