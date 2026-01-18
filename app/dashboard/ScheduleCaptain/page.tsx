"use client"
import { useState, useEffect } from "react"
import { FaCalendarAlt, FaUsers, FaClock, FaDumbbell } from "react-icons/fa"
import { databases, appwriteConfig } from "@/lib/appwrite"
import { getImageUrl } from "@/utils/imageUtils"
import AddScheduleForm from "./components/AddScheduleForm"
import ScheduleList from "./components/ScheduleList"
import DashboardLayout from "@/Components/Dashboard/DashboardLayout"
import toast from "react-hot-toast"

interface Trainee {
  $id: string
  fullName: string
  image: string
  weight: number
  height: number
  $createdAt: string
}

interface Schedule {
  id: string
  traineeId: string
  traineeName: string
  traineeImage: string
  traineeWeight: number
  traineeHeight: number
  date: string
  time: string
  workoutType: string
}

const ScheduleCaptain = () => {
  const [trainees, setTrainees] = useState<Trainee[]>([])
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch trainees from Appwrite
  const fetchTrainees = async () => {
    try {
      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        'trainee'
      )
      setTrainees(response.documents as unknown as Trainee[])
    } catch (error) {
      toast.error("Failed to load trainees")
    }
  }

  // Fetch schedules from localStorage (for now)
  const fetchSchedules = () => {
    try {
      const storedSchedules = localStorage.getItem("schedules")
      if (storedSchedules) {
        setSchedules(JSON.parse(storedSchedules))
      }
    } catch (error) {
      toast.error("Failed to load schedules")
    }
  }

  // Save schedules to localStorage
  const saveSchedules = (updatedSchedules: Schedule[]) => {
    try {
      localStorage.setItem("schedules", JSON.stringify(updatedSchedules))
      setSchedules(updatedSchedules)
    } catch (error) {
      toast.error("Failed to save schedule")
    }
  }

  // Add new schedule
  const handleAddSchedule = (newSchedule: Omit<Schedule, 'id'>) => {
    const scheduleWithId: Schedule = {
      ...newSchedule,
      id: Date.now().toString()
    }
    const updatedSchedules = [...schedules, scheduleWithId]
    saveSchedules(updatedSchedules)
    toast.success("Schedule added successfully!")
  }

  // Delete schedule
  const handleDeleteSchedule = (id: string) => {
    const toastId = toast.loading("Deleting schedule...")

    const updatedSchedules = schedules.filter(schedule => schedule.id !== id)
    saveSchedules(updatedSchedules)
    toast.success("Schedule deleted successfully", { id: toastId })
  }

  // Edit schedule (placeholder for now)
  const handleEditSchedule = (id: string) => {
    toast.success("Edit functionality coming soon!")
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      await fetchTrainees()
      fetchSchedules()
      setLoading(false)
    }
    loadData()
  }, [])

  // Calculate stats
  const todaySchedules = schedules.filter(s => {
    const today = new Date().toISOString().split('T')[0]
    return s.date === today
  }).length

  const upcomingSchedules = schedules.filter(s => {
    const today = new Date().toISOString().split('T')[0]
    return s.date > today
  }).length

  const totalTrainees = trainees.length

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white text-xl">Loading schedules...</div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div
            data-aos="fade-right"
            className="mb-8 text-center"
          >
            <h1 className="text-4xl font-bold text-white mb-2">Schedule Captain</h1>
            <p className="text-slate-400">Manage and organize training schedules for all trainees</p>
          </div>

          {/* Stats Cards */}
          <div
            data-aos="fade-down"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <div className="bg-linear-to-br from-slate-900 to-slate-800 rounded-xl border border-slate-700 p-6 hover:border-sky-500/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <FaCalendarAlt className="text-orange-400 text-2xl" />
                <span className="text-2xl font-bold text-white">{todaySchedules}</span>
              </div>
              <p className="text-slate-400 text-sm">Today's Sessions</p>
            </div>

            <div className="bg-linear-to-br from-slate-900 to-slate-800 rounded-xl border border-slate-700 p-6 hover:border-sky-500/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <FaClock className="text-sky-400 text-2xl" />
                <span className="text-2xl font-bold text-white">{upcomingSchedules}</span>
              </div>
              <p className="text-slate-400 text-sm">Upcoming Sessions</p>
            </div>

            <div className="bg-linear-to-br from-slate-900 to-slate-800 rounded-xl border border-slate-700 p-6 hover:border-sky-500/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <FaUsers className="text-green-400 text-2xl" />
                <span className="text-2xl font-bold text-white">{totalTrainees}</span>
              </div>
              <p className="text-slate-400 text-sm">Total Trainees</p>
            </div>

            <div className="bg-linear-to-br from-slate-900 to-slate-800 rounded-xl border border-slate-700 p-6 hover:border-sky-500/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <FaDumbbell className="text-purple-400 text-2xl" />
                <span className="text-2xl font-bold text-white">{schedules.length}</span>
              </div>
              <p className="text-slate-400 text-sm">Total Sessions</p>
            </div>
          </div>

          {/* Add Schedule Form */}
          <div
            data-aos="fade-up-right"
            className="mb-8"
          >
            <AddScheduleForm trainees={trainees} onAddSchedule={handleAddSchedule} />
          </div>

          {/* Schedule List */}
          <div
            data-aos="fade-up"
            data-aos-anchor-placement="top-center"
          >
            <ScheduleList
              schedules={schedules}
              onDeleteSchedule={handleDeleteSchedule}
              onEditSchedule={handleEditSchedule}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ScheduleCaptain