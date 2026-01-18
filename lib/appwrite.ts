import { Client, Databases, ID, Storage } from 'appwrite';

export const appwriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  projectId: '696c057c003136f156e4',
  databaseId: '696c0b35001452976f17',
};

export const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

export const databases = new Databases(client);
export const storage = new Storage(client);

export { ID };
