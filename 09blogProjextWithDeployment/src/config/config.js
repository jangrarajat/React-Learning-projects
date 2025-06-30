const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwritePROJECT_ID: String(import.meta.env.VITE_PROJECT_ID),
    appwriteDATABASE_ID: String(import.meta.env.VITE_DATABASE_ID),
    appwriteCOLLECTION_ID: String(import.meta.env.VITE_COLLECTION_ID),
    appwriteBUCKET_ID: String(import.meta.env.VITE_BUCKET_ID),
}

export default conf