"use client"

import { useState, useEffect } from "react"
import { databases, appwriteConfig } from "@/lib/appwrite"
import { FaUsers, FaUserTie, FaDumbbell, FaSearch, FaFilter } from "react-icons/fa"
import { Users, Crown, Activity } from "lucide-react"
import DashboardLayout from "@/Components/Dashboard/DashboardLayout"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

interface Trainee {
    $id: string
    fullName: string
    weight: number
    height: number
    image: string
    $createdAt: string
}

interface Member {
    id: string
    name: string
    email: string
    role: "trainee" | "captain"
    joinDate: string
    image?: string
    weight?: number
    height?: number
}

const getImageUrl = (imageFileId: string) => {
    if (!imageFileId) return null
    return `${appwriteConfig.endpoint}/storage/buckets/696c125f0034d324438c/files/${imageFileId}/view?project=${appwriteConfig.projectId}`
}

export default function MembersPage() {
    const router = useRouter()
    const [members, setMembers] = useState<Member[]>([])
    const [filteredMembers, setFilteredMembers] = useState<Member[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [filterRole, setFilterRole] = useState<"all" | "trainee" | "captain">("all")

    useEffect(() => {
        fetchMembers()
    }, [])

    useEffect(() => {
        filterMembers()
    }, [searchQuery, filterRole, members])

    const fetchMembers = async () => {
        try {
            setLoading(true)

            // Fetch trainees from Appwrite
            const traineesResponse = await databases.listDocuments(
                appwriteConfig.databaseId,
                'trainee'
            )

            const traineeMembers: Member[] = (traineesResponse.documents as unknown as Trainee[]).map(trainee => ({
                id: trainee.$id,
                name: trainee.fullName,
                email: `${trainee.fullName.toLowerCase().replace(/\s+/g, '.')}@elite-gym.com`,
                role: "trainee" as const,
                joinDate: trainee.$createdAt,
                image: trainee.image,
                weight: trainee.weight,
                height: trainee.height
            }))

            // Get captain from localStorage (current user)
            const captainData = localStorage.getItem("user")
            const captainMembers: Member[] = []

            if (captainData) {
                try {
                    const captain = JSON.parse(captainData)
                    if (captain.role === "captain") {
                        captainMembers.push({
                            id: "captain-1",
                            name: captain.name,
                            email: captain.email,
                            role: "captain",
                            joinDate: new Date().toISOString()
                        })
                    }
                } catch (error) {
                    // Error parsing captain data
                }
            }

            // Combine all members
            const allMembers = [...captainMembers, ...traineeMembers]
            setMembers(allMembers)
            setFilteredMembers(allMembers)
        } catch (error) {
            toast.error("Failed to load members")
        } finally {
            setLoading(false)
        }
    }

    const filterMembers = () => {
        let filtered = members

        // Filter by role
        if (filterRole !== "all") {
            filtered = filtered.filter(member => member.role === filterRole)
        }

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase()
            filtered = filtered.filter(member =>
                member.name.toLowerCase().includes(query) ||
                member.email.toLowerCase().includes(query)
            )
        }

        setFilteredMembers(filtered)
    }

    const handleViewProfile = (member: Member) => {
        if (member.role === "trainee") {
            router.push(`/dashboard/trainee/${member.id}`)
        } else {
            toast.success("Captain profile coming soon!")
        }
    }

    const stats = {
        total: members.length,
        trainees: members.filter(m => m.role === "trainee").length,
        captains: members.filter(m => m.role === "captain").length
    }

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-white text-xl">Loading members...</div>
                </div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout>
            <div className="p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8" data-aos="fade-down">
                        <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                            <Users className="text-emerald-400" size={40} />
                            Members Directory
                        </h1>
                        <p className="text-slate-400">Manage trainees and captains in your gym</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" data-aos="fade-up">
                        <div className="bg-linear-to-br from-emerald-900/30 to-emerald-800/20 rounded-xl border border-emerald-700/50 p-6">
                            <div className="flex items-center justify-between mb-2">
                                <FaUsers className="text-emerald-400 text-2xl" />
                                <span className="text-3xl font-bold text-white">{stats.total}</span>
                            </div>
                            <p className="text-slate-300">Total Members</p>
                        </div>

                        <div className="bg-linear-to-br from-sky-900/30 to-sky-800/20 rounded-xl border border-sky-700/50 p-6">
                            <div className="flex items-center justify-between mb-2">
                                <FaDumbbell className="text-sky-400 text-2xl" />
                                <span className="text-3xl font-bold text-white">{stats.trainees}</span>
                            </div>
                            <p className="text-slate-300">Trainees</p>
                        </div>

                        <div className="bg-linear-to-br from-purple-900/30 to-purple-800/20 rounded-xl border border-purple-700/50 p-6">
                            <div className="flex items-center justify-between mb-2">
                                <Crown className="text-purple-400 text-2xl" />
                                <span className="text-3xl font-bold text-white">{stats.captains}</span>
                            </div>
                            <p className="text-slate-300">Captains</p>
                        </div>
                    </div>

                    {/* Filters & Search */}
                    <div className="bg-slate-900/50 rounded-xl border border-slate-700 p-6 mb-8" data-aos="fade-up">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Search */}
                            <div className="relative">
                                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="text"
                                    placeholder="Search by name or email..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all"
                                />
                            </div>

                            {/* Role Filter */}
                            <div className="relative">
                                <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                <select
                                    value={filterRole}
                                    onChange={(e) => setFilterRole(e.target.value as any)}
                                    className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-all appearance-none cursor-pointer"
                                >
                                    <option value="all">All Members</option>
                                    <option value="trainee">Trainees Only</option>
                                    <option value="captain">Captains Only</option>
                                </select>
                            </div>
                        </div>

                        {/* Active Filters Info */}
                        <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
                            <Activity size={16} />
                            <span>
                                Showing {filteredMembers.length} of {members.length} members
                                {searchQuery && ` matching "${searchQuery}"`}
                            </span>
                        </div>
                    </div>

                    {/* Members Grid */}
                    {filteredMembers.length === 0 ? (
                        <div className="bg-slate-900/50 rounded-xl border border-slate-700 p-12 text-center" data-aos="fade-up">
                            <FaUsers className="text-slate-600 text-6xl mx-auto mb-4" />
                            <p className="text-slate-400 text-lg">No members found</p>
                            <p className="text-slate-500 text-sm mt-2">Try adjusting your search or filters</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-aos="fade-up">
                            {filteredMembers.map((member) => (
                                <div
                                    key={member.id}
                                    onClick={() => handleViewProfile(member)}
                                    className="bg-slate-900/50 rounded-xl border border-slate-700 overflow-hidden hover:border-emerald-500/50 transition-all duration-300 hover:scale-105 cursor-pointer group"
                                >
                                    {/* Member Image */}
                                    <div className="relative w-full aspect-square overflow-hidden bg-slate-800">
                                        {member.image && getImageUrl(member.image) ? (
                                            <img
                                                src={getImageUrl(member.image)!}
                                                alt={member.name}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none'
                                                    e.currentTarget.nextElementSibling?.classList.remove('hidden')
                                                }}
                                            />
                                        ) : null}
                                        <div className={`flex h-full w-full items-center justify-center ${member.image ? 'hidden' : ''}`}>
                                            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-700 text-3xl font-semibold text-slate-300">
                                                {member.name.charAt(0)}
                                            </div>
                                        </div>

                                        {/* Role Badge */}
                                        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${member.role === "captain"
                                                ? "bg-purple-500/90 text-white"
                                                : "bg-sky-500/90 text-white"
                                            }`}>
                                            {member.role === "captain" ? (
                                                <span className="flex items-center gap-1">
                                                    <Crown size={12} />
                                                    Captain
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1">
                                                    <FaDumbbell size={12} />
                                                    Trainee
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Member Info */}
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-white mb-1 truncate">{member.name}</h3>
                                        <p className="text-sm text-slate-400 mb-3 truncate">{member.email}</p>

                                        {member.role === "trainee" && member.weight && member.height && (
                                            <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                                                <div className="bg-slate-800/50 rounded p-2">
                                                    <p className="text-slate-500">Weight</p>
                                                    <p className="text-white font-semibold">{member.weight} kg</p>
                                                </div>
                                                <div className="bg-slate-800/50 rounded p-2">
                                                    <p className="text-slate-500">Height</p>
                                                    <p className="text-white font-semibold">{member.height} cm</p>
                                                </div>
                                            </div>
                                        )}

                                        <div className="text-xs text-slate-500">
                                            Joined {new Date(member.joinDate).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    )
}
