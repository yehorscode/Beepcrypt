import { Client, Databases } from 'appwrite';

export const appwriteClient = new Client();
// Ustaw endpoint i projectId na sztywno lub użyj import.meta.env (Vite)
appwriteClient
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT || '')
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID || '');

export const databases = new Databases(appwriteClient);
