import { Circle, Triangle, Square } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-pink-500/20">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <div className="flex items-center gap-2 w-[200px]">
            <Circle className="w-6 h-6 text-pink-500" />
            <Triangle className="w-6 h-6 text-pink-500" />
            <Square className="w-6 h-6 text-pink-500" />
          </div>
          <div className="flex-1 flex items-center justify-center gap-12">
            <Link 
              href="/" 
              className="text-sm font-medium hover:text-pink-500 transition-colors"
            >
              HOME
            </Link>
            <Link 
              href="/timer" 
              className="text-sm font-medium hover:text-pink-500 transition-colors"
            >
              TIMER
            </Link>
          </div>
          <div className="w-[200px]" /> {/* Spacer for centering */}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center pl-12">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="block text-gray-400">LET THE</span>
              <span className="block text-pink-500">STUDYING BEGIN</span>
            </h1>
            
            <div className="flex items-center gap-4">
              <Circle className="w-12 h-12 text-pink-500" />
              <Triangle className="w-12 h-12 text-pink-500" />
              <Square className="w-12 h-12 text-pink-500" />
            </div>

            <Button 
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-6 text-lg rounded-none"
            >
              START NOW
            </Button>
          </div>

          <div className="relative h-[500px] hidden md:block">
            <Image
              src="/doll.png"
              alt="Game Master Doll"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </main>

      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-t from-pink-500/20 to-transparent pointer-events-none" />
    </div>
  )
}

