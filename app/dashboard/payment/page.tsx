"use client"

import { useState, useEffect } from "react"
import { databases, appwriteConfig } from "@/lib/appwrite"
import { FaCheckCircle, FaCreditCard, FaUsers } from "react-icons/fa"
import { CreditCard, Calendar, DollarSign } from "lucide-react"
import toast from "react-hot-toast"
import DashboardLayout from "@/Components/Dashboard/DashboardLayout"

const getImageUrl = (imageFileId: string) => {
    if (!imageFileId) return null
    return `${appwriteConfig.endpoint}/storage/buckets/696c125f0034d324438c/files/${imageFileId}/view?project=${appwriteConfig.projectId}`
}

type Trainee = {
    $id: string
    fullName: string
    weight: number
    height: number
    image: string
    $createdAt: string
}

type PricingPlan = {
    id: string
    name: string
    price: number
    duration: string
    description: string
    features: string[]
}

export default function PaymentPage() {
    const [trainees, setTrainees] = useState<Trainee[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedTrainee, setSelectedTrainee] = useState<string | null>(null)
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

    const pricingPlans: PricingPlan[] = [
        {
            id: "monthly",
            name: "Monthly",
            price: 99,
            duration: "month",
            description: "Perfect for getting started",
            features: [
                "Unlimited gym access",
                "2 personal training sessions",
                "Nutrition consultation",
                "Progress tracking"
            ]
        },
        {
            id: "quarterly",
            name: "Quarterly",
            price: 249,
            duration: "3 months",
            description: "Best value for commitment",
            features: [
                "Everything in Monthly",
                "6 personal training sessions",
                "Custom meal plan",
                "Body composition analysis",
                "Priority booking"
            ]
        },
        {
            id: "annual",
            name: "Annual",
            price: 899,
            duration: "year",
            description: "Maximum savings",
            features: [
                "Everything in Quarterly",
                "24 personal training sessions",
                "VIP locker",
                "Guest passes (10/year)",
                "Free merchandise",
                "Exclusive workshops"
            ]
        }
    ]

    useEffect(() => {
        fetchTrainees()
    }, [])

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

    const handlePayment = () => {
        if (!selectedTrainee || !selectedPlan) {
            toast.error("Please select a trainee and pricing plan")
            return
        }

        const trainee = trainees.find(t => t.$id === selectedTrainee)
        const plan = pricingPlans.find(p => p.id === selectedPlan)

        if (!trainee || !plan) return

        toast.success(`Payment of $${plan.price} processed for ${trainee.fullName} (${plan.name} plan)`, {
            duration: 5000,
        })

        // Reset selections after payment
        setTimeout(() => {
            setSelectedTrainee(null)
            setSelectedPlan(null)
        }, 1500)
    }

    return (
        <DashboardLayout>
            <div className="p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 data-aos="fade-down" className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                            <CreditCard className="text-sky-400" size={40} />
                            Payment Management
                        </h1>
                        <p data-aos="fade-up" className="text-slate-400">
                            Select a trainee and choose a membership plan
                        </p>
                    </div>

                    {/* Trainees Section */}
                    <div data-aos="fade-up" className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <FaUsers className="text-sky-400 text-2xl" />
                            <h2 className="text-2xl font-bold text-white">Select Trainee</h2>
                        </div>

                        {loading ? (
                            <div className="text-center text-slate-400 py-8">Loading trainees...</div>
                        ) : trainees.length === 0 ? (
                            <div className="text-center bg-slate-900/50 rounded-xl border border-slate-700 p-12">
                                <FaUsers className="text-slate-600 text-6xl mx-auto mb-4" />
                                <p className="text-slate-400 text-lg">No trainees found</p>
                                <p className="text-slate-500 text-sm mt-2">Add trainees from the dashboard first</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {trainees.map(trainee => (
                                    <div
                                        key={trainee.$id}
                                        onClick={() => setSelectedTrainee(trainee.$id)}
                                        className={`cursor-pointer bg-slate-900/50 rounded-xl border-2 overflow-hidden transition-all duration-300 hover:scale-105 ${selectedTrainee === trainee.$id
                                            ? 'border-sky-500 shadow-lg shadow-sky-500/50'
                                            : 'border-slate-700 hover:border-sky-400'
                                            }`}
                                    >
                                        {/* Trainee Image */}
                                        <div className="relative w-full aspect-square overflow-hidden bg-slate-800">
                                            {trainee.image && getImageUrl(trainee.image) ? (
                                                <img
                                                    src={getImageUrl(trainee.image)!}
                                                    alt={trainee.fullName}
                                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = 'none'
                                                        e.currentTarget.nextElementSibling?.classList.remove('hidden')
                                                    }}
                                                />
                                            ) : null}
                                            <div className={`flex h-full w-full items-center justify-center ${trainee.image ? 'hidden' : ''}`}>
                                                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-700 text-3xl font-semibold text-slate-300">
                                                    {trainee.fullName.charAt(0)}
                                                </div>
                                            </div>
                                            {selectedTrainee === trainee.$id && (
                                                <div className="absolute top-2 right-2 bg-sky-500 text-white p-2 rounded-full shadow-lg">
                                                    <FaCheckCircle size={20} />
                                                </div>
                                            )}
                                        </div>

                                        {/* Trainee Info */}
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold text-white mb-2">{trainee.fullName}</h3>
                                            <div className="grid grid-cols-2 gap-2 text-sm text-slate-300">
                                                <div>
                                                    <p className="text-slate-500 text-xs">Weight</p>
                                                    <p className="font-semibold">{trainee.weight} kg</p>
                                                </div>
                                                <div>
                                                    <p className="text-slate-500 text-xs">Height</p>
                                                    <p className="font-semibold">{trainee.height} cm</p>
                                                </div>
                                            </div>
                                            <p className="text-xs text-slate-500 mt-2">
                                                Joined: {new Date(trainee.$createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Pricing Plans Section */}
                    <div data-aos="fade-up" className="mb-8">
                        <div className="flex items-center gap-3 mb-6">
                            <DollarSign className="text-green-400 text-2xl" />
                            <h2 className="text-2xl font-bold text-white">Choose Membership Plan</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {pricingPlans.map(plan => (
                                <div
                                    key={plan.id}
                                    onClick={() => setSelectedPlan(plan.id)}
                                    className={`cursor-pointer bg-linear-to-br from-slate-900 to-slate-800 rounded-xl border-2 p-6 transition-all duration-300 hover:scale-105 ${selectedPlan === plan.id
                                        ? 'border-green-500 shadow-lg shadow-green-500/50'
                                        : 'border-slate-700 hover:border-green-400'
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                                        {selectedPlan === plan.id && (
                                            <FaCheckCircle className="text-green-500 text-2xl" />
                                        )}
                                    </div>
                                    <div className="mb-4">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-4xl font-bold text-green-400">${plan.price}</span>
                                            <span className="text-slate-400">/ {plan.duration}</span>
                                        </div>
                                        <p className="text-slate-400 text-sm mt-2">{plan.description}</p>
                                    </div>
                                    <ul className="space-y-3">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="flex items-start gap-2 text-sm text-slate-300">
                                                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" size={14} />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Payment Button */}
                    <div data-aos="fade-up" className="flex justify-center">
                        <button
                            onClick={handlePayment}
                            disabled={!selectedTrainee || !selectedPlan}
                            className="px-12 py-4 bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-lg rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-green-500 disabled:hover:to-emerald-600 shadow-lg hover:shadow-green-500/50 flex items-center gap-3"
                        >
                            <FaCreditCard size={24} />
                            Process Payment
                        </button>
                    </div>

                    {/* Summary */}
                    {(selectedTrainee || selectedPlan) && (
                        <div data-aos="fade-up" className="mt-8 bg-slate-900/50 rounded-xl border border-slate-700 p-6">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                                <Calendar className="text-sky-400" />
                                Payment Summary
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300">
                                <div>
                                    <p className="text-slate-500 text-sm mb-1">Selected Trainee</p>
                                    <p className="font-semibold text-white">
                                        {selectedTrainee
                                            ? trainees.find(t => t.$id === selectedTrainee)?.fullName
                                            : "Not selected"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-slate-500 text-sm mb-1">Selected Plan</p>
                                    <p className="font-semibold text-white">
                                        {selectedPlan
                                            ? `${pricingPlans.find(p => p.id === selectedPlan)?.name} - $${pricingPlans.find(p => p.id === selectedPlan)?.price}`
                                            : "Not selected"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    )
}
