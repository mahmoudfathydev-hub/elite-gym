import { FaCalendar, FaUserGroup } from "react-icons/fa6"
interface UpcomingSessionsProps { traineesCount: number }
const UpcomingSessions = ({ traineesCount }: UpcomingSessionsProps) => {
    const upcomingSessions = [
        { id: 1, trainee: "Ahmed Hassan", time: "Today, 3:00 PM", status: "confirmed" },
        { id: 2, trainee: "Mona Ali", time: "Today, 5:00 PM", status: "pending" },
        { id: 3, trainee: "Youssef Mahmoud", time: "Tomorrow, 10:00 AM", status: "confirmed" },
        { id: 4, trainee: "Sara Adel", time: "Tomorrow, 1:00 PM", status: "pending" }
    ]
    return (
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-slate-700 p-6">
            <div className="flex items-center gap-2 mb-6">
                <FaCalendar className="text-purple-400 text-xl" />
                <h2 className="text-2xl font-bold text-white">Upcoming Sessions</h2>
            </div>
            <div className="space-y-3">
                {upcomingSessions.map(session => (
                    <div key={session.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-purple-500/50 transition-all duration-200">
                        <div className="flex-1">
                            <p className="font-semibold text-white">{session.trainee}</p>
                            <p className="text-sm text-slate-400">{session.time}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${session.status === "confirmed" ? "bg-green-500/20 text-green-300 border border-green-500/50" : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/50"}`}>
                            {session.status === "confirmed" ? "Confirmed" : "Pending"}
                        </span>
                    </div>
                ))}
            </div>
            <div className="mt-6 pt-6 border-t border-slate-700 flex items-center gap-2 text-slate-300">
                <FaUserGroup className="text-sky-400" />
                <span className="text-sm"><span className="font-semibold text-white">{traineesCount}</span> active trainees</span>
            </div>
        </div>
    )
}
export default UpcomingSessions
