"use client"
import { useState, DragEvent, ChangeEvent, FormEvent } from "react"
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa"
import { databases, ID, appwriteConfig, client, storage } from "@/lib/appwrite"
import toast from "react-hot-toast"

interface TraineeFormData {
    fullName: string
    weight: number
    height: number
    image: string
    imageId: string
}

interface AddTraineeFormProps {
    onAddTrainee: (trainee: TraineeFormData & { joinDate: string }) => void
}

const AddTraineeForm = ({ onAddTrainee }: AddTraineeFormProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [dragActive, setDragActive] = useState(false)
    const [formData, setFormData] = useState<TraineeFormData>({
        fullName: "",
        weight: 0,
        height: 0,
        image: "",
        imageId: ""
    })
    const handleDrag = (e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") setDragActive(true)
        if (e.type === "dragleave") setDragActive(false)
    }

    const handleDrop = async (e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        const file = e.dataTransfer.files?.[0]
        if (file && file.type.startsWith("image/")) {
            await uploadImage(file)
        }
    }

    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            await uploadImage(file)
        }
    }

    const uploadImage = async (file: File) => {
        const toastId = toast.loading("Uploading image...");
        try {
            // Upload image to Appwrite Storage
            const response = await storage.createFile(
                '696c125f0034d324438c', // Storage Bucket ID
                ID.unique(),
                file
            )

            // Get file preview URL
            let imageUrl: string
            try {
                const previewUrl = storage.getFilePreview('696c125f0034d324438c', response.$id)
                imageUrl = previewUrl.toString()
            } catch (urlError) {
                // Fallback: construct URL manually using view endpoint (no transformations)
                imageUrl = `${appwriteConfig.endpoint}/storage/buckets/696c125f0034d324438c/files/${response.$id}/view?project=${appwriteConfig.projectId}`
            }

            setFormData({
                ...formData,
                image: imageUrl,
                imageId: response.$id
            })
            toast.success("Image uploaded successfully!", { id: toastId });
        } catch (error) {
            console.error("Error uploading image:", error)

            // Fallback: use empty values
            setFormData({
                ...formData,
                image: "",
                imageId: ""
            })

            toast.error(`Image upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`, { id: toastId });
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: name === "fullName" ? value : parseFloat(value) || 0 })
    }
    const getUserEmail = (): string => {
        try {
            const userStr = localStorage.getItem("user")
            if (userStr) {
                const user = JSON.parse(userStr)
                return user.email || "unknown@example.com"
            }
        } catch (error) {
            // Error reading from localStorage, continue anyway
        }
        return "unknown@example.com"
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!formData.fullName || !formData.weight || !formData.height) {
            toast.error("Please fill in all required fields");
            return;
        }

        const toastId = toast.loading("Adding trainee...");
        try {
            const email = getUserEmail()
            const joinDate = new Date().toISOString().split("T")[0]

            // Create new trainee document in Appwrite
            const response = await databases.createDocument(
                appwriteConfig.databaseId,
                'trainee', // Collection name
                ID.unique(),
                {
                    fullName: formData.fullName, // Use 'fullName' field as per collection
                    weight: formData.weight,
                    height: formData.height,
                    image: formData.imageId || "" // Store file ID, not URL
                }
            )

            const trainee = {
                ...formData,
                joinDate: joinDate,
                email: email
            }
            onAddTrainee(trainee)
            setFormData({ fullName: "", weight: 0, height: 0, image: "", imageId: "" })
            setIsOpen(false)

            toast.success(`${formData.fullName} added successfully!`, { id: toastId });

        } catch (error) {
            console.error("Error creating trainee:", error)
            toast.error(`Failed to add trainee: ${error instanceof Error ? error.message : 'Unknown error'}`, { id: toastId });
        }
    }

    return (
        <div className="bg-linear-to-br from-slate-900 to-slate-800 rounded-xl border border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">Add New Trainee</h2>
                {!isOpen && (
                    <button onClick={() => setIsOpen(true)} className="bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-green-500/50">
                        + Add Trainee
                    </button>
                )}
            </div>
            {isOpen && (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${dragActive ? "border-sky-500 bg-sky-500/10" : "border-slate-600 bg-slate-800/50 hover:border-sky-400"}`}>
                        {formData.image ? (
                            <div className="relative inline-block">
                                <img src={formData.image} className="w-32 h-32 object-cover rounded-lg" />
                                <button type="button" onClick={() => setFormData({ ...formData, image: "", imageId: "" })} className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1">
                                    <FaTimes size={16} />
                                </button>
                            </div>
                        ) : (
                            <div>
                                <FaCloudUploadAlt className="mx-auto mb-3 text-4xl text-sky-400" />
                                <p className="text-white font-semibold mb-2">Drag and drop your image here</p>
                                <p className="text-slate-400 text-sm mb-4">or</p>
                                <label>
                                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                    <span className="text-sky-400 hover:text-sky-300 cursor-pointer font-semibold">Click to select</span>
                                </label>
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white" />
                        <input name="weight" type="number" value={formData.weight || ""} onChange={handleChange} placeholder="Weight (kg)" className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white" />
                        <input name="height" type="number" value={formData.height || ""} onChange={handleChange} placeholder="Height (cm)" className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white md:col-span-2" />
                    </div>
                    <div className="flex gap-4">
                        <button type="submit" className="flex-1 bg-linear-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white py-2 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-sky-500/50">
                            Add Trainee
                        </button>
                        <button type="button" onClick={() => setIsOpen(false)} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg font-semibold transition-all duration-200">
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default AddTraineeForm
