import { appwriteConfig } from "@/lib/appwrite"

// Helper function to construct image URL from file ID
export const getImageUrl = (imageFileId: string) => {
    if (!imageFileId) return null
    // Use direct file view instead of preview (no transformations)
    const url = `${appwriteConfig.endpoint}/storage/buckets/696c125f0034d324438c/files/${imageFileId}/view?project=${appwriteConfig.projectId}`
    console.log("Constructed image URL:", url)
    return url
}
