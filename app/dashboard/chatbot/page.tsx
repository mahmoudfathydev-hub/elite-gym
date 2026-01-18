"use client"

import { useState, useRef, useEffect } from "react"
import { FaPaperPlane, FaRobot, FaTrash, FaUser, FaMicrophone, FaStop, FaGlobe } from "react-icons/fa"
import { MessageCircle, Sparkles } from "lucide-react"
import DashboardLayout from "@/Components/Dashboard/DashboardLayout"
import toast from "react-hot-toast"

interface Message {
    id: string
    role: "user" | "assistant"
    content: string
    timestamp: Date
}

// Global declaration for SpeechRecognition
declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

export default function ChatbotPage() {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const [isListening, setIsListening] = useState(false)
    const [language, setLanguage] = useState<"en-US" | "ar-EG" | "fr-FR">("en-US")

    // Use a separate ref for the container to control scrolling
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    // Ref to hold the recognition instance
    const recognitionRef = useRef<any>(null)

    const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY

    // Load chat history
    useEffect(() => {
        try {
            const savedMessages = localStorage.getItem("chatHistory")
            if (savedMessages) {
                const parsed = JSON.parse(savedMessages)
                setMessages(parsed.map((msg: Message) => ({
                    ...msg,
                    timestamp: new Date(msg.timestamp)
                })))
            } else {
                const welcomeMessage: Message = {
                    id: "welcome",
                    role: "assistant",
                    content: "👋 Hi! I'm your Elite Gym AI assistant.\n\nUse the 🎤 microphone button to talk to me, or type your questions below!\n\nI can help with workouts, nutrition, and more.",
                    timestamp: new Date()
                }
                setMessages([welcomeMessage])
            }
        } catch (error) {
            // Error loading localStorage
        }
    }, [])

    // Save chat history
    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem("chatHistory", JSON.stringify(messages))
        }
    }, [messages])

    // Scroll to bottom when messages change
    useEffect(() => {
        if (scrollContainerRef.current) {
            const { scrollHeight, clientHeight } = scrollContainerRef.current
            scrollContainerRef.current.scrollTo({
                top: scrollHeight - clientHeight,
                behavior: "smooth"
            })
        }
    }, [messages, loading])

    // Cleanup recognition on unmount
    useEffect(() => {
        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop()
            }
        }
    }, [])

    const startListening = () => {
        if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
            toast.error("Voice input is not supported in this browser.")
            return
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        const recognition = new SpeechRecognition()

        recognition.continuous = true
        recognition.interimResults = true
        recognition.lang = language // Use selected language

        recognition.onstart = () => {
            setIsListening(true)
            const langName = language === 'en-US' ? 'English' : language === 'ar-EG' ? 'Arabic' : 'French'
            toast.success(`Listening in ${langName}...`)
        }

        recognition.onresult = (event: any) => {
            let finalTranscript = ''
            let interimTranscript = ''

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript
                } else {
                    interimTranscript += event.results[i][0].transcript
                }
            }

            // Update input with current text
            if (finalTranscript || interimTranscript) {
                setInput(prev => {
                    let fullText = ""
                    for (let i = 0; i < event.results.length; ++i) {
                        fullText += event.results[i][0].transcript
                    }
                    return fullText
                })
            }
        }

        recognition.onerror = (event: any) => {
            console.error("Speech recognition error", event.error)
            setIsListening(false)
            if (event.error === 'no-speech') {
                toast.error("No speech detected. Try again.")
            }
        }

        recognition.onend = () => {
            if (isListening) {
                setIsListening(false)
            }
        }

        recognitionRef.current = recognition
        recognition.start()
    }

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop()
            setIsListening(false)
        }
    }

    const toggleListening = () => {
        if (isListening) {
            stopListening()
        } else {
            setInput("")
            startListening()
        }
    }

    const toggleLanguage = () => {
        let newLang: "en-US" | "ar-EG" | "fr-FR" = "en-US"
        if (language === "en-US") newLang = "ar-EG"
        else if (language === "ar-EG") newLang = "fr-FR"
        else newLang = "en-US"

        setLanguage(newLang)
        const langName = newLang === 'en-US' ? 'English' : newLang === 'ar-EG' ? 'Arabic' : 'French'
        toast.success(`Switched to ${langName}`)

        // If listening, restart with new language
        if (isListening) {
            stopListening()
            // Small delay to ensure stop completes
            setTimeout(() => {
            }, 100)
        }
    }

    const getDirection = (text: string) => {
        const arabicPattern = /[\u0600-\u06FF]/;
        return arabicPattern.test(text) ? 'rtl' : 'ltr';
    }

    const sendMessage = async () => {
        if (!input.trim() || loading) return

        // Check if API key exists
        if (!API_KEY) {
            toast.error("API key not found. Please check .env.local file")
            return
        }

        // Stop listening if sending
        if (isListening) stopListening()

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input.trim(),
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setInput("")
        setLoading(true)

        try {
            const prompt = `You are a helpful fitness coach. The user is asking: "${userMessage.content}". 
            IMPORTANT INSTRUCTIONS:
            1. Detect the language of the user's input (Arabic, English, or French).
            2. Reply IN THE SAME LANGUAGE as the user's input.
            3. Provide the response in plain text only. Do not use any markdown formatting like asterisks (**), hashes (#), or bullet points (*). Avoid special characters.`

            const requestBody = {
                contents: [{
                    parts: [{ text: prompt }]
                }]
            }

            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${API_KEY}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestBody)
                }
            )

            const responseText = await response.text()

            if (!response.ok) {
                if (response.status === 429) {
                    throw new Error("Traffic is high. Please wait a moment before trying again.")
                }

                let errorMsg = "Failed to get AI response"
                try {
                    const errorData = JSON.parse(responseText)
                    errorMsg = errorData.error?.message || errorMsg
                } catch (e) {
                    errorMsg = `HTTP ${response.status}: ${response.statusText}`
                }
                throw new Error(errorMsg)
            }

            const data = JSON.parse(responseText)
            const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text

            if (!aiResponse) {
                throw new Error("No response text from AI")
            }

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: aiResponse,
                timestamp: new Date()
            }

            setMessages(prev => [...prev, assistantMessage])
        } catch (error: any) {
            const errorMessage = error.message || "Unknown error occurred"
            toast.error(errorMessage, { duration: 5000 })
            setMessages(prev => prev.filter(msg => msg.id !== userMessage.id))
        } finally {
            setLoading(false)
        }
    }

    const clearChat = () => {
        setMessages([])
        localStorage.removeItem("chatHistory")
        toast.success("Chat history cleared")
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    }

    return (
        <DashboardLayout>
            <div className="p-4 md:p-8 h-[calc(100dvh-80px)]">
                <div className="max-w-4xl mx-auto h-full flex flex-col">
                    {/* Header */}
                    <div className="mb-4 md:mb-6" data-aos="fade-down">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 flex items-center gap-3">
                                    <MessageCircle className="text-purple-400" size={32} />
                                    AI Fitness Assistant
                                </h1>
                                <p className="text-slate-400">Ask me anything about fitness, nutrition, and training</p>
                            </div>
                            {messages.length > 0 && (
                                <button
                                    onClick={clearChat}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all"
                                    data-aos="fade-left"
                                >
                                    <FaTrash />
                                    Clear Chat
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Chat Container */}
                    <div
                        className="flex-1 bg-slate-900/50 rounded-xl border border-slate-700 overflow-hidden flex flex-col"
                        data-aos="fade-up"
                    >
                        {/* Messages Area - Now with localized scrolling */}
                        <div
                            ref={scrollContainerRef}
                            className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth"
                        >
                            {messages.length === 0 ? (
                                <div className="flex items-center justify-center h-full">
                                    <div className="text-center">
                                        <Sparkles className="text-purple-400 mx-auto mb-4" size={48} />
                                        <p className="text-slate-400 text-lg">Start a conversation with your AI fitness coach!</p>
                                    </div>
                                </div>
                            ) : (
                                messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
                                    >
                                        {message.role === "assistant" && (
                                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                                                <FaRobot className="text-purple-400" />
                                            </div>
                                        )}

                                        <div
                                            className={`max-w-[70%] rounded-xl p-4 ${message.role === "user"
                                                ? "bg-sky-500/20 border border-sky-500/30 text-white"
                                                : "bg-slate-800/50 border border-slate-700 text-slate-200"
                                                }`}
                                        >
                                            <p className="whitespace-pre-wrap">{message.content}</p>
                                            <p className="text-xs text-slate-500 mt-2">
                                                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                            </p>
                                        </div>

                                        {message.role === "user" && (
                                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sky-500/20 flex items-center justify-center">
                                                <FaUser className="text-sky-400" />
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}

                            {loading && (
                                <div className="flex gap-3" data-aos="fade-up" data-aos-duration="300">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                                        <FaRobot className="text-purple-400 animate-bounce" />
                                    </div>
                                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                                        <div className="flex gap-2">
                                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="border-t border-slate-700 p-2 md:p-4">
                            <div className="flex gap-2 md:gap-3">
                                <button
                                    onClick={toggleLanguage}
                                    className="px-2 md:px-3 py-3 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-all flex items-center gap-2"
                                    title="Switch Language (EN/AR/FR)"
                                >
                                    <FaGlobe />
                                    <span className="text-xs font-bold hidden sm:inline">
                                        {language === "en-US" ? "EN" : language === "ar-EG" ? "AR" : "FR"}
                                    </span>
                                </button>

                                <button
                                    onClick={toggleListening}
                                    className={`px-3 md:px-4 py-3 rounded-lg transition-all flex items-center justify-center ${isListening
                                        ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                                        : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                                        }`}
                                    title={isListening ? "Stop listening" : "Start voice input"}
                                >
                                    {isListening ? <FaStop /> : <FaMicrophone />}
                                </button>

                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder={language === "ar-EG" ? "تحدث أو اكتب..." : (isListening ? "Listening..." : "Ask me anything...")}
                                    className={`min-w-0 flex-1 bg-slate-800 border rounded-lg px-3 md:px-4 py-3 text-sm md:text-base text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all ${isListening ? 'border-purple-500 ring-2 ring-purple-500/20' : 'border-slate-700'
                                        } ${language === 'ar-EG' ? 'text-right' : 'text-left'}`}
                                    dir={language === 'ar-EG' ? 'rtl' : 'ltr'}
                                    disabled={loading}
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={!input.trim() || loading}
                                    className="px-3 md:px-6 py-3 bg-purple-500 hover:bg-purple-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-lg transition-all flex items-center gap-2 font-semibold"
                                >
                                    <FaPaperPlane />
                                    <span className="hidden sm:inline">Send</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
