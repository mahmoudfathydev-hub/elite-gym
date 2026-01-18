"use client"
import { useState } from "react"
import { FaCalendarAlt, FaClock, FaDumbbell, FaTimes } from "react-icons/fa"

interface Trainee {
  $id: string
  fullName: string
  image: string
  weight: number
  height: number
}

interface AddScheduleFormProps {
  trainees: Trainee[]
  onAddSchedule: (schedule: {
    traineeId: string
    traineeName: string
    traineeImage: string
    traineeWeight: number
    traineeHeight: number
    date: string
    time: string
    workoutType: string
  }) => void
}

const AddScheduleForm = ({ trainees, onAddSchedule }: AddScheduleFormProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    traineeId: "",
    date: "",
    time: "",
    workoutType: ""
  })

  const workoutTypes = [
    "Strength Training",
    "Cardio",
    "HIIT",
    "Yoga",
    "CrossFit",
    "Boxing",
    "Swimming",
    "Cycling"
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.traineeId || !formData.date || !formData.time || !formData.workoutType) {
      alert("Please fill all fields")
      return
    }

    const selectedTrainee = trainees.find(t => t.$id === formData.traineeId)
    if (!selectedTrainee) return

    onAddSchedule({
      traineeId: formData.traineeId,
      traineeName: selectedTrainee.fullName,
      traineeImage: selectedTrainee.image,
      traineeWeight: selectedTrainee.weight,
      traineeHeight: selectedTrainee.height,
      date: formData.date,
      time: formData.time,
      workoutType: formData.workoutType
    })

    setFormData({ traineeId: "", date: "", time: "", workoutType: "" })
    setIsOpen(false)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-linear-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-sky-500/50 flex items-center justify-center gap-2"
      >
        <FaCalendarAlt />
        Add New Schedule
      </button>
    )
  }

  return (
    <div 
      data-aos="fade-up-right"
      className="bg-linear-to-br from-slate-900 to-slate-800 rounded-xl border border-slate-700 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Add New Schedule</h2>
        <button
          onClick={() => setIsOpen(false)}
          className="text-slate-400 hover:text-white transition-colors"
        >
          <FaTimes size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Select Trainee
          </label>
          <select
            value={formData.traineeId}
            onChange={(e) => setFormData({ ...formData, traineeId: e.target.value })}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-sky-500"
            required
          >
            <option value="">Choose a trainee...</option>
            {trainees.map(trainee => (
              <option key={trainee.$id} value={trainee.$id}>
                {trainee.fullName} - {trainee.weight}kg, {trainee.height}cm
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <FaCalendarAlt className="inline mr-2" />
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-sky-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <FaClock className="inline mr-2" />
              Time
            </label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-sky-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            <FaDumbbell className="inline mr-2" />
            Workout Type
          </label>
          <select
            value={formData.workoutType}
            onChange={(e) => setFormData({ ...formData, workoutType: e.target.value })}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-sky-500"
            required
          >
            <option value="">Choose workout type...</option>
            {workoutTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-linear-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white py-2 rounded-lg font-semibold transition-all duration-200"
          >
            Create Schedule
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg font-semibold transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddScheduleForm
