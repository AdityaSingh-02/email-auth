import { Client } from "appwrite"

const configs = {
    endpoint: String(process.env.NEXT_PUBLIC_APPWRITE_URL),
    projectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
}

const client = new Client();
client
    .setEndpoint(configs.endpoint)
    .setProject(configs.projectId)

export default client;