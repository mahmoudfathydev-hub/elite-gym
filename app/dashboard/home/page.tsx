"use client"
import { useState, useEffect } from "react"
import StatsOverview from "./components/StatsOverview"
import AddTraineeForm from "./components/AddTraineeForm"
import UpcomingSessions from "./components/UpcomingSessions"
import RecentActivity from "./components/RecentActivity"
import { FaFire, FaUsers, FaChartLine, FaClock, FaRocket } from "react-icons/fa6"
import { LayoutDashboard, CalendarClock, CreditCard } from "lucide-react"
import { databases, appwriteConfig } from "@/lib/appwrite"
import { FaTrash } from "react-icons/fa"

const getImageUrl = (imageFileId: string) => {
    if (!imageFileId) return null
    return `${appwriteConfig.endpoint}/storage/buckets/696c125f0034d324438c/files/${imageFileId}/view?project=${appwriteConfig.projectId}`
}

type TraineeFormData = { fullName: string, weight: number, height: number, image: string }
type Trainee = TraineeFormData & { $id: string, $createdAt: string }

const HomeDashboard = () => {
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
    const links = [
        { id: 1, name: "Dashboard", href: "/dashboard/", icon: <LayoutDashboard /> },
        { id: 2, name: "My Schedule", href: "/dashboard/ScheduleCaptain", icon: <CalendarClock /> },
        { id: 3, name: "Payment", href: "/dashboard/payment", icon: <CreditCard /> },
    ]

    const fetchTrainees = async () => {
        try {
            setLoading(true)
            const response = await databases.listDocuments(appwriteConfig.databaseId, 'trainee')
            setTrainees(response.documents as unknown as Trainee[])
        } catch (error) {
            console.error("Error fetching trainees:", error)
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

    const handleDeleteTrainee = async (traineeId: string) => {
        if (!confirm("Are you sure you want to delete this trainee?")) return
        try {
            await databases.deleteDocument(appwriteConfig.databaseId, 'trainee', traineeId)
            fetchTrainees()
            setActivities(prev => [{ id: prev.length + 1, trainee: "Deleted trainee", activity: "Trainee removed", time: "Just now" }, ...prev])
        } catch (error) {
            console.error("Error deleting trainee:", error)
            alert("Failed to delete trainee. Please try again.")
        }
    }

    return (
        <main className="flex mt-20 min-h-screen bg-slate-950">
            <aside data-aos="fade-right" className="fixed top-20 left-0 z-10 h-[calc(100vh-5rem)] w-64 bg-linear-to-b from-slate-950 to-slate-900 border-r border-slate-800 p-6 text-white shadow-2xl overflow-y-auto">
                <div className="mb-4 flex items-center gap-3 rounded-lg bg-linear-to-b from-sky-500/10 to-blue-500/10 p-4 border border-sky-500/20">
                    <span className="text-3xl text-sky-400 animate-pulse"><FaRocket /></span>
                    <div>
                        <h2 className="text-lg font-bold text-white">Captain&apos;s</h2>
                        <p className="text-xs font-semibold text-sky-300 tracking-wider">CONTROL CENTER</p>
                    </div>
                </div>
                <nav className="flex flex-col gap-3">
                    {links.map(link => (
                        <a key={link.id} href={link.href} className="flex items-center gap-4 rounded-lg px-4 py-3 text-slate-300 transition-all duration-200 hover:bg-linear-to-r hover:from-sky-500/20 hover:to-blue-500/20 hover:text-sky-300 hover:border-l-4 hover:border-sky-400 group">
                            <span className="text-xl text-sky-400 group-hover:text-sky-300 transition-colors">{link.icon}</span>
                            <span className="font-medium">{link.name}</span>
                        </a>
                    ))}
                </nav>
            </aside>

            <div className="flex-1 ml-64 p-8 overflow-auto">
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
                    <div  className="mt-8 bg-linear-to-br from-slate-900 to-slate-800 rounded-xl border border-slate-700 p-6">
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
                                            onClick={() => handleDeleteTrainee(t.$id)}
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
                                            <button className="w-full mt-4 bg-linear-to-r from-sky-500 to-blue-600 text-white py-2 rounded-lg">View Details</button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
export default HomeDashboard
