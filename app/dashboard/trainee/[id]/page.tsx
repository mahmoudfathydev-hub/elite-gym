"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { databases, appwriteConfig } from "@/lib/appwrite"
import { FaArrowLeft, FaWeight, FaRuler, FaCalendar, FaEnvelope, FaEdit } from "react-icons/fa"
import { User, Activity, TrendingUp } from "lucide-react"
import toast from "react-hot-toast"
import DashboardLayout from "@/Components/Dashboard/DashboardLayout"

const getImageUrl = (imageFileId: string) => {
    if (!imageFileId) return null
    return `${appwriteConfig.endpoint}/storage/buckets/696c125f0034d324438c/files/${imageFileId}/view?project=${appwriteConfig.projectId}`
}

type Trainee = {
    $id: string
    fullName: string
    weight: number
    height: number
    image: string
    $createdAt: string
}

export default function TraineeProfilePage() {
    const params = useParams()
    const router = useRouter()
    const [trainee, setTrainee] = useState<Trainee | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchTrainee()
    }, [params.id])

    const fetchTrainee = async () => {
        try {
            setLoading(true)
            const response = await databases.getDocument(
                appwriteConfig.databaseId,
                'trainee',
                params.id as string
            )
            setTrainee(response as unknown as Trainee)
        } catch (error) {
            toast.error("Failed to load trainee profile")
        } finally {
            setLoading(false)
        }
    }

    const calculateBMI = (weight: number, height: number) => {
        const heightInMeters = height / 100
        const bmi = weight / (heightInMeters * heightInMeters)
        return bmi.toFixed(1)
    }

    const getBMICategory = (bmi: number) => {
        if (bmi < 18.5) return { category: "Underweight", color: "text-yellow-400" }
        if (bmi < 25) return { category: "Normal", color: "text-green-400" }
        if (bmi < 30) return { category: "Overweight", color: "text-orange-400" }
        return { category: "Obese", color: "text-red-400" }
    }

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-white text-xl">Loading trainee profile...</div>
                </div>
            </DashboardLayout>
        )
    }

    if (!trainee) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <p className="text-white text-xl mb-4">Trainee not found</p>
                        <button
                            onClick={() => router.push('/dashboard')}
                            className="px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            </DashboardLayout>
        )
    }

    const bmi = calculateBMI(trainee.weight, trainee.height)
    const bmiInfo = getBMICategory(parseFloat(bmi))

    return (
        <DashboardLayout>
            <div className="p-8 max-w-7xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => router.push('/dashboard')}
                    className="flex items-center gap-2 text-slate-400 hover:text-sky-400 transition mb-8"
                    data-aos="fade-right"
                >
                    <FaArrowLeft />
                    <span>Back to Dashboard</span>
                </button>

                {/* Profile Header */}
                <div className="bg-linear-to-br from-slate-900 to-slate-800 rounded-xl border border-slate-700 p-8 mb-8" data-aos="fade-up">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Profile Image */}
                        <div className="relative">
                            <div className="w-48 h-48 rounded-xl overflow-hidden bg-slate-800 border-4 border-sky-500/50">
                                {trainee.image && getImageUrl(trainee.image) ? (
                                    <img
                                        src={getImageUrl(trainee.image)!}
                                        alt={trainee.fullName}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none'
                                            e.currentTarget.nextElementSibling?.classList.remove('hidden')
                                        }}
                                    />
                                ) : null}
                                <div className={`flex h-full w-full items-center justify-center ${trainee.image ? 'hidden' : ''}`}>
                                    <div className="flex h-32 w-32 items-center justify-center rounded-full bg-slate-700 text-5xl font-semibold text-slate-300">
                                        {trainee.fullName.charAt(0)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Profile Info */}
                        <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h1 className="text-4xl font-bold text-white mb-2">{trainee.fullName}</h1>
                                    <div className="flex items-center gap-2 text-slate-400">
                                        <FaCalendar size={16} />
                                        <span>Joined {new Date(trainee.$createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}</span>
                                    </div>
                                </div>
                                <button className="flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition">
                                    <FaEdit />
                                    <span>Edit Profile</span>
                                </button>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                                    <div className="flex items-center gap-2 text-slate-400 mb-2">
                                        <FaWeight size={16} />
                                        <span className="text-sm">Weight</span>
                                    </div>
                                    <p className="text-2xl font-bold text-white">{trainee.weight} kg</p>
                                </div>

                                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                                    <div className="flex items-center gap-2 text-slate-400 mb-2">
                                        <FaRuler size={16} />
                                        <span className="text-sm">Height</span>
                                    </div>
                                    <p className="text-2xl font-bold text-white">{trainee.height} cm</p>
                                </div>

                                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                                    <div className="flex items-center gap-2 text-slate-400 mb-2">
                                        <Activity size={16} />
                                        <span className="text-sm">BMI</span>
                                    </div>
                                    <p className={`text-2xl font-bold ${bmiInfo.color}`}>{bmi}</p>
                                    <p className="text-xs text-slate-400 mt-1">{bmiInfo.category}</p>
                                </div>

                                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                                    <div className="flex items-center gap-2 text-slate-400 mb-2">
                                        <TrendingUp size={16} />
                                        <span className="text-sm">Progress</span>
                                    </div>
                                    <p className="text-2xl font-bold text-green-400">+5%</p>
                                    <p className="text-xs text-slate-400 mt-1">This month</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Info Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Personal Information */}
                    <div className="bg-linear-to-br from-slate-900 to-slate-800 rounded-xl border border-slate-700 p-6" data-aos="fade-right">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <User className="text-sky-400" size={24} />
                            Personal Information
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-slate-500">Full Name</label>
                                <p className="text-white font-semibold">{trainee.fullName}</p>
                            </div>
                            <div>
                                <label className="text-sm text-slate-500">Member ID</label>
                                <p className="text-white font-mono text-sm">{trainee.$id}</p>
                            </div>
                            <div>
                                <label className="text-sm text-slate-500">Join Date</label>
                                <p className="text-white">{new Date(trainee.$createdAt).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <label className="text-sm text-slate-500">Membership Status</label>
                                <p className="text-green-400 font-semibold">Active</p>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-linear-to-br from-slate-900 to-slate-800 rounded-xl border border-slate-700 p-6" data-aos="fade-left">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <Activity className="text-green-400" size={24} />
                            Recent Activity
                        </h2>
                        <div className="space-y-4">
                            <div className="border-l-2 border-sky-500 pl-4 py-2">
                                <p className="text-white font-semibold">Profile Created</p>
                                <p className="text-sm text-slate-400">
                                    {new Date(trainee.$createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="border-l-2 border-green-500 pl-4 py-2">
                                <p className="text-white font-semibold">Weight Recorded: {trainee.weight}kg</p>
                                <p className="text-sm text-slate-400">Initial measurement</p>
                            </div>
                            <div className="border-l-2 border-purple-500 pl-4 py-2">
                                <p className="text-white font-semibold">Height Recorded: {trainee.height}cm</p>
                                <p className="text-sm text-slate-400">Initial measurement</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress Chart Placeholder */}
                <div className="mt-8 bg-linear-to-br from-slate-900 to-slate-800 rounded-xl border border-slate-700 p-6" data-aos="fade-up" data-aos-delay="100">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <TrendingUp className="text-orange-400" size={24} />
                        Progress Tracking
                    </h2>
                    <div className="bg-slate-800/50 rounded-lg p-12 border border-slate-700 text-center">
                        <p className="text-slate-400 text-lg">Progress tracking charts coming soon...</p>
                        <p className="text-slate-500 text-sm mt-2">Track weight, measurements, and workout progress over time</p>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
