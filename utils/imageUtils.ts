import { appwriteConfig } from "@/lib/appwrite"
export const getImageUrl = (imageFileId: string) => {
    if (!imageFileId) return null
    const url = `${appwriteConfig.endpoint}/storage/buckets/696c125f0034d324438c/files/${imageFileId}/view?project=${appwriteConfig.projectId}`
    console.log("Constructed image URL:", url)
    return url
}
