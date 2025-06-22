"use client"

import type React from "react"
import { useState, useEffect, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import {
  Newspaper,
  Clock,
  ThumbsUp,
  CheckCircle,
  XCircle,
  Heart,
  ChartLine,
  Cpu,
  Trophy,
  Building,
  FlaskRoundIcon as Flask,
  Flag,
  Globe,
  Smartphone,
  PlusCircle,
  Briefcase,
  Rocket,
  Laptop,
  Car,
  Film,
  GraduationCap,
  MessageCircle,
  User,
  Send,
  Play,
} from "lucide-react"

interface FormData {
  wouldUse: string
  favoriteSegments: string[]
  currentApps: string[]
  futureSegments: string[]
  suggestions: string
  name: string
  profession: string
}

export default function FeedbackForm() {
  const [formData, setFormData] = useState<FormData>({
    wouldUse: "",
    favoriteSegments: [],
    currentApps: [],
    futureSegments: [],
    suggestions: "",
    name: "",
    profession: "",
  })
  const [progress, setProgress] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const favoriteSegments = [
    { value: "business", label: "Business News", icon: ChartLine, color: "text-blue-600" },
    { value: "technology", label: "Technology", icon: Cpu, color: "text-purple-600" },
    { value: "sports", label: "Sports News", icon: Trophy, color: "text-green-600" },
    { value: "politics", label: "Politics", icon: Building, color: "text-red-600" },
    { value: "science", label: "Science", icon: Flask, color: "text-indigo-600" },
    { value: "india-news", label: "India News", icon: Flag, color: "text-orange-600" },
    { value: "world-news", label: "World News", icon: Globe, color: "text-teal-600" },
  ]

  const currentApps = ["Inshorts", "Google News", "Dailyhunt", "Times of India", "NDTV", "Other"]

  const futureSegments = [
    {
      value: "career-news",
      label: "Career-focused news (jobs, internships, career tips)",
      icon: Briefcase,
      color: "text-blue-600",
    },
    { value: "startup-stories", label: "Startup stories", icon: Rocket, color: "text-red-600" },
    { value: "gadget-reviews", label: "Gadget reviews", icon: Laptop, color: "text-purple-600" },
    { value: "auto-reviews", label: "Car/bike launches and reviews", icon: Car, color: "text-gray-600" },
    {
      value: "entertainment",
      label: "Entertainment news (memes, pop culture, short videos)",
      icon: Film,
      color: "text-pink-600",
    },
    {
      value: "campus-events",
      label: "Campus event coverage, hackathon highlights, event updates",
      icon: GraduationCap,
      color: "text-green-600",
    },
    {
      value: "trending-polls",
      label: "Trending topic polls, discussion threads",
      icon: MessageCircle,
      color: "text-yellow-600",
    },
    {
      value: "student-projects",
      label: "Student-led science projects, innovations",
      icon: Flask,
      color: "text-indigo-600",
    },
  ]

  const updateProgress = () => {
    let filledFields = 0
    const totalRequiredFields = 1 // Only wouldUse is required

    if (formData.wouldUse) filledFields++
    if (formData.favoriteSegments.length > 0) filledFields++
    if (formData.currentApps.length > 0) filledFields++
    if (formData.futureSegments.length > 0) filledFields++

    const progressPercentage = Math.min((filledFields / (totalRequiredFields + 3)) * 100, 100)
    setProgress(progressPercentage)
  }

  useEffect(() => {
    updateProgress()
  }, [formData])

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, wouldUse: value }))
  }

  const handleCheckboxChange = (category: keyof FormData, value: string) => {
    setFormData((prev) => {
      const currentArray = prev[category] as string[]
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value]
      return { ...prev, [category]: newArray }
    })
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = "https://script.google.com/macros/s/AKfycbyQDwXv82QzK4ggwgnXGaSANSBSC5VzQ_gRtsabBOSu3X-81HaLWKxo7IZnNRmBumeLgw/exec";

    // Create the data to send with proper handling of arrays
    const dataToSend = {
      wouldUse: formData.wouldUse,
      favoriteSegments: formData.favoriteSegments.join(', '), // Join array with commas
      currentApps: formData.currentApps.join(', '), // Join array with commas
      futureSegments: formData.futureSegments.join(', '), // Join array with commas
      suggestions: formData.suggestions,
      name: formData.name,
      profession: formData.profession
    };

    // Convert to URLSearchParams
    const formBody = new URLSearchParams(dataToSend).toString();

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formBody
    })
    .then(res => res.text())
    .then(data => {
      toast({
        title: "Success!",
        description: "Your feedback has been submitted successfully.",
      });
      setIsSubmitted(true);
      setProgress(100);
    })
    .catch(err => {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    });
  }

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-6 rounded-lg text-center">
          <CheckCircle className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
          <p className="text-lg">
            Your feedback has been recorded. We appreciate you taking the time to help us improve Flique!
          </p>
        </div>
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Flique Community!</h2>
          <p className="text-xl mb-6 opacity-90">
            Experience news with no ads, swipe-based interface, and meaningful discussions
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=com.socifair.flique&pcampaignid=web_share"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            <Play className="w-5 h-5 inline mr-3" />
            Download on Play Store
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Newspaper className="w-10 h-10 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Flique</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We believe news should empower, not overwhelm. Help us shape a news experience that truly fits your world.
          </p>
          <div className="mt-4 bg-green-100 text-green-800 px-4 py-2 rounded-full inline-block">
            <Clock className="w-4 h-4 inline mr-2" />
            Takes just 10-15 seconds to complete
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full mb-8">
          <div
            className="h-1 bg-gradient-to-r from-blue-600 to-green-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Quick Decision Section */}
          <div className="border-l-4 border-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <ThumbsUp className="w-6 h-6 text-blue-600 mr-3" />
              Quick Question
            </h2>
            <p className="text-gray-600 mb-4">
              Based on our current news segments (Business, Tech, Sports, Politics, Science, India & World News), would
              you use Flique?
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <label
                className={`flex-1 border-2 border-green-500 rounded-lg p-4 text-center cursor-pointer transition-all duration-200 hover:scale-105 ${
                  formData.wouldUse === "yes" ? "bg-blue-600 text-white" : "bg-white hover:bg-blue-600 hover:text-white"
                }`}
                onClick={() => handleRadioChange("yes")}
              >
                <input type="radio" name="wouldUse" value="yes" className="sr-only" required />
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" />
                <span className="font-semibold">Yes, I'd use it!</span>
              </label>
              <label
                className={`flex-1 border-2 border-red-500 rounded-lg p-4 text-center cursor-pointer transition-all duration-200 hover:scale-105 ${
                  formData.wouldUse === "no" ? "bg-blue-600 text-white" : "bg-white hover:bg-blue-600 hover:text-white"
                }`}
                onClick={() => handleRadioChange("no")}
              >
                <input type="radio" name="wouldUse" value="no" className="sr-only" required />
                <XCircle className="w-8 h-8 mx-auto mb-2 text-red-500" />
                <span className="font-semibold">Not for me</span>
              </label>
            </div>
          </div>

          {/* Favorite Segments */}
          <div className="border-l-4 border-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Heart className="w-6 h-6 text-red-500 mr-3" />
              Your Favorite News Topics
            </h2>
            <p className="text-gray-600 mb-4">Select all that interest you:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {favoriteSegments.map((segment) => {
                const Icon = segment.icon
                const isSelected = formData.favoriteSegments.includes(segment.value)
                return (
                  <label
                    key={segment.value}
                    className={`bg-white p-3 rounded-lg border-2 cursor-pointer flex items-center transition-all duration-200 hover:scale-105 hover:shadow-md ${
                      isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-500"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="favoriteSegments"
                      value={segment.value}
                      className="mr-3 w-5 h-5"
                      checked={isSelected}
                      onChange={() => handleCheckboxChange("favoriteSegments", segment.value)}
                    />
                    <Icon className={`w-5 h-5 mr-2 ${segment.color}`} />
                    <span>{segment.label}</span>
                  </label>
                )
              })}
            </div>
          </div>

          {/* Current Apps */}
          <div className="border-l-4 border-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Smartphone className="w-6 h-6 text-green-600 mr-3" />
              News Apps You Currently Use
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {currentApps.map((app) => {
                const value = app.toLowerCase().replace(/\s+/g, "-")
                const isSelected = formData.currentApps.includes(value)
                return (
                  <label
                    key={value}
                    className={`bg-white p-3 rounded-lg border-2 cursor-pointer flex items-center transition-all duration-200 hover:scale-105 hover:shadow-md ${
                      isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-500"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="currentApps"
                      value={value}
                      className="mr-3 w-5 h-5"
                      checked={isSelected}
                      onChange={() => handleCheckboxChange("currentApps", value)}
                    />
                    <span>{app}</span>
                  </label>
                )
              })}
            </div>
          </div>

          {/* Future Segments */}
          <div className="border-l-4 border-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <PlusCircle className="w-6 h-6 text-purple-600 mr-3" />
              New Segments We're Considering
            </h2>
            <p className="text-gray-600 mb-4">Which would you like to see? (Select any that interest you)</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {futureSegments.map((segment) => {
                const Icon = segment.icon
                const isSelected = formData.futureSegments.includes(segment.value)
                return (
                  <label
                    key={segment.value}
                    className={`bg-white p-3 rounded-lg border-2 cursor-pointer flex items-center transition-all duration-200 hover:scale-105 hover:shadow-md ${
                      isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-500"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="futureSegments"
                      value={segment.value}
                      className="mr-3 w-5 h-5"
                      checked={isSelected}
                      onChange={() => handleCheckboxChange("futureSegments", segment.value)}
                    />
                    <Icon className={`w-5 h-5 mr-2 ${segment.color}`} />
                    <span>{segment.label}</span>
                  </label>
                )
              })}
            </div>
          </div>

          {/* Quick Feedback */}
          <div className="border-l-4 border-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <MessageCircle className="w-6 h-6 text-yellow-600 mr-3" />
              Quick Suggestions (Optional)
            </h2>
            <Textarea
              placeholder="Any other topics you'd like to see or feedback about Flique? (Optional - leave blank if in a hurry!)"
              value={formData.suggestions}
              name="suggestions"
              onChange={(e) => handleInputChange("suggestions", e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>

          {/* Optional Details */}
          <div className="border-l-4 border-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg opacity-75">
            <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
              <User className="w-5 h-5 text-gray-500 mr-3" />
              Optional Details (Skip if in a hurry)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                name="name"
                placeholder="Your name (optional)"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
              <select
                className="p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                value={formData.profession}
                name="profession"
                onChange={(e) => handleInputChange("profession", e.target.value)}
              >
                <option value="">Select profession</option>
                <option value="student">Student</option>
                <option value="professional">Professional</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-full text-xl font-bold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <Send className="w-5 h-5 mr-3" />
              Submit Feedback
            </Button>
          </div>
        </form>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Flique Community!</h2>
          <p className="text-xl mb-6 opacity-90">
            Experience news with no ads, swipe-based interface, and meaningful discussions
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=com.socifair.flique&pcampaignid=web_share"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            <Play className="w-5 h-5 inline mr-3" />
            Download on Play Store
          </a>
        </div>
      </div>
    </div>
  )
}
