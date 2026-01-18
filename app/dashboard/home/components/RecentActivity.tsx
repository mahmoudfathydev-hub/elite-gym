import { FaClock } from "react-icons/fa6"

interface Activity {
    id: number
    trainee: string
    activity: string
    time: string
}

interface RecentActivityProps {
    activities: Activity[]
}

const RecentActivity = ({ activities }: RecentActivityProps) => {
    return (
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-slate-700 p-6 h-full">
            <div className="flex items-center gap-2 mb-6">
                <FaClock className="text-emerald-400 text-xl" />
                <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
            </div>

            <div className="space-y-4">
                {activities.slice(0, 5).map((activity, index) => (
                    <div key={activity.id} className="flex gap-4">
                        {/* Timeline dot */}
                        <div className="flex flex-col items-center">
                            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 mt-2"></div>
                            {index < activities.length - 1 && <div className="w-0.5 h-12 bg-slate-700 mt-1"></div>}
                        </div>

                        {/* Activity content */}
                        <div className="pb-4">
                            <p className="text-sm font-semibold text-white">{activity.trainee}</p>
                            <p className="text-sm text-slate-400">{activity.activity}</p>
                            <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full mt-6 text-sky-400 hover:text-sky-300 font-semibold text-sm transition-colors py-2 border-t border-slate-700 pt-6">
                View All Activities
            </button>
        </div>
    )
}

export default RecentActivity
