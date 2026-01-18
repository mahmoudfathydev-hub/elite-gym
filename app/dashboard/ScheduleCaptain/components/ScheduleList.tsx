"use client"
import { useState } from "react"
import { FaCalendarAlt, FaFilter, FaSort } from "react-icons/fa"
import ScheduleCard from "./ScheduleCard"

interface Trainee {
  $id: string
  fullName: string
  image: string
  weight: number
  height: number
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

interface ScheduleListProps {
  schedules: Schedule[]
  onDeleteSchedule: (id: string) => void
  onEditSchedule: (id: string) => void
}

const ScheduleList = ({ schedules, onDeleteSchedule, onEditSchedule }: ScheduleListProps) => {
  const [sortBy, setSortBy] = useState<"date" | "name" | "workout">("date")
  const [filterDate, setFilterDate] = useState("")

  // Sort and filter schedules
  const filteredSchedules = schedules
    .filter(schedule => !filterDate || schedule.date === filterDate)
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(a.date + " " + a.time).getTime() - new Date(b.date + " " + b.time).getTime()
        case "name":
          return a.traineeName.localeCompare(b.traineeName)
        case "workout":
          return a.workoutType.localeCompare(b.workoutType)
        default:
          return 0
      }
    })

  // Get unique dates for filter
  const uniqueDates = [...new Set(schedules.map(s => s.date))].sort()

  return (
    <div className="space-y-6">
      {/* Filters and Sorting */}
      <div 
        data-aos="fade-up"
        className="bg-linear-to-br from-slate-900 to-slate-800 rounded-xl border border-slate-700 p-4"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <FaFilter className="inline mr-2" />
              Filter by Date
            </label>
            <select
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-sky-500"
            >
              <option value="">All Dates</option>
              {uniqueDates.map(date => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <FaSort className="inline mr-2" />
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "date" | "name" | "workout")}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-sky-500"
            >
              <option value="date">Date & Time</option>
              <option value="name">Trainee Name</option>
              <option value="workout">Workout Type</option>
            </select>
          </div>
        </div>
      </div>

      {/* Schedule Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchedules.length === 0 ? (
          <div 
            data-aos="fade-up"
            className="col-span-full text-center py-12"
          >
            <FaCalendarAlt className="text-4xl text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">
              {filterDate ? "No schedules found for this date" : "No schedules yet"}
            </p>
            <p className="text-slate-500 text-sm mt-2">
              Add your first schedule to get started
            </p>
          </div>
        ) : (
          filteredSchedules.map((schedule, index) => (
            <div key={schedule.id} data-aos="fade-up" data-aos-delay={index * 100}>
              <ScheduleCard
                id={schedule.id}
                traineeName={schedule.traineeName}
                traineeImage={schedule.traineeImage}
                traineeWeight={schedule.traineeWeight}
                traineeHeight={schedule.traineeHeight}
                date={new Date(schedule.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                time={schedule.time}
                workoutType={schedule.workoutType}
                onEdit={() => onEditSchedule(schedule.id)}
                onDelete={() => onDeleteSchedule(schedule.id)}
              />
            </div>
          ))
        )}
      </div>

      {/* Schedule Count */}
      {filteredSchedules.length > 0 && (
        <div className="text-center text-slate-400 text-sm">
          Showing {filteredSchedules.length} of {schedules.length} schedules
        </div>
      )}
    </div>
  )
}

export default ScheduleList
