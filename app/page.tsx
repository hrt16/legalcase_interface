import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, Zap, Shield, ArrowRight } from "lucide-react"

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-black to-red-900/10" />
      <div className="absolute top-20 left-20 w-96 h-96 bg-red-900/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-950/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Logo/Brand */}
        <div className="mb-8 flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-balance">
          <span className="gradient-text">The Legal AI</span>
          <br />
          <span className="text-white">Assistant</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto text-balance leading-relaxed">
          Experience next-generation legal AI, powered by advanced language models. Intelligent, fast, and built
          for the future.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <Link href="/chat">
            <Button
              size="lg"
              className="bg-gradient-to-r from-red-600 to-red-900 hover:from-red-700 hover:to-red-950 text-white px-8 py-6 text-lg group"
            >
              Start Chatting
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="border-red-900/50 text-white hover:bg-red-950/30 px-8 py-6 text-lg bg-transparent"
          >
            Learn More
          </Button>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-red-950/30 to-black border border-red-900/30 rounded-2xl p-6 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-xl bg-red-900/30 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Get instant responses powered by state-of-the-art AI technology
            </p>
          </div>

          <div className="bg-gradient-to-br from-red-950/30 to-black border border-red-900/30 rounded-2xl p-6 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-xl bg-red-900/30 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Secure & Private</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your conversations are encrypted and protected at all times
            </p>
          </div>

          <div className="bg-gradient-to-br from-red-950/30 to-black border border-red-900/30 rounded-2xl p-6 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-xl bg-red-900/30 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Smart Context</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              AI that remembers your conversations and learns your preferences
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
