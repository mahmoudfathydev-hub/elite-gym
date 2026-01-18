"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import StatsOverview from "./components/StatsOverview"
import AddTraineeForm from "./components/AddTraineeForm"
import UpcomingSessions from "./components/UpcomingSessions"
import RecentActivity from "./components/RecentActivity"
import { FaFire, FaUsers, FaChartLine, FaClock } from "react-icons/fa6"
import { databases, appwriteConfig } from "@/lib/appwrite"
import { FaTrash } from "react-icons/fa"
import toast from "react-hot-toast"
import DashboardLayout from "@/Components/Dashboard/DashboardLayout"

const getImageUrl = (imageFileId: string) => {
    if (!imageFileId) return null
    return `${appwriteConfig.endpoint}/storage/buckets/696c125f0034d324438c/files/${imageFileId}/view?project=${appwriteConfig.projectId}`
}
type TraineeFormData = { fullName: string, weight: number, height: number, image: string }
type Trainee = TraineeFormData & { $id: string, $createdAt: string }
const HomeDashboard = () => {
    const router = useRouter()
    const [userName] = useState(() => {
        if (typeof window !== "undefined") {
            const storedUser = localStorage.getItem("user")
            if (storedUser) {
                try {
                    const userData = JSON.parse(storedUser)
                    return userData.name || "User"
                } catch { }
            }
        }
        return "User"
    })
    const [trainees, setTrainees] = useState<Trainee[]>([])
    const [loading, setLoading] = useState(true)

    const fetchTrainees = async () => {
        try {
            setLoading(true)
            const response = await databases.listDocuments(appwriteConfig.databaseId, 'trainee')
            setTrainees(response.documents as unknown as Trainee[])
        } catch (error) {
            toast.error("Failed to load trainees")
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchTrainees()
    }, [])
    const [activities, setActivities] = useState([
        { id: 1, trainee: "Mahmoud Fathy", activity: "Completed chest workout", time: "2 hours ago" },
        { id: 2, trainee: "Hana Ahmed", activity: "Updated weight: 64kg", time: "4 hours ago" },
        { id: 3, trainee: "Mostafa Emad", activity: "Scheduled next session", time: "Yesterday" }
    ])
    useEffect(() => {
        if (trainees.length === 0) {
            setActivities([])
        }
    }, [trainees.length])
    const stats = { currentStreak: 12, traineesCount: trainees.length, progressPercentage: 75, nextSession: "Today at 3:00 PM" }
    const handleAddTrainee = (trainee: TraineeFormData & { joinDate: string }) => {
        fetchTrainees()
        setActivities(prev => [{ id: prev.length + 1, trainee: trainee.fullName, activity: "New trainee added", time: "Just now" }, ...prev])
    }
    const handleDeleteTrainee = async (traineeId: string, traineeName: string) => {
        const toastId = toast.loading(`Deleting ${traineeName}...`);
        try {
            await databases.deleteDocument(appwriteConfig.databaseId, 'trainee', traineeId)
            fetchTrainees()
            setActivities(prev => [{ id: prev.length + 1, trainee: traineeName, activity: "Trainee removed", time: "Just now" }, ...prev])
            toast.success(`${traineeName} deleted successfully`, { id: toastId });
        } catch (error) {
            toast.error("Failed to delete trainee", { id: toastId });
        }
    }

    const handleViewProfile = (traineeId: string) => {
        router.push(`/dashboard/trainee/${traineeId}`)
    }

    return (
        <DashboardLayout>
            <div className="p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h1 data-aos="fade-down" className="text-4xl font-bold text-white mb-2">Welcome back, {userName}</h1>
                        <p data-aos="fade-up-right" className="text-slate-400">Here&apos;s what&apos;s happening with your gym today</p>
                    </div>
                    <div data-aos="flip-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatsOverview icon={<FaFire className="text-orange-400" />} title="Streak" value={`${stats.currentStreak} days`} color="from-orange-500/10 to-orange-600/10" />
                        <StatsOverview icon={<FaUsers className="text-sky-400" />} title="Total Trainees" value={stats.traineesCount} color="from-sky-500/10 to-blue-600/10" />
                        <StatsOverview icon={<FaChartLine className="text-green-400" />} title="Progress" value={`${stats.progressPercentage}%`} color="from-green-500/10 to-emerald-600/10" />
                        <StatsOverview icon={<FaClock className="text-purple-400" />} title="Next Session" value={stats.nextSession} color="from-purple-500/10 to-pink-600/10" />
                    </div>
                    <div data-aos="zoom-in-right" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <AddTraineeForm onAddTrainee={handleAddTrainee} />
                            <UpcomingSessions traineesCount={trainees.length} />
                        </div>
                        <div><RecentActivity activities={activities} /></div>
                    </div>
                    <div className="mt-8 bg-linear-to-br from-slate-900 to-slate-800 rounded-xl border border-slate-700 p-6">
                        <h2 className="text-2xl font-bold text-white mb-6">Your Trainees</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {loading ? (
                                <div className="col-span-full text-center text-slate-400 py-8">Loading trainees...</div>
                            ) : trainees.length === 0 ? (
                                <div className="col-span-full text-center text-slate-400 py-8">No trainees added yet</div>
                            ) : (
                                trainees.map(t => (
                                    <div key={t.$id} className="bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden hover:border-sky-500/50 transition relative group">
                                        <button
                                            onClick={() => handleDeleteTrainee(t.$id, t.fullName)}
                                            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 shadow-lg"
                                            title="Delete trainee"
                                        >
                                            <FaTrash size={14} />
                                        </button>
                                        <div className="relative w-full aspect-4/3 overflow-hidden bg-slate-900">
                                            {t.image && getImageUrl(t.image) ? (
                                                <img
                                                    src={getImageUrl(t.image)!}
                                                    alt={t.fullName}
                                                    className="h-full  w-full object-cover object-center transition-transform duration-300 hover:scale-105"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = 'none'
                                                        e.currentTarget.nextElementSibling?.classList.remove('hidden')
                                                    }}
                                                />
                                            ) : null}
                                            <div className={`flex h-full w-full items-center justify-center ${t.image ? 'hidden' : ''}`}>
                                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-800 text-2xl font-semibold text-slate-400">{t.fullName.charAt(0)}</div>
                                            </div>
                                            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold text-white">{t.fullName}</h3>
                                            <div className="grid grid-cols-2 gap-2 mt-3 text-sm text-slate-300">
                                                <div><p className="text-slate-500 text-xs">Weight</p><p className="font-semibold">{t.weight} kg</p></div>
                                                <div><p className="text-slate-500 text-xs">Height</p><p className="font-semibold">{t.height} cm</p></div>
                                            </div>
                                            <p className="text-xs text-slate-500 mt-2">Joined: {new Date(t.$createdAt).toLocaleDateString()}</p>
                                            <button
                                                onClick={() => handleViewProfile(t.$id)}
                                                className="w-full mt-4 bg-linear-to-r from-sky-500 to-blue-600 text-white py-2 rounded-lg hover:from-sky-600 hover:to-blue-700 transition-all"
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
export default HomeDashboard