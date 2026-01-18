interface StatsOverviewProps {
    icon: React.ReactNode
    title: string
    value: string | number
    color: string
}

const StatsOverview = ({ icon, title, value, color }: StatsOverviewProps) => {
    return (
        <div className={`bg-gradient-to-br ${color} rounded-xl border border-slate-700 p-6 hover:border-slate-600 transition-all duration-200`}>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-slate-400 text-sm font-medium mb-2">{title}</p>
                    <p className="text-3xl font-bold text-white">{value}</p>
                </div>
                <div className="text-3xl opacity-80">{icon}</div>
            </div>
        </div>
    )
}

export default StatsOverview
