import { Client, Databases, Account, ID } from 'appwrite';

const client = new Client()
    .setEndpoint('https://nyc.cloud.appwrite.io/v1') 
    .setProject('6861646d0039632d6399');              

const databases = new Databases(client);
const account = new Account(client);



export { client, databases, account, ID };