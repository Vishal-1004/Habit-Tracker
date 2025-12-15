import { Account, Client, Databases, Storage } from "react-native-appwrite";

// https://fra.cloud.appwrite.io/v1
// 693e64ea000894cab07e
export const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID as string);

console.log(client.config.endpoint);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
