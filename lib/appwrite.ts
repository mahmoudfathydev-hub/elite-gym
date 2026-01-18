import { Client, Databases, ID, Storage, Account } from 'appwrite';
export const appwriteConfig = {
  endpoint: 'https://fra.cloud.appwrite.io/v1',
  projectId: '696c057c003136f156e4',
  databaseId: '696c0b35001452976f17',
  authCollectionId: '696d3463003347783c46',
};
export const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const account = new Account(client);
export { ID };
