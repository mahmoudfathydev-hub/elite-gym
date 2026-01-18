"use client"
import { useState } from "react"
import { FaCalendarAlt, FaDumbbell, FaUser, FaEdit, FaTrash } from "react-icons/fa"
import { getImageUrl } from "@/utils/imageUtils"

interface ScheduleCardProps {
  id: string
  traineeName: string
  traineeImage: string
  traineeWeight: number
  traineeHeight: number
  date: string
  time: string
  workoutType: string
  onEdit?: () => void
  onDelete?: () => void
}

const ScheduleCard = ({ 
  id, 
  traineeName, 
  traineeImage, 
  traineeWeight, 
  traineeHeight, 
  date, 
  time, 
  workoutType,
  onEdit,
  onDelete 
}: ScheduleCardProps) => {
  const imageUrl = getImageUrl(traineeImage)

  return (
    <div className="bg-linear-to-br from-slate-900 to-slate-800 rounded-xl border border-slate-700 p-6 hover:border-sky-500/50 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={traineeName} 
              className="w-16 h-16 rounded-full object-cover border-2 border-sky-500/30"
              onError={(e) => {
                console.error("Image failed to load:", imageUrl)
                e.currentTarget.style.display = 'none'
                e.currentTarget.nextElementSibling?.classList.remove('hidden')
              }}
            />
          ) : null}
          <div className={`w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center ${imageUrl ? 'hidden' : ''}`}>
            <FaUser className="text-slate-400 text-2xl" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{traineeName}</h3>
            <p className="text-sm text-slate-400">Weight: {traineeWeight}kg | Height: {traineeHeight}cm</p>
          </div>
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onEdit}
            className="p-2 bg-sky-500/20 hover:bg-sky-500/30 text-sky-400 rounded-lg transition-colors"
            title="Edit schedule"
          >
            <FaEdit size={14} />
          </button>
          <button
            onClick={onDelete}
            className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
            title="Delete schedule"
          >
            <FaTrash size={14} />
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-slate-300">
          <FaCalendarAlt className="text-sky-400" />
          <span className="text-sm">{date}</span>
          <span className="text-slate-500">•</span>
          <span className="text-sm">{time}</span>
        </div>
        
        <div className="flex items-center gap-3 text-slate-300">
          <FaDumbbell className="text-green-400" />
          <span className="text-sm font-medium">{workoutType}</span>
        </div>
      </div>
    </div>
  )
}

export default ScheduleCard
