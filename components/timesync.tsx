"use client"

import { useState, useEffect, useMemo } from "react"
import { Clock, Globe, Plus, Star, Sun, Moon, ArrowRight, Calendar, X, Search, MapPin, Users, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface City {
  id: string
  name: string
  country: string
  timezone: string
  lat: number
  lng: number
  region: string
}

const CITIES: City[] = [
  // Europe
  { id: "paris", name: "Paris", country: "France", timezone: "Europe/Paris", lat: 48.8566, lng: 2.3522, region: "Europe" },
  { id: "london", name: "London", country: "United Kingdom", timezone: "Europe/London", lat: 51.5074, lng: -0.1278, region: "Europe" },
  { id: "berlin", name: "Berlin", country: "Germany", timezone: "Europe/Berlin", lat: 52.52, lng: 13.405, region: "Europe" },
  { id: "madrid", name: "Madrid", country: "Spain", timezone: "Europe/Madrid", lat: 40.4168, lng: -3.7038, region: "Europe" },
  { id: "rome", name: "Rome", country: "Italy", timezone: "Europe/Rome", lat: 41.9028, lng: 12.4964, region: "Europe" },
  { id: "amsterdam", name: "Amsterdam", country: "Netherlands", timezone: "Europe/Amsterdam", lat: 52.3676, lng: 4.9041, region: "Europe" },
  { id: "brussels", name: "Brussels", country: "Belgium", timezone: "Europe/Brussels", lat: 50.8503, lng: 4.3517, region: "Europe" },
  { id: "vienna", name: "Vienna", country: "Austria", timezone: "Europe/Vienna", lat: 48.2082, lng: 16.3738, region: "Europe" },
  { id: "zurich", name: "Zurich", country: "Switzerland", timezone: "Europe/Zurich", lat: 47.3769, lng: 8.5417, region: "Europe" },
  { id: "lisbon", name: "Lisbon", country: "Portugal", timezone: "Europe/Lisbon", lat: 38.7223, lng: -9.1393, region: "Europe" },
  { id: "dublin", name: "Dublin", country: "Ireland", timezone: "Europe/Dublin", lat: 53.3498, lng: -6.2603, region: "Europe" },
  { id: "copenhagen", name: "Copenhagen", country: "Denmark", timezone: "Europe/Copenhagen", lat: 55.6761, lng: 12.5683, region: "Europe" },
  { id: "stockholm", name: "Stockholm", country: "Sweden", timezone: "Europe/Stockholm", lat: 59.3293, lng: 18.0686, region: "Europe" },
  { id: "oslo", name: "Oslo", country: "Norway", timezone: "Europe/Oslo", lat: 59.9139, lng: 10.7522, region: "Europe" },
  { id: "helsinki", name: "Helsinki", country: "Finland", timezone: "Europe/Helsinki", lat: 60.1699, lng: 24.9384, region: "Europe" },
  { id: "warsaw", name: "Warsaw", country: "Poland", timezone: "Europe/Warsaw", lat: 52.2297, lng: 21.0122, region: "Europe" },
  { id: "prague", name: "Prague", country: "Czech Republic", timezone: "Europe/Prague", lat: 50.0755, lng: 14.4378, region: "Europe" },
  { id: "budapest", name: "Budapest", country: "Hungary", timezone: "Europe/Budapest", lat: 47.4979, lng: 19.0402, region: "Europe" },
  { id: "athens", name: "Athens", country: "Greece", timezone: "Europe/Athens", lat: 37.9838, lng: 23.7275, region: "Europe" },
  { id: "moscow", name: "Moscow", country: "Russia", timezone: "Europe/Moscow", lat: 55.7558, lng: 37.6173, region: "Europe" },
  { id: "istanbul", name: "Istanbul", country: "Turkey", timezone: "Europe/Istanbul", lat: 41.0082, lng: 28.9784, region: "Europe" },
  { id: "kyiv", name: "Kyiv", country: "Ukraine", timezone: "Europe/Kyiv", lat: 50.4501, lng: 30.5234, region: "Europe" },
  { id: "bucharest", name: "Bucharest", country: "Romania", timezone: "Europe/Bucharest", lat: 44.4268, lng: 26.1025, region: "Europe" },
  { id: "milan", name: "Milan", country: "Italy", timezone: "Europe/Rome", lat: 45.4642, lng: 9.19, region: "Europe" },
  { id: "barcelona", name: "Barcelona", country: "Spain", timezone: "Europe/Madrid", lat: 41.3851, lng: 2.1734, region: "Europe" },
  { id: "munich", name: "Munich", country: "Germany", timezone: "Europe/Berlin", lat: 48.1351, lng: 11.582, region: "Europe" },
  
  // North America
  { id: "ny", name: "New York", country: "USA", timezone: "America/New_York", lat: 40.7128, lng: -74.006, region: "North America" },
  { id: "la", name: "Los Angeles", country: "USA", timezone: "America/Los_Angeles", lat: 34.0522, lng: -118.2437, region: "North America" },
  { id: "chicago", name: "Chicago", country: "USA", timezone: "America/Chicago", lat: 41.8781, lng: -87.6298, region: "North America" },
  { id: "houston", name: "Houston", country: "USA", timezone: "America/Chicago", lat: 29.7604, lng: -95.3698, region: "North America" },
  { id: "phoenix", name: "Phoenix", country: "USA", timezone: "America/Phoenix", lat: 33.4484, lng: -112.074, region: "North America" },
  { id: "philadelphia", name: "Philadelphia", country: "USA", timezone: "America/New_York", lat: 39.9526, lng: -75.1652, region: "North America" },
  { id: "san-antonio", name: "San Antonio", country: "USA", timezone: "America/Chicago", lat: 29.4241, lng: -98.4936, region: "North America" },
  { id: "san-diego", name: "San Diego", country: "USA", timezone: "America/Los_Angeles", lat: 32.7157, lng: -117.1611, region: "North America" },
  { id: "dallas", name: "Dallas", country: "USA", timezone: "America/Chicago", lat: 32.7767, lng: -96.797, region: "North America" },
  { id: "san-jose", name: "San Jose", country: "USA", timezone: "America/Los_Angeles", lat: 37.3382, lng: -121.8863, region: "North America" },
  { id: "austin", name: "Austin", country: "USA", timezone: "America/Chicago", lat: 30.2672, lng: -97.7431, region: "North America" },
  { id: "jacksonville", name: "Jacksonville", country: "USA", timezone: "America/New_York", lat: 30.3322, lng: -81.6557, region: "North America" },
  { id: "san-francisco", name: "San Francisco", country: "USA", timezone: "America/Los_Angeles", lat: 37.7749, lng: -122.4194, region: "North America" },
  { id: "seattle", name: "Seattle", country: "USA", timezone: "America/Los_Angeles", lat: 47.6062, lng: -122.3321, region: "North America" },
  { id: "denver", name: "Denver", country: "USA", timezone: "America/Denver", lat: 39.7392, lng: -104.9903, region: "North America" },
  { id: "boston", name: "Boston", country: "USA", timezone: "America/New_York", lat: 42.3601, lng: -71.0589, region: "North America" },
  { id: "atlanta", name: "Atlanta", country: "USA", timezone: "America/New_York", lat: 33.749, lng: -84.388, region: "North America" },
  { id: "miami", name: "Miami", country: "USA", timezone: "America/New_York", lat: 25.7617, lng: -80.1918, region: "North America" },
  { id: "portland", name: "Portland", country: "USA", timezone: "America/Los_Angeles", lat: 45.5051, lng: -122.675, region: "North America" },
  { id: "las-vegas", name: "Las Vegas", country: "USA", timezone: "America/Los_Angeles", lat: 36.1699, lng: -115.1398, region: "North America" },
  { id: "toronto", name: "Toronto", country: "Canada", timezone: "America/Toronto", lat: 43.6532, lng: -79.3832, region: "North America" },
  { id: "montreal", name: "Montreal", country: "Canada", timezone: "America/Montreal", lat: 45.5017, lng: -73.5673, region: "North America" },
  { id: "vancouver", name: "Vancouver", country: "Canada", timezone: "America/Vancouver", lat: 49.2827, lng: -123.1207, region: "North America" },
  { id: "calgary", name: "Calgary", country: "Canada", timezone: "America/Edmonton", lat: 51.0447, lng: -114.0719, region: "North America" },
  { id: "ottawa", name: "Ottawa", country: "Canada", timezone: "America/Toronto", lat: 45.4215, lng: -75.6972, region: "North America" },
  { id: "mexico-city", name: "Mexico City", country: "Mexico", timezone: "America/Mexico_City", lat: 19.4326, lng: -99.1332, region: "North America" },
  { id: "guadalajara", name: "Guadalajara", country: "Mexico", timezone: "America/Mexico_City", lat: 20.6597, lng: -103.3496, region: "North America" },
  { id: "monterrey", name: "Monterrey", country: "Mexico", timezone: "America/Monterrey", lat: 25.6866, lng: -100.3161, region: "North America" },
  
  // South America
  { id: "sao-paulo", name: "Sao Paulo", country: "Brazil", timezone: "America/Sao_Paulo", lat: -23.5505, lng: -46.6333, region: "South America" },
  { id: "rio", name: "Rio de Janeiro", country: "Brazil", timezone: "America/Sao_Paulo", lat: -22.9068, lng: -43.1729, region: "South America" },
  { id: "brasilia", name: "Brasilia", country: "Brazil", timezone: "America/Sao_Paulo", lat: -15.826, lng: -47.9218, region: "South America" },
  { id: "buenos-aires", name: "Buenos Aires", country: "Argentina", timezone: "America/Argentina/Buenos_Aires", lat: -34.6037, lng: -58.3816, region: "South America" },
  { id: "santiago", name: "Santiago", country: "Chile", timezone: "America/Santiago", lat: -33.4489, lng: -70.6693, region: "South America" },
  { id: "lima", name: "Lima", country: "Peru", timezone: "America/Lima", lat: -12.0464, lng: -77.0428, region: "South America" },
  { id: "bogota", name: "Bogota", country: "Colombia", timezone: "America/Bogota", lat: 4.711, lng: -74.0721, region: "South America" },
  { id: "caracas", name: "Caracas", country: "Venezuela", timezone: "America/Caracas", lat: 10.4806, lng: -66.9036, region: "South America" },
  { id: "quito", name: "Quito", country: "Ecuador", timezone: "America/Guayaquil", lat: -0.1807, lng: -78.4678, region: "South America" },
  { id: "montevideo", name: "Montevideo", country: "Uruguay", timezone: "America/Montevideo", lat: -34.9011, lng: -56.1645, region: "South America" },
  
  // Asia
  { id: "tokyo", name: "Tokyo", country: "Japan", timezone: "Asia/Tokyo", lat: 35.6762, lng: 139.6503, region: "Asia" },
  { id: "osaka", name: "Osaka", country: "Japan", timezone: "Asia/Tokyo", lat: 34.6937, lng: 135.5023, region: "Asia" },
  { id: "beijing", name: "Beijing", country: "China", timezone: "Asia/Shanghai", lat: 39.9042, lng: 116.4074, region: "Asia" },
  { id: "shanghai", name: "Shanghai", country: "China", timezone: "Asia/Shanghai", lat: 31.2304, lng: 121.4737, region: "Asia" },
  { id: "hong-kong", name: "Hong Kong", country: "China", timezone: "Asia/Hong_Kong", lat: 22.3193, lng: 114.1694, region: "Asia" },
  { id: "shenzhen", name: "Shenzhen", country: "China", timezone: "Asia/Shanghai", lat: 22.5431, lng: 114.0579, region: "Asia" },
  { id: "guangzhou", name: "Guangzhou", country: "China", timezone: "Asia/Shanghai", lat: 23.1291, lng: 113.2644, region: "Asia" },
  { id: "taipei", name: "Taipei", country: "Taiwan", timezone: "Asia/Taipei", lat: 25.033, lng: 121.5654, region: "Asia" },
  { id: "seoul", name: "Seoul", country: "South Korea", timezone: "Asia/Seoul", lat: 37.5665, lng: 126.978, region: "Asia" },
  { id: "busan", name: "Busan", country: "South Korea", timezone: "Asia/Seoul", lat: 35.1796, lng: 129.0756, region: "Asia" },
  { id: "singapore", name: "Singapore", country: "Singapore", timezone: "Asia/Singapore", lat: 1.3521, lng: 103.8198, region: "Asia" },
  { id: "bangkok", name: "Bangkok", country: "Thailand", timezone: "Asia/Bangkok", lat: 13.7563, lng: 100.5018, region: "Asia" },
  { id: "kuala-lumpur", name: "Kuala Lumpur", country: "Malaysia", timezone: "Asia/Kuala_Lumpur", lat: 3.139, lng: 101.6869, region: "Asia" },
  { id: "jakarta", name: "Jakarta", country: "Indonesia", timezone: "Asia/Jakarta", lat: -6.2088, lng: 106.8456, region: "Asia" },
  { id: "bali", name: "Bali", country: "Indonesia", timezone: "Asia/Makassar", lat: -8.3405, lng: 115.092, region: "Asia" },
  { id: "manila", name: "Manila", country: "Philippines", timezone: "Asia/Manila", lat: 14.5995, lng: 120.9842, region: "Asia" },
  { id: "ho-chi-minh", name: "Ho Chi Minh City", country: "Vietnam", timezone: "Asia/Ho_Chi_Minh", lat: 10.8231, lng: 106.6297, region: "Asia" },
  { id: "hanoi", name: "Hanoi", country: "Vietnam", timezone: "Asia/Ho_Chi_Minh", lat: 21.0285, lng: 105.8542, region: "Asia" },
  { id: "mumbai", name: "Mumbai", country: "India", timezone: "Asia/Kolkata", lat: 19.076, lng: 72.8777, region: "Asia" },
  { id: "delhi", name: "New Delhi", country: "India", timezone: "Asia/Kolkata", lat: 28.6139, lng: 77.209, region: "Asia" },
  { id: "bangalore", name: "Bangalore", country: "India", timezone: "Asia/Kolkata", lat: 12.9716, lng: 77.5946, region: "Asia" },
  { id: "hyderabad", name: "Hyderabad", country: "India", timezone: "Asia/Kolkata", lat: 17.385, lng: 78.4867, region: "Asia" },
  { id: "chennai", name: "Chennai", country: "India", timezone: "Asia/Kolkata", lat: 13.0827, lng: 80.2707, region: "Asia" },
  { id: "kolkata", name: "Kolkata", country: "India", timezone: "Asia/Kolkata", lat: 22.5726, lng: 88.3639, region: "Asia" },
  { id: "dhaka", name: "Dhaka", country: "Bangladesh", timezone: "Asia/Dhaka", lat: 23.8103, lng: 90.4125, region: "Asia" },
  { id: "karachi", name: "Karachi", country: "Pakistan", timezone: "Asia/Karachi", lat: 24.8607, lng: 67.0011, region: "Asia" },
  { id: "lahore", name: "Lahore", country: "Pakistan", timezone: "Asia/Karachi", lat: 31.5497, lng: 74.3436, region: "Asia" },
  { id: "colombo", name: "Colombo", country: "Sri Lanka", timezone: "Asia/Colombo", lat: 6.9271, lng: 79.8612, region: "Asia" },
  { id: "kathmandu", name: "Kathmandu", country: "Nepal", timezone: "Asia/Kathmandu", lat: 27.7172, lng: 85.324, region: "Asia" },
  
  // Middle East
  { id: "dubai", name: "Dubai", country: "UAE", timezone: "Asia/Dubai", lat: 25.2048, lng: 55.2708, region: "Middle East" },
  { id: "abu-dhabi", name: "Abu Dhabi", country: "UAE", timezone: "Asia/Dubai", lat: 24.4539, lng: 54.3773, region: "Middle East" },
  { id: "doha", name: "Doha", country: "Qatar", timezone: "Asia/Qatar", lat: 25.2854, lng: 51.531, region: "Middle East" },
  { id: "riyadh", name: "Riyadh", country: "Saudi Arabia", timezone: "Asia/Riyadh", lat: 24.7136, lng: 46.6753, region: "Middle East" },
  { id: "jeddah", name: "Jeddah", country: "Saudi Arabia", timezone: "Asia/Riyadh", lat: 21.4858, lng: 39.1925, region: "Middle East" },
  { id: "kuwait", name: "Kuwait City", country: "Kuwait", timezone: "Asia/Kuwait", lat: 29.3759, lng: 47.9774, region: "Middle East" },
  { id: "bahrain", name: "Manama", country: "Bahrain", timezone: "Asia/Bahrain", lat: 26.2285, lng: 50.5861, region: "Middle East" },
  { id: "muscat", name: "Muscat", country: "Oman", timezone: "Asia/Muscat", lat: 23.588, lng: 58.3829, region: "Middle East" },
  { id: "tel-aviv", name: "Tel Aviv", country: "Israel", timezone: "Asia/Jerusalem", lat: 32.0853, lng: 34.7818, region: "Middle East" },
  { id: "jerusalem", name: "Jerusalem", country: "Israel", timezone: "Asia/Jerusalem", lat: 31.7683, lng: 35.2137, region: "Middle East" },
  { id: "amman", name: "Amman", country: "Jordan", timezone: "Asia/Amman", lat: 31.9454, lng: 35.9284, region: "Middle East" },
  { id: "beirut", name: "Beirut", country: "Lebanon", timezone: "Asia/Beirut", lat: 33.8938, lng: 35.5018, region: "Middle East" },
  { id: "tehran", name: "Tehran", country: "Iran", timezone: "Asia/Tehran", lat: 35.6892, lng: 51.389, region: "Middle East" },
  { id: "baghdad", name: "Baghdad", country: "Iraq", timezone: "Asia/Baghdad", lat: 33.3152, lng: 44.3661, region: "Middle East" },
  
  // Africa
  { id: "cairo", name: "Cairo", country: "Egypt", timezone: "Africa/Cairo", lat: 30.0444, lng: 31.2357, region: "Africa" },
  { id: "alexandria", name: "Alexandria", country: "Egypt", timezone: "Africa/Cairo", lat: 31.2001, lng: 29.9187, region: "Africa" },
  { id: "johannesburg", name: "Johannesburg", country: "South Africa", timezone: "Africa/Johannesburg", lat: -26.2041, lng: 28.0473, region: "Africa" },
  { id: "cape-town", name: "Cape Town", country: "South Africa", timezone: "Africa/Johannesburg", lat: -33.9249, lng: 18.4241, region: "Africa" },
  { id: "durban", name: "Durban", country: "South Africa", timezone: "Africa/Johannesburg", lat: -29.8587, lng: 31.0218, region: "Africa" },
  { id: "nairobi", name: "Nairobi", country: "Kenya", timezone: "Africa/Nairobi", lat: -1.2921, lng: 36.8219, region: "Africa" },
  { id: "lagos", name: "Lagos", country: "Nigeria", timezone: "Africa/Lagos", lat: 6.5244, lng: 3.3792, region: "Africa" },
  { id: "abuja", name: "Abuja", country: "Nigeria", timezone: "Africa/Lagos", lat: 9.0765, lng: 7.3986, region: "Africa" },
  { id: "casablanca", name: "Casablanca", country: "Morocco", timezone: "Africa/Casablanca", lat: 33.5731, lng: -7.5898, region: "Africa" },
  { id: "marrakech", name: "Marrakech", country: "Morocco", timezone: "Africa/Casablanca", lat: 31.6295, lng: -7.9811, region: "Africa" },
  { id: "tunis", name: "Tunis", country: "Tunisia", timezone: "Africa/Tunis", lat: 36.8065, lng: 10.1815, region: "Africa" },
  { id: "algiers", name: "Algiers", country: "Algeria", timezone: "Africa/Algiers", lat: 36.7372, lng: 3.0869, region: "Africa" },
  { id: "accra", name: "Accra", country: "Ghana", timezone: "Africa/Accra", lat: 5.6037, lng: -0.187, region: "Africa" },
  { id: "addis-ababa", name: "Addis Ababa", country: "Ethiopia", timezone: "Africa/Addis_Ababa", lat: 8.9806, lng: 38.7578, region: "Africa" },
  { id: "dar-es-salaam", name: "Dar es Salaam", country: "Tanzania", timezone: "Africa/Dar_es_Salaam", lat: -6.7924, lng: 39.2083, region: "Africa" },
  { id: "kampala", name: "Kampala", country: "Uganda", timezone: "Africa/Kampala", lat: 0.3476, lng: 32.5825, region: "Africa" },
  
  // Oceania
  { id: "sydney", name: "Sydney", country: "Australia", timezone: "Australia/Sydney", lat: -33.8688, lng: 151.2093, region: "Oceania" },
  { id: "melbourne", name: "Melbourne", country: "Australia", timezone: "Australia/Melbourne", lat: -37.8136, lng: 144.9631, region: "Oceania" },
  { id: "brisbane", name: "Brisbane", country: "Australia", timezone: "Australia/Brisbane", lat: -27.4698, lng: 153.0251, region: "Oceania" },
  { id: "perth", name: "Perth", country: "Australia", timezone: "Australia/Perth", lat: -31.9505, lng: 115.8605, region: "Oceania" },
  { id: "adelaide", name: "Adelaide", country: "Australia", timezone: "Australia/Adelaide", lat: -34.9285, lng: 138.6007, region: "Oceania" },
  { id: "auckland", name: "Auckland", country: "New Zealand", timezone: "Pacific/Auckland", lat: -36.8509, lng: 174.7645, region: "Oceania" },
  { id: "wellington", name: "Wellington", country: "New Zealand", timezone: "Pacific/Auckland", lat: -41.2865, lng: 174.7762, region: "Oceania" },
  { id: "fiji", name: "Suva", country: "Fiji", timezone: "Pacific/Fiji", lat: -18.1416, lng: 178.4415, region: "Oceania" },
  { id: "honolulu", name: "Honolulu", country: "USA", timezone: "Pacific/Honolulu", lat: 21.3069, lng: -157.8583, region: "Oceania" },
  { id: "guam", name: "Hagatna", country: "Guam", timezone: "Pacific/Guam", lat: 13.4443, lng: 144.7937, region: "Oceania" },
]

const REGIONS = ["All", "Europe", "North America", "South America", "Asia", "Middle East", "Africa", "Oceania"]

export function TimeSync() {
  const [selectedCities, setSelectedCities] = useState<City[]>([CITIES[0], CITIES[27]])
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [sliderOffset, setSliderOffset] = useState(0)
  const [showCityPicker, setShowCityPicker] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [favorites, setFavorites] = useState<string[]>([])
  const [selectedRegion, setSelectedRegion] = useState("All")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Initialisation uniquement côté client
  useEffect(() => {
    setMounted(true)
    setCurrentTime(new Date())
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem("timesync_favorites")
    if (saved) {
      setFavorites(JSON.parse(saved))
    }
  }, [])

  // Fonctions helpers avec vérification de currentTime
  const getTimeInTimezone = (timezone: string, offsetHours: number = 0) => {
    if (!currentTime) return "--:--"
    const date = new Date(currentTime.getTime() + offsetHours * 60 * 60 * 1000)
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: timezone,
    }).format(date)
  }

  const getFullTimeInTimezone = (timezone: string, offsetHours: number = 0) => {
    if (!currentTime) return "--:--:--"
    const date = new Date(currentTime.getTime() + offsetHours * 60 * 60 * 1000)
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: timezone,
    }).format(date)
  }

  const getDateInTimezone = (timezone: string) => {
    if (!currentTime) return "--"
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      timeZone: timezone,
    }).format(currentTime)
  }

  const getTimeDifference = (tz1: string, tz2: string) => {
    if (!currentTime) return 0
    const time1 = new Date(currentTime.toLocaleString("en-US", { timeZone: tz1 }))
    const time2 = new Date(currentTime.toLocaleString("en-US", { timeZone: tz2 }))
    const diff = (time2.getTime() - time1.getTime()) / (1000 * 60 * 60)
    return diff
  }

  const getHourInTimezone = (timezone: string) => {
    if (!currentTime) return 0
    return parseInt(
      new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        hour12: false,
        timeZone: timezone,
      }).format(currentTime)
    )
  }

  const isDaytime = (timezone: string) => {
    const hour = getHourInTimezone(timezone)
    return hour >= 6 && hour < 20
  }

  const toggleFavorite = (cityId: string) => {
    const newFavorites = favorites.includes(cityId)
      ? favorites.filter((id) => id !== cityId)
      : [...favorites, cityId]
    setFavorites(newFavorites)
    localStorage.setItem("timesync_favorites", JSON.stringify(newFavorites))
  }

  const addCity = (city: City) => {
    if (selectedCities.length < 6 && !selectedCities.find((c) => c.id === city.id)) {
      setSelectedCities([...selectedCities, city])
    }
    setShowCityPicker(false)
    setSearchQuery("")
  }

  const removeCity = (cityId: string) => {
    if (selectedCities.length > 1) {
      setSelectedCities(selectedCities.filter((c) => c.id !== cityId))
    }
  }

  const filteredCities = useMemo(() => {
    return CITIES.filter(
      (city) =>
        !selectedCities.find((c) => c.id === city.id) &&
        (selectedRegion === "All" || city.region === selectedRegion) &&
        (city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          city.country.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }, [selectedCities, selectedRegion, searchQuery])

  const getMeetingSlots = () => {
    const slots = []
    for (let hour = 8; hour <= 20; hour++) {
      const isGood = selectedCities.every((city) => {
        const cityHour =
          (hour + Math.round(getTimeDifference(selectedCities[0].timezone, city.timezone))) % 24
        const adjustedHour = cityHour < 0 ? cityHour + 24 : cityHour
        return adjustedHour >= 8 && adjustedHour <= 20
      })
      if (isGood) {
        slots.push(hour)
      }
    }
    return slots.slice(0, 4)
  }

  const favoriteCities = CITIES.filter((c) => favorites.includes(c.id))
  const citiesByRegion = useMemo(() => {
    const grouped: Record<string, City[]> = {}
    CITIES.forEach((city) => {
      if (!grouped[city.region]) {
        grouped[city.region] = []
      }
      grouped[city.region].push(city)
    })
    return grouped
  }, [])

  // Pendant l'hydratation, afficher un loader pour éviter le mismatch
  if (!mounted || !currentTime) {
    return (
      <div className="flex h-full bg-background items-center justify-center min-h-screen">
        <div className="animate-pulse text-muted-foreground text-center">
          <Globe className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Loading time zones...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row h-full bg-background relative">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-card sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-chart-3/10 flex items-center justify-center">
            <Globe className="w-5 h-5 text-chart-3" />
          </div>
          <div>
            <h2 className="font-bold text-foreground">TimeSync</h2>
            <p className="text-xs text-muted-foreground">World Time Converter</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
            className="p-2 rounded-xl bg-secondary text-foreground"
          >
            <MapPin className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-xl bg-secondary text-foreground"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Left Sidebar - Cities (Mobile Drawer) */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-80 bg-card border-r border-border flex flex-col transition-transform duration-300 lg:relative lg:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between p-4 border-b border-border lg:hidden">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-chart-3/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-chart-3" />
            </div>
            <div>
              <h2 className="font-bold text-foreground">TimeSync</h2>
              <p className="text-xs text-muted-foreground">World Time Converter</p>
            </div>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="p-2 rounded-xl hover:bg-secondary">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="p-4 hidden lg:block">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-chart-3/10 flex items-center justify-center">
              <Globe className="w-6 h-6 text-chart-3" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-foreground">TimeSync</h2>
              <p className="text-xs text-muted-foreground">World Time Converter</p>
            </div>
          </div>
        </div>

        <div className="px-8 pb-4">
          <div className="flex gap-1 p-1 bg-secondary rounded-xl mb-4">
            <button className="flex-1 py-2 px-12 pb-2 text-sm font-medium rounded-lg  ">
              Converter
            </button>
           
          </div>
        </div>

        <div className="px-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-foreground">World Clocks</span>
            <span className="text-xs text-muted-foreground px-2 py-1 bg-secondary rounded-lg">
              {selectedCities.length}/6
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 px-4 pb-4">
          {selectedCities.map((city, index) => {
            const isDay = isDaytime(city.timezone)
            const diff =
              index > 0
                ? getTimeDifference(selectedCities[0].timezone, city.timezone)
                : 0

            return (
              <div
                key={city.id}
                className={cn(
                  "p-4 rounded-xl transition-all",
                  index === 0 ? "bg-chart-3/10 border border-chart-3/20" : "bg-secondary/50 hover:bg-secondary"
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {isDay ? (
                      <Sun className="w-4 h-4 text-chart-4" />
                    ) : (
                      <Moon className="w-4 h-4 text-chart-3" />
                    )}
                    <div>
                      <p className="font-medium text-foreground">{city.name}</p>
                      <p className="text-xs text-muted-foreground">{city.country}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleFavorite(city.id)}
                      className="p-1 rounded-lg hover:bg-background/50 transition-colors"
                    >
                      <Star
                        className={cn(
                          "w-4 h-4",
                          favorites.includes(city.id)
                            ? "fill-chart-4 text-chart-4"
                            : "text-muted-foreground"
                        )}
                      />
                    </button>
                    {selectedCities.length > 1 && (
                      <button
                        onClick={() => removeCity(city.id)}
                        className="p-1 rounded-lg hover:bg-destructive/10 transition-colors"
                      >
                        <X className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-bold text-foreground tabular-nums">
                      {getTimeInTimezone(city.timezone, sliderOffset)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {getDateInTimezone(city.timezone)}
                    </p>
                  </div>
                  {index > 0 && (
                    <span
                      className={cn(
                        "text-sm font-medium px-2 py-1 rounded-lg",
                        diff >= 0 ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"
                      )}
                    >
                      {diff >= 0 ? "+" : ""}
                      {diff}h
                    </span>
                  )}
                </div>
              </div>
            )
          })}

          {selectedCities.length < 6 && (
            <button
              onClick={() => setShowCityPicker(true)}
              className="w-full p-4 rounded-xl border-2 border-dashed border-border hover:border-chart-3 hover:bg-chart-3/5 transition-all flex items-center justify-center gap-2 text-muted-foreground hover:text-chart-3"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Add City</span>
            </button>
          )}
        </div>

        {/* Favorites Section */}
        {favoriteCities.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border px-4 pb-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-chart-4 fill-chart-4" />
              <span className="text-sm font-medium text-foreground">Favorites</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {favoriteCities.slice(0, 6).map((city) => (
                <button
                  key={city.id}
                  onClick={() => addCity(city)}
                  disabled={selectedCities.find((c) => c.id === city.id) !== undefined || selectedCities.length >= 6}
                  className="px-2 py-1 text-xs rounded-lg bg-secondary hover:bg-secondary/80 text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  {city.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Mobile overlay for left sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col overflow-y-auto">
        <div className="flex-1">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-chart-3/10 text-chart-3 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>130+ Cities Worldwide</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Compare Time Zones
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Slide to explore different times across your selected cities
              </p>
            </div>

            {/* Time Comparison Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {selectedCities.slice(0, 3).map((city, index) => {
                const isDay = isDaytime(city.timezone)
                const diff = index > 0 ? getTimeDifference(selectedCities[0].timezone, city.timezone) : 0
                return (
                  <div
                    key={city.id}
                    className={cn(
                      "p-4 sm:p-6 rounded-2xl border transition-all relative overflow-hidden",
                      isDay
                        ? "bg-gradient-to-br from-chart-4/10 to-chart-4/5 border-chart-4/20"
                        : "bg-gradient-to-br from-chart-3/10 to-chart-3/5 border-chart-3/20"
                    )}
                  >
                    {index === 0 && (
                      <span className="absolute top-2 right-2 sm:top-3 sm:right-3 text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg bg-chart-3 text-white">
                        Reference
                      </span>
                    )}
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                      {isDay ? (
                        <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-chart-4" />
                      ) : (
                        <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-chart-3" />
                      )}
                      <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                        {isDay ? "Daytime" : "Nighttime"}
                      </span>
                    </div>
                    <p className="text-3xl sm:text-4xl font-bold text-foreground mb-1 tabular-nums">
                      {getFullTimeInTimezone(city.timezone, sliderOffset)}
                    </p>
                    <p className="text-base sm:text-lg font-medium text-foreground">{city.name}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs sm:text-sm text-muted-foreground">{city.country}</p>
                      {index > 0 && (
                        <span className={cn(
                          "text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 rounded",
                          diff >= 0 ? "bg-accent/20 text-accent" : "bg-destructive/20 text-destructive"
                        )}>
                          {diff >= 0 ? "+" : ""}{diff}h
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Additional Cities Row */}
            {selectedCities.length > 3 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-6 sm:mb-8">
                {selectedCities.slice(3).map((city) => {
                  const diff = getTimeDifference(selectedCities[0].timezone, city.timezone)
                  return (
                    <div key={city.id} className="p-3 sm:p-4 rounded-xl bg-card border border-border">
                      <p className="text-xl sm:text-2xl font-bold text-foreground tabular-nums">
                        {getTimeInTimezone(city.timezone, sliderOffset)}
                      </p>
                      <p className="text-sm font-medium text-foreground">{city.name}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] sm:text-xs text-muted-foreground">{city.country}</p>
                        <span className={cn(
                          "text-[10px] sm:text-xs font-medium",
                          diff >= 0 ? "text-accent" : "text-destructive"
                        )}>
                          {diff >= 0 ? "+" : ""}{diff}h
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Time Slider */}
            <div className="bg-card rounded-2xl p-4 sm:p-6 border border-border mb-6 sm:mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-foreground">Time Offset</span>
                <span className="text-sm font-semibold text-chart-3 bg-chart-3/10 px-3 py-1 rounded-lg">
                  {sliderOffset >= 0 ? "+" : ""}
                  {sliderOffset}h from now
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                <span className="text-xs text-muted-foreground w-6 sm:w-8">-12h</span>
                <input
                  type="range"
                  min={-12}
                  max={12}
                  value={sliderOffset}
                  onChange={(e) => setSliderOffset(Number(e.target.value))}
                  className="flex-1 accent-chart-3 h-2"
                />
                <span className="text-xs text-muted-foreground w-6 sm:w-8">+12h</span>
              </div>
              <div className="flex items-center justify-center gap-2 sm:gap-3 mt-4 flex-wrap">
                {selectedCities.slice(0, 4).map((city, index) => (
                  <div key={city.id} className="flex items-center gap-1 sm:gap-2">
                    <span className="text-xs sm:text-sm font-medium text-foreground tabular-nums">
                      {getTimeInTimezone(city.timezone, sliderOffset)}
                    </span>
                    <span className="text-[10px] sm:text-xs text-muted-foreground">{city.name}</span>
                    {index < Math.min(selectedCities.length - 1, 3) && (
                      <ArrowRight className="w-2 h-2 sm:w-3 sm:h-3 text-muted-foreground mx-0.5 sm:mx-1" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Best Meeting Times */}
            <div className="bg-card rounded-2xl p-4 sm:p-6 border border-border">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                <span className="font-semibold text-foreground text-sm sm:text-base">Best Meeting Times</span>
                <span className="text-xs text-muted-foreground ml-auto">Business hours overlap</span>
              </div>
              {getMeetingSlots().length > 0 ? (
                <div className="space-y-2">
                  {getMeetingSlots().map((hour) => (
                    <div
                      key={hour}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-accent/5 border border-accent/10 gap-2"
                    >
                      <div className="flex items-center gap-3 flex-wrap">
                        {selectedCities.slice(0, 4).map((city, index) => {
                          let cityHour =
                            (hour +
                              Math.round(
                                getTimeDifference(selectedCities[0].timezone, city.timezone)
                              )) %
                            24
                          if (cityHour < 0) cityHour += 24
                          return (
                            <div key={city.id} className="flex items-center gap-1 sm:gap-2">
                              <span className="text-xs sm:text-sm font-medium text-foreground tabular-nums">
                                {String(cityHour).padStart(2, "0")}:00
                              </span>
                              <span className="text-[10px] sm:text-xs text-muted-foreground">{city.name}</span>
                              {index < Math.min(selectedCities.length - 1, 3) && (
                                <ArrowRight className="w-2 h-2 sm:w-3 sm:h-3 text-muted-foreground mx-0.5 sm:mx-1" />
                              )}
                            </div>
                          )
                        })}
                      </div>
                      <span className="text-[10px] sm:text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded-lg self-start sm:self-center">
                        Good
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <Calendar className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-xs sm:text-sm">No overlapping business hours found</p>
                  <p className="text-[10px] sm:text-xs">Try removing cities with extreme time differences</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Right Sidebar - Map Preview & Quick Add (Mobile Drawer) */}
      <aside className={cn(
        "fixed inset-y-0 right-0 z-40 w-80 bg-card border-l border-border p-4 flex flex-col transition-transform duration-300 lg:relative lg:translate-x-0",
        isRightSidebarOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <span className="font-semibold text-foreground">World Map</span>
          <button onClick={() => setIsRightSidebarOpen(false)} className="p-2 rounded-xl hover:bg-secondary">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="flex items-center justify-between mb-4 hidden lg:flex">
          <span className="font-semibold text-foreground">World Map</span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span>{CITIES.length} cities</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-chart-3/5 to-chart-3/10 rounded-2xl p-4 mb-6 aspect-video relative overflow-hidden">
          <svg viewBox="0 0 200 100" className="w-full h-full opacity-30">
            <ellipse cx="100" cy="50" rx="95" ry="45" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-chart-3" />
            <ellipse cx="100" cy="50" rx="95" ry="45" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-chart-3" transform="rotate(30 100 50)" />
            <ellipse cx="100" cy="50" rx="95" ry="45" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-chart-3" transform="rotate(60 100 50)" />
            <line x1="5" y1="50" x2="195" y2="50" stroke="currentColor" strokeWidth="0.5" className="text-chart-3" />
          </svg>
          
          {selectedCities.map((city, idx) => {
            const x = ((city.lng + 180) / 360) * 100
            const y = ((90 - city.lat) / 180) * 100
            return (
              <div
                key={city.id}
                className={cn(
                  "absolute w-2 h-2 sm:w-3 sm:h-3 rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2",
                  idx === 0 ? "bg-chart-3" : "bg-chart-4"
                )}
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] sm:text-xs font-medium text-foreground bg-card px-1.5 sm:px-2 py-0.5 rounded shadow-sm">
                  {city.name}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mb-4">
          <span className="text-sm font-medium text-foreground mb-2 block">Coverage by Region</span>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(citiesByRegion).slice(0, 6).map(([region, cities]) => (
              <div key={region} className="p-2 rounded-lg bg-secondary/50">
                <p className="text-xs font-medium text-foreground truncate">{region}</p>
                <p className="text-xs text-muted-foreground">{cities.length} cities</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">Quick Add</span>
            <span className="text-xs text-muted-foreground">Popular</span>
          </div>
          <div className="grid grid-cols-2 gap-2 overflow-y-auto flex-1 pr-1">
            {CITIES.filter((c) => !selectedCities.find((sc) => sc.id === c.id))
              .slice(0, 8)
              .map((city) => (
                <button
                  key={city.id}
                  onClick={() => addCity(city)}
                  disabled={selectedCities.length >= 6}
                  className="p-2 sm:p-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <p className="text-xs sm:text-sm font-medium text-foreground truncate">{city.name}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground tabular-nums">{getTimeInTimezone(city.timezone)}</p>
                </button>
              ))}
          </div>
        </div>
      </aside>

      {/* Mobile overlay for right sidebar */}
      {isRightSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsRightSidebarOpen(false)} />
      )}

      {/* City Picker Modal */}
      {showCityPicker && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-4 sm:p-6 border-b border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-foreground">Add City</h3>
                <button
                  onClick={() => {
                    setShowCityPicker(false)
                    setSearchQuery("")
                    setSelectedRegion("All")
                  }}
                  className="p-2 rounded-xl hover:bg-secondary transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
              
              <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search 130+ cities worldwide..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 rounded-xl bg-secondary border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-chart-3 text-sm sm:text-base"
                  autoFocus
                />
              </div>

              <div className="flex gap-2 flex-wrap">
                {REGIONS.map((region) => (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className={cn(
                      "px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors",
                      selectedRegion === region
                        ? "bg-chart-3 text-white"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 sm:p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {filteredCities.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => addCity(city)}
                    className="p-3 sm:p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-left group"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-foreground group-hover:text-chart-3 transition-colors text-sm sm:text-base">{city.name}</p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground">{city.country}</p>
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-muted-foreground tabular-nums">
                        {getTimeInTimezone(city.timezone)}
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-xs text-muted-foreground mt-1 inline-block">{city.region}</span>
                  </button>
                ))}
              </div>
              {filteredCities.length === 0 && (
                <div className="text-center py-8 sm:py-12 text-muted-foreground">
                  <Globe className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-3 opacity-30" />
                  <p className="font-medium text-sm sm:text-base">No cities found</p>
                  <p className="text-xs sm:text-sm">Try a different search term or region</p>
                </div>
              )}
            </div>

            <div className="p-3 sm:p-4 border-t border-border bg-secondary/30">
              <p className="text-[10px] sm:text-xs text-muted-foreground text-center">
                {filteredCities.length} cities available | Select up to 6 cities for comparison
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}