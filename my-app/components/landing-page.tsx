'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users, Calendar, BookOpen, LineChart, ListTodo, Cable, Clock, Award, Zap, Pin, LightbulbIcon, Cog, Timer, Medal, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import useEmblaCarousel from 'embla-carousel-react'
import dynamic from 'next/dynamic'

const FAQSection = dynamic(() => import('./faq-section'), { ssr: false })

interface FAQItem {
  id: string
  question: string
  answer: string
}

const features = [
  {
    id: "public-profile",
    title: "Public profile",
    icon: Users,
    preview: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner-shape-image-02-K6BgZcNfazcKPG1hDkCKLsEa49h3mV.png",
  },
  {
    id: "calendar",
    title: "Calendar",
    icon: Calendar,
    preview: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Pasted%20Graphic-OFWbUsn09IjUhcbkPFyqI0Unwp3ooU.png",
  },
  {
    id: "bookings",
    title: "Bookings",
    icon: BookOpen,
    preview: "/placeholder.svg?height=600&width=1000",
  },
  {
    id: "analytics",
    title: "Analytics",
    icon: LineChart,
    preview: "/placeholder.svg?height=600&width=1000",
  },
  {
    id: "task-management",
    title: "Task management",
    icon: ListTodo,
    preview: "/placeholder.svg?height=600&width=1000",
  },
  {
    id: "integration",
    title: "Integration",
    icon: Cable,
    preview: "/placeholder.svg?height=600&width=1000",
  },
]

const tabContents: Record<string, { description: string }> = {
  "create": {
    description: "Spotlight your personal & professional brand , our <span style=\"color: black; font-weight: bold;\">Customizable Templates</span> allow you to create a striking profile that reflects your brand's personality and style."
  },
  "showcase": {
    description: "Showcase <span style=\"color: black; font-weight: bold;\">your services</span>, availability, and testimonials on your dedicated landing page, acting as your marketing best friend."
  },
  "personalize": {
    description: "Enjoy the ease of building your free landing page and add the cherry on top by <span style=\"color: black; font-weight: bold;\">personalizing your profile URL</span>. Impress your clients. Bee Unique."
  }
}

const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

const TickIcon = ({ isPopular }: { isPopular?: boolean }) => (
  <div className={`w-6 h-6 rounded-full ${isPopular ? 'bg-yellow-400/20' : 'bg-gray-200'} flex items-center justify-center flex-shrink-0`}>
    <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M1 4L4.5 7.5L11 1" 
        stroke={isPopular ? "#F59E0B" : "#1A1A1A"} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  </div>
)

interface PlanProps {
  name: string;
  price: number | string;
  yearlyPrice: number | string;
  features: string[];
  isPopular?: boolean;
  isEnterprise?: boolean;
  className?: string;
}

const PricingCard = ({ name, price, yearlyPrice, features, isPopular, isEnterprise, className = "" }: PlanProps) => {
  const [isMonthly, setIsMonthly] = useState(true)
  
  return (
    <div className={`relative flex flex-col justify-between items-start p-8 w-[391px] h-[650px] rounded-3xl transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg ${
      isPopular ? 'bg-[#4a5ced] text-white' : 'bg-white border-2 border-[#EDEDED]'
    } ${className}`}>
      {isPopular && (
        <div className="absolute top-6 right-6 bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-medium">
          Popular
        </div>
      )}
      <div className="flex flex-col items-start gap-8">
        <h2 className={`text-4xl font-semibold ${isPopular ? 'text-white' : 'text-[#1A1A1A]'}`}>{name}</h2>
        <div className="flex items-end gap-3">
          {isEnterprise ? (
            <span className="text-4xl font-bold text-[#1A1A1A]">Contact us</span>
          ) : (
            <>
              <span className={`text-4xl font-bold ${isPopular ? 'text-white' : 'text-[#1A1A1A]'}`}>
                ${isMonthly ? price : yearlyPrice}
              </span>
              <span className={`text-xl ${isPopular ? 'text-white/90' : 'text-[#1A1A1A]'}`}>
                /month
              </span>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col items-start gap-5 w-full flex-grow">
        <ul className="space-y-5">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-4">
              <TickIcon isPopular={isPopular} />
              <span className={`text-xl font-medium ${isPopular ? 'text-white' : 'text-[#1A1A1A]'}`}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3 w-full mt-4">
          <Plus className={`w-6 h-6 ${isPopular ? 'text-white' : 'text-[#1A1A1A]'}`} />
          <span className={`text-xl underline ${isPopular ? 'text-white' : 'text-[#1A1A1A]'}`}>
            15 more
          </span>
        </div>
      </div>

      <div className="w-full mt-auto pt-8">
        <button 
          className={`w-full py-4 px-7 text-xl font-semibold rounded-full transition-colors duration-300 
            ${isPopular 
              ? 'bg-white text-[#4a5ced] border-2 border-white hover:bg-transparent hover:text-white' 
              : isEnterprise 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'text-[#4a5ced] bg-white border border-[#4a5ced] hover:bg-[#4a5ced] hover:text-white'
            }`}
          disabled={isEnterprise}
        >
          {isEnterprise ? 'Coming Soon' : 'Choose'}
        </button>
      </div>
    </div>
  )
}

interface Testimonial {
  content: string
  author: string
  role: string
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    content: "An amazing mentor! Vassilena really took the time to research our brand beforehand and give us more An amazing mentor! Vassilena really took the time to research our brand beforehand and give us more",
    author: "Sara S",
    role: "Founder of Awesomeux Technology",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/T055L196VDF-U07NTR07VQC-e14476afbac0-512-JLgcDy8rbOqM5XxBLnes0atDBDeoZ4.png"
  },
  {
    content: "The team went above and beyond our expectations. Their attention to detail and commitment to excellence is unmatched.",
    author: "Sarah Johnson",
    role: "CEO of Digital Innovations",
    avatar: "/placeholder.svg?height=80&width=80"
  },
  {
    content: "Working with them transformed our business. The results speak for themselves - our efficiency increased by 200%.",
    author: "Michael Chen",
    role: "Director of Operations",
    avatar: "/placeholder.svg?height=80&width=80"
  }
]

export function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState("public-profile")
  const [activeBrandingTab, setActiveBrandingTab] = useState("create")
  const [activeAnalyticsTab, setActiveAnalyticsTab] = useState("monitor")
  const [isMonthly, setIsMonthly] = useState(true)
  const [emblaRef, emblaApi] = useEmblaCarousel()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [activeCalendarTab, setActiveCalendarTab] = useState("connect")
  const [activeTaskTab, setActiveTaskTab] = useState("prioritize")
  const [activeBookingTab, setActiveBookingTab] = useState("setup")
  const [openId, setOpenId] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        setSelectedIndex(emblaApi.selectedScrollSnap())
      })
    }
  }, [emblaApi])

  const baseFeatures = [
    "Basic Calendar",
    "Basic Booking",
    "Basic Profile Page",
    "Basic Analytics",
    "Chat Support"
  ]

  const proFeatures = [
    "Everything on basic plan",
    "Unlimited Booking with Payment Availability",
    "Connect your Domain",
    "Advanced Analytics",
    "AI Rescheduling",
    "Reminder"
  ]

  const enterpriseFeatures = [
    "Everything on basic plan",
    "Company Profile Page",
    "Client Booking Calls",
    "Security Compliance"
  ]

  const faqs: FAQItem[] = [
    {
      id: '01',
      question: 'Our current email open rate and how can we improve our email marketing strategy.',
      answer: 'Our email marketing strategy has shown consistent improvement with current open rates averaging above industry standards. We continuously optimize subject lines, personalization, and sending times while maintaining high-quality, relevant content to engage our subscribers effectively.',
    },
    {
      id: '02',
      question: "Improving our website's user experience to increase conversions.",
      answer: 'We focus on streamlining the user journey, optimizing page load times, and implementing clear calls-to-action. Regular A/B testing and user feedback help us make data-driven improvements to enhance conversion rates.',
    },
    {
      id: '03',
      question: 'The most popular products or services we offer and how do they contribute to our revenue.',
      answer: 'Our premium subscription plans and enterprise solutions consistently drive the majority of our revenue. We continuously analyze usage patterns and customer feedback to enhance these offerings and maintain their market leadership.',
    },
    {
      id: '04',
      question: 'The most common reasons why customers contact our customer support team and how can we improve.',
      answer: 'Common support inquiries often relate to account setup and advanced feature usage. We\'re continuously expanding our self-service resources and improving product documentation to enhance the user experience and reduce support needs.',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Navigation */}
      <header className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-6xl transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}>
        <div className="rounded-full border bg-white/50 backdrop-blur-md px-4 py-2">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DailybeeLogo-semFm3AgNrzbtABSJmBN4KyqiJEERD.png"
                alt="Dailybee Logo"
                width={120}
                height={30}
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden md:flex items-center space-x-6">
              {["Features", "Pricing", "How it works", "FAQ"].map((item) => (
                item === "Features" ? (
                  <Link
                    key="Features"
                    href="#features"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('customizable-profile');
                    }}
                    className="text-sm relative group"
                  >
                    <span className="relative z-10 transition-colors duration-200 text-[#b6d8f1] group-hover:text-[#4a5ced] group-focus:text-[#4a5ced] group-focus:font-bold">
                      Features
                    </span>
                    <span className="absolute inset-0 -top-1 -bottom-1 bg-[#4a5ced] opacity-0 group-hover:opacity-5 rounded-full transition-all duration-200 transform scale-x-0 group-hover:scale-x-100" />
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ffc74b] transform scale-x-0 transition-transform duration-200 group-focus:scale-x-100" />
                  </Link>
                ) : (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm relative group"
                  >
                    <span className="relative z-10 transition-colors duration-200 text-[#b6d8f1] group-hover:text-[#4a5ced] group-focus:text-[#4a5ced] group-focus:font-bold">
                      {item}
                    </span>
                    <span className="absolute inset-0 -top-1 -bottom-1 bg-[#4a5ced] opacity-0 group-hover:opacity-5 rounded-full transition-all duration-200 transform scale-x-0 group-hover:scale-x-100" />
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ffc74b] transform scale-x-0 transition-transform duration-200 group-focus:scale-x-100" />
                  </Link>
                )
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" className="text-sm">Login</Button>
              <Button className="bg-[#4a5ced] hover:bg-[#4a5ced]/90 text-white rounded-full px-4 py-2 swish-button">Get Started</Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            AI For{" "}
            <span className="text-[#4a5ced]">Scheduling</span>,{" "}
            <span className="text-[#ffc74b]">Branding</span> &{" "}
            <span className="text-[#4a5ced]">Growth</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            All-In-One AI Calendar To Manage & Grow Day By Day For YOU
          </p>
          <div className="relative inline-block">
            <div className="absolute -top-3 -right-3 bg-[#ffc74b] text-black text-xs font-bold px-2 py-1 rounded-lg transform rotate-12 shadow-md">
              FREE
            </div>
            <Button className="bg-[#4a5ced] hover:bg-white hover:text-[#4a5ced] hover:border-[#4a5ced] hover:border-2 text-white text-lg px-4 py-2 h-auto transition-all rounded-full swish-button">
              Dive In Today
            </Button>
          </div>
          {/* Dashboard Preview */}
          <div className="mt-16 flex justify-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Pasted%20Graphic-SjI62O5WJjD9qipn4XYmyZFzG93vS1.png"
              alt="Dailybee Dashboard Interface showing calendar view and upcoming meetings"
              width={1000}
              height={600}
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4" id="features">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-16">
            Unlock Your Door To{" "}
            <span className="text-[#4a5ced]">Effortless</span> Scheduling with
            Dailybee!
          </h2>

          {/* Feature Tabs */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {features.map((feature) => {
              const isActive = activeTab === feature.id
              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveTab(feature.id)}
                  className={cn(
                    "group flex flex-col items-center focus:outline-none focus:ring-2 focus:ring-[#4a5ced] focus:ring-offset-2 rounded-lg p-2",
                    "transition-all duration-300 ease-in-out transform hover:-translate-y-2"
                  )}
                  aria-selected={isActive}
                  role="tab"
                >
                  <div className="relative transition-all duration-300 ease-in-out group-hover:-translate-y-1">
                    <feature.icon
                      className={cn(
                        "w-12 h-12 mb-2 transition-colors",
                        isActive ? "text-[#4a5ced]" : "text-gray-400 group-hover:text-[#4a5ced]"
                      )}
                    />
                  </div>
                  <span
                    className={cn(
                      "text-sm font-medium transition-colors",
                      isActive ? "text-[#4a5ced]" : "text-gray-600 group-hover:text-[#4a5ced]",
                      "transition-all duration-300 ease-in-out group-hover:-translate-y-1"
                    )}
                  >
                    {feature.title}
                  </span>
                  {/* Yellow underline for active tab */}
                  <div
                    className={cn(
                      "h-0.5 w-full mt-2 transition-all",
                      isActive ? "bg-[#ffc74b]" : "bg-transparent group-hover:bg-[#ffc74b]"
                    )}
                  />
                </button>
              )
            })}
          </div>

          {/* Preview Area */}
          <div className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-white">
            {features.map((feature) => (
              <div
                key={feature.id}
                className={cn(
                  "transition-opacity duration-300",
                  activeTab === feature.id ? "opacity-100" : "opacity-0 hidden"
                )}
                role="tabpanel"
                aria-labelledby={feature.id}
              >
                <Image
                  src={feature.preview}
                  alt={`${feature.title} interface preview`}
                  width={1000}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Productivity Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Boost Your <span className="text-[#4a5ced]">Productivity</span>.
          </h2>
          <h2 className="text-4xl font-bold mb-8">
            Promote Your Professional Presence.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16">
            From personal branded profile page, personalized booking link, the most intuitive calendar view
            to AI Scheduling assistant, Dailybee has it ALL.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Card 1 */}
            <div className="bg-white rounded-xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,199,75,0.3)] border group">
              <div className="flex justify-center mb-6">
                <Pin className="w-12 h-12 text-[#4a5ced] transition-all duration-300 group-hover:text-[#ffc74b] group-hover:rotate-45" />
              </div>
              <h3 className="text-xl font-bold mb-4">Dailybee Will Be Your Pinned Tab</h3>
              <p className="text-gray-600">
                Dailybee integrates <span className="font-medium">all the functionalities</span> you need{" "}
                <span className="font-medium">into one platform</span>, so you can manage your time, 
                your productivity, and your brand growth.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,199,75,0.3)] border group">
              <div className="flex justify-center mb-6">
                <Calendar className="w-12 h-12 text-[#4a5ced] transition-all duration-300 group-hover:text-[#ffc74b] group-hover:rotate-45" />
              </div>
              <h3 className="text-xl font-bold mb-4">It's Not Only About Your Meetings</h3>
              <p className="text-gray-600">
                Create  and manage various <span className="font-medium">event types</span>, like appointments, 
                tasks, and special  events, all in one place. Your DailyBee account will be your  whole work identity.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,199,75,0.3)] border group">
              <div className="flex justify-center mb-6">
                <LightbulbIcon className="w-12 h-12 text-[#4a5ced] transition-all duration-300 group-hover:text-[#ffc74b] group-hover:rotate-45" />
              </div>
              <h3 className="text-xl font-bold mb-4">Be As Fast as AI, But Smarter</h3>
              <p className="text-gray-600">
                Next Tuesday is No-Meeting Day? Set it and forget it. Dailybee will auto-schedule your pre-booked 
                events to the next appropriate slot using the <span className="font-medium">AI scheduling</span> assistant.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,199,75,0.3)] border group">
              <div className="flex justify-center mb-6">
                <Cog className="w-12 h-12 text-[#4a5ced] transition-all duration-300 group-hover:text-[#ffc74b] group-hover:rotate-45" />
              </div>
              <h3 className="text-xl font-bold mb-4">Automate Your Bookings</h3>
              <p className="text-gray-600">
                Eliminate the pain of back-and-forth of scheduling meetings, by sharing your{" "}
                <span className="font-medium">unique booking link</span> and availability with your clients and teams.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-white rounded-xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,199,75,0.3)] border group">
              <div className="flex justify-center mb-6">
                <Timer className="w-12 h-12 text-[#4a5ced] transition-all duration-300 group-hover:text-[#ffc74b] group-hover:rotate-45" />
              </div>
              <h3 className="text-xl font-bold mb-4">Value Your Time</h3>
              <p className="text-gray-600">
                Book your meetings flexibly with built-in personalized booking times and controls 
                so you can smoothly fill your calendar with awesome meeting etiquette.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-white rounded-xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,199,75,0.3)] border group">
              <div className="flex justify-center mb-6">
                <Medal className="w-12 h-12 text-[#4a5ced] transition-all duration-300 group-hover:text-[#ffc74b] group-hover:rotate-45" />
              </div>
              <h3 className="text-xl font-bold mb-4">Brand Yourself Like An Expert</h3>
              <p className="text-gray-600">
                Showcase your services and availability with a professional,{" "}
                <span className="font-medium">customizable profile page</span> tailored to your brand. 
                It's like building your own free landing page.
              </p>
            </div>
          </div>

          <Button className="bg-[#4a5ced] hover:bg-[#4a5ced]/90 text-white text-lg px-6 py-3 h-auto rounded-full swish-button">
            Bee A Do-er Today!
          </Button>
        </div>
      </section>

      {/* Customizable Profile Page Section */}
      <section className="py-24 px-4" id="customizable-profile">
        <div className="container mx-auto text-center">
          <div className="space-y-8 max-w-4xl mx-auto">
            <p className="text-[#4a5ced] font-medium">Customizable Profile Page</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Put The{" "}
              <span className="text-[#4a5ced]">Spotlight</span>{" "}
              On Your{" "}
              <span className="text-[#ffc74b]">Brand</span>!
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The most intuitive landing page builder, easily position yourself with customizable templates,
              personalised profile URL and audience engagement.
            </p>
            <div>
              <Button 
                className="bg-[#4a5ced] hover:bg-[#4a5ced]/90 text-white text-lg px-6 py-3 h-auto rounded-full swish-button"
              >
                Claim Your Profile Today!
              </Button>
            </div>
            <div className="mt-16">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SARA-3-fHXC24P0p2WsAZBsSadrIVcWN2SePB.gif"
                alt="Profile page builder interface demonstration"
                width={1200}
                height={600}
                className="rounded-lg shadow-2xl mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Branding Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <p className="text-[#4a5ced] font<Thinking>



The large text attachment appears to be a complex React component for a landing page. It includes various sections such as a hero, features, productivity, customizable profile, branding, analytics, calendar view, task management, bookings, testimonials, FAQ, pricing, and a footer. The component uses various UI elements like buttons, cards, carousels, and images. It also includes state management for different tabs and sections.

Given the nature of this content, the most appropriate code block type would be the React Component code block. This will allow for proper syntax highlighting and structure for the React code.



</Thinking>

To implement this landing page component, I'll use the React Component code block. Here's the implementation:

```tsx project="Dailybee Landing Page" file="landing-page.tsx" type="react"
'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users, Calendar, BookOpen, LineChart, ListTodo, Cable, Clock, Award, Zap, Pin, LightbulbIcon, Cog, Timer, Medal, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import useEmblaCarousel from 'embla-carousel-react'
import dynamic from 'next/dynamic'

const FAQSection = dynamic(() => import('./faq-section'), { ssr: false })

interface FAQItem {
  id: string
  question: string
  answer: string
}

const features = [
  {
    id: "public-profile",
    title: "Public profile",
    icon: Users,
    preview: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner-shape-image-02-K6BgZcNfazcKPG1hDkCKLsEa49h3mV.png",
  },
  {
    id: "calendar",
    title: "Calendar",
    icon: Calendar,
    preview: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Pasted%20Graphic-OFWbUsn09IjUhcbkPFyqI0Unwp3ooU.png",
  },
  {
    id: "bookings",
    title: "Bookings",
    icon: BookOpen,
    preview: "/placeholder.svg?height=600&width=1000",
  },
  {
    id: "analytics",
    title: "Analytics",
    icon: LineChart,
    preview: "/placeholder.svg?height=600&width=1000",
  },
  {
    id: "task-management",
    title: "Task management",
    icon: ListTodo,
    preview: "/placeholder.svg?height=600&width=1000",
  },
  {
    id: "integration",
    title: "Integration",
    icon: Cable,
    preview: "/placeholder.svg?height=600&width=1000",
  },
]

const tabContents: Record<string, { description: string }> = {
  "create": {
    description: "Spotlight your personal & professional brand , our <span style=\"color: black; font-weight: bold;\">Customizable Templates</span> allow you to create a striking profile that reflects your brand's personality and style."
  },
  "showcase": {
    description: "Showcase <span style=\"color: black; font-weight: bold;\">your services</span>, availability, and testimonials on your dedicated landing page, acting as your marketing best friend."
  },
  "personalize": {
    description: "Enjoy the ease of building your free landing page and add the cherry on top by <span style=\"color: black; font-weight: bold;\">personalizing your profile URL</span>. Impress your clients. Bee Unique."
  }
}

const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

const TickIcon = ({ isPopular }: { isPopular?: boolean }) => (
  <div className={`w-6 h-6 rounded-full ${isPopular ? 'bg-yellow-400/20' : 'bg-gray-200'} flex items-center justify-center flex-shrink-0`}>
    <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M1 4L4.5 7.5L11 1" 
        stroke={isPopular ? "#F59E0B" : "#1A1A1A"} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  </div>
)

interface PlanProps {
  name: string;
  price: number | string;
  yearlyPrice: number | string;
  features: string[];
  isPopular?: boolean;
  isEnterprise?: boolean;
  className?: string;
}

const PricingCard = ({ name, price, yearlyPrice, features, isPopular, isEnterprise, className = "" }: PlanProps) => {
  const [isMonthly, setIsMonthly] = useState(true)
  
  return (
    <div className={`relative flex flex-col justify-between items-start p-8 w-[391px] h-[650px] rounded-3xl transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg ${
      isPopular ? 'bg-[#4a5ced] text-white' : 'bg-white border-2 border-[#EDEDED]'
    } ${className}`}>
      {isPopular && (
        <div className="absolute top-6 right-6 bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-medium">
          Popular
        </div>
      )}
      <div className="flex flex-col items-start gap-8">
        <h2 className={`text-4xl font-semibold ${isPopular ? 'text-white' : 'text-[#1A1A1A]'}`}>{name}</h2>
        <div className="flex items-end gap-3">
          {isEnterprise ? (
            <span className="text-4xl font-bold text-[#1A1A1A]">Contact us</span>
          ) : (
            <>
              <span className={`text-4xl font-bold ${isPopular ? 'text-white' : 'text-[#1A1A1A]'}`}>
                ${isMonthly ? price : yearlyPrice}
              </span>
              <span className={`text-xl ${isPopular ? 'text-white/90' : 'text-[#1A1A1A]'}`}>
                /month
              </span>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col items-start gap-5 w-full flex-grow">
        <ul className="space-y-5">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-4">
              <TickIcon isPopular={isPopular} />
              <span className={`text-xl font-medium ${isPopular ? 'text-white' : 'text-[#1A1A1A]'}`}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3 w-full mt-4">
          <Plus className={`w-6 h-6 ${isPopular ? 'text-white' : 'text-[#1A1A1A]'}`} />
          <span className={`text-xl underline ${isPopular ? 'text-white' : 'text-[#1A1A1A]'}`}>
            15 more
          </span>
        </div>
      </div>

      <div className="w-full mt-auto pt-8">
        <button 
          className={`w-full py-4 px-7 text-xl font-semibold rounded-full transition-colors duration-300 
            ${isPopular 
              ? 'bg-white text-[#4a5ced] border-2 border-white hover:bg-transparent hover:text-white' 
              : isEnterprise 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'text-[#4a5ced] bg-white border border-[#4a5ced] hover:bg-[#4a5ced] hover:text-white'
            }`}
          disabled={isEnterprise}
        >
          {isEnterprise ? 'Coming Soon' : 'Choose'}
        </button>
      </div>
    </div>
  )
}

interface Testimonial {
  content: string
  author: string
  role: string
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    content: "An amazing mentor! Vassilena really took the time to research our brand beforehand and give us more An amazing mentor! Vassilena really took the time to research our brand beforehand and give us more",
    author: "Sara S",
    role: "Founder of Awesomeux Technology",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/T055L196VDF-U07NTR07VQC-e14476afbac0-512-JLgcDy8rbOqM5XxBLnes0atDBDeoZ4.png"
  },
  {
    content: "The team went above and beyond our expectations. Their attention to detail and commitment to excellence is unmatched.",
    author: "Sarah Johnson",
    role: "CEO of Digital Innovations",
    avatar: "/placeholder.svg?height=80&width=80"
  },
  {
    content: "Working with them transformed our business. The results speak for themselves - our efficiency increased by 200%.",
    author: "Michael Chen",
    role: "Director of Operations",
    avatar: "/placeholder.svg?height=80&width=80"
  }
]

export default function Component() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState("public-profile")
  const [activeBrandingTab, setActiveBrandingTab] = useState("create")
  const [activeAnalyticsTab, setActiveAnalyticsTab] = useState("monitor")
  const [isMonthly, setIsMonthly] = useState(true)
  const [emblaRef, emblaApi] = useEmblaCarousel()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [activeCalendarTab, setActiveCalendarTab] = useState("connect")
  const [activeTaskTab, setActiveTaskTab] = useState("prioritize")
  const [activeBookingTab, setActiveBookingTab] = useState("setup")
  const [openId, setOpenId] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        setSelectedIndex(emblaApi.selectedScrollSnap())
      })
    }
  }, [emblaApi])

  const baseFeatures = [
    "Basic Calendar",
    "Basic Booking",
    "Basic Profile Page",
    "Basic Analytics",
    "Chat Support"
  ]

  const proFeatures = [
    "Everything on basic plan",
    "Unlimited Booking with Payment Availability",
    "Connect your Domain",
    "Advanced Analytics",
    "AI Rescheduling",
    "Reminder"
  ]

  const enterpriseFeatures = [
    "Everything on basic plan",
    "Company Profile Page",
    "Client Booking Calls",
    "Security Compliance"
  ]

  const faqs: FAQItem[] = [
    {
      id: '01',
      question: 'Our current email open rate and how can we improve our email marketing strategy.',
      answer: 'Our email marketing strategy has shown consistent improvement with current open rates averaging above industry standards. We continuously optimize subject lines, personalization, and sending times while maintaining high-quality, relevant content to engage our subscribers effectively.',
    },
    {
      id: '02',
      question: "Improving our website's user experience to increase conversions.",
      answer: 'We focus on streamlining the user journey, optimizing page load times, and implementing clear calls-to-action. Regular A/B testing and user feedback help us make data-driven improvements to enhance conversion rates.',
    },
    {
      id: '03',
      question: 'The most popular products or services we offer and how do they contribute to our revenue.',
      answer: 'Our premium subscription plans and enterprise solutions consistently drive the majority of our revenue. We continuously analyze usage patterns and customer feedback to enhance these offerings and maintain their market leadership.',
    },
    {
      id: '04',
      question: 'The most common reasons why customers contact our customer support team and how can we improve.',
      answer: 'Common support inquiries often relate to account setup and advanced feature usage. We\'re continuously expanding our self-service resources and improving product documentation to enhance the user experience and reduce support needs.',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Navigation */}
      <header className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-6xl transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}>
        <div className="rounded-full border bg-white/50 backdrop-blur-md px-4 py-2">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DailybeeLogo-semFm3AgNrzbtABSJmBN4KyqiJEERD.png"
                alt="Dailybee Logo"
                width={120}
                height={30}
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden md:flex items-center space-x-6">
              {["Features", "Pricing", "How it works", "FAQ"].map((item) => (
                item === "Features" ? (
                  <Link
                    key="Features"
                    href="#features"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('customizable-profile');
                    }}
                    className="text-sm relative group"
                  >
                    <span className="relative z-10 transition-colors duration-200 text-[#b6d8f1] group-hover:text-[#4a5ced] group-focus:text-[#4a5ced] group-focus:font-bold">
                      Features
                    </span>
                    <span className="absolute inset-0 -top-1 -bottom-1 bg-[#4a5ced] opacity-0 group-hover:opacity-5 rounded-full transition-all duration-200 transform scale-x-0 group-hover:scale-x-100" />
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ffc74b] transform scale-x-0 transition-transform duration-200 group-focus:scale-x-100" />
                  </Link>
                ) : (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm relative group"
                  >
                    <span className="relative z-10 transition-colors duration-200 text-[#b6d8f1] group-hover:text-[#4a5ced] group-focus:text-[#4a5ced] group-focus:font-bold">
                      {item}
                    </span>
                    <span className="absolute inset-0 -top-1 -bottom-1 bg-[#4a5ced] opacity-0 group-hover:opacity-5 rounded-full transition-all duration-200 transform scale-x-0 group-hover:scale-x-100" />
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ffc74b] transform scale-x-0 transition-transform duration-200 group-focus:scale-x-100" />
                  </Link>
                )
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" className="text-sm">Login</Button>
              <Button className="bg-[#4a5ced] hover:bg-[#4a5ced]/90 text-white rounded-full px-4 py-2 swish-button">Get Started</Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            AI For{" "}
            <span className="text-[#4a5ced]">Scheduling</span>,{" "}
            <span className="text-[#ffc74b]">Branding</span> &{" "}
            <span className="text-[#4a5ced]">Growth</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            All-In-One AI Calendar To Manage & Grow Day By Day For YOU
          </p>
          <div className="relative inline-block">
            <div className="absolute -top-3 -right-3 bg-[#ffc74b] text-black text-xs font-bold px-2 py-1 rounded-lg transform rotate-12 shadow-md">
              FREE
            </div>
            <Button className="bg-[#4a5ced] hover:bg-white hover:text-[#4a5ced] hover:border-[#4a5ced] hover:border-2 text-white text-lg px-4 py-2 h-auto transition-all rounded-full swish-button">
              Dive In Today
            </Button>
          </div>
          {/* Dashboard Preview */}
          <div className="mt-16 flex justify-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Pasted%20Graphic-SjI62O5WJjD9qipn4XYmyZFzG93vS1.png"
              alt="Dailybee Dashboard Interface showing calendar view and upcoming meetings"
              width={1000}
              height={600}
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4" id="features">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-16">
            Unlock Your Door To{" "}
            <span className="text-[#4a5ced]">Effortless</span> Scheduling with
            Dailybee!
          </h2>

          {/* Feature Tabs */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {features.map((feature) => {
              const isActive = activeTab === feature.id
              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveTab(feature.id)}
                  className={cn(
                    "group flex flex-col items-center focus:outline-none focus:ring-2 focus:ring-[#4a5ced] focus:ring-offset-2 rounded-lg p-2",
                    "transition-all duration-300 ease-in-out transform hover:-translate-y-2"
                  )}
                  aria-selected={isActive}
                  role="tab"
                >
                  <div className="relative transition-all duration-300 ease-in-out group-hover:-translate-y-1">
                    <feature.icon
                      className={cn(
                        "w-12 h-12 mb-2 transition-colors",
                        isActive ? "text-[#4a5ced]" : "text-gray-400 group-hover:text-[#4a5ced]"
                      )}
                    />
                  </div>
                  <span
                    className={cn(
                      "text-sm font-medium transition-colors",
                      isActive ? "text-[#4a5ced]" : "text-gray-600 group-hover:text-[#4a5ced]",
                      "transition-all duration-300 ease-in-out group-hover:-translate-y-1"
                    )}
                  >
                    {feature.title}
                  </span>
                  {/* Yellow underline for active tab */}
                  <div
                    className={cn(
                      "h-0.5 w-full mt-2 transition-all",
                      isActive ? "bg-[#ffc74b]" : "bg-transparent group-hover:bg-[#ffc74b]"
                    )}
                  />
                </button>
              )
            })}
          </div>

          {/* Preview Area */}
          <div className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-white">
            {features.map((feature) => (
              <div
                key={feature.id}
                className={cn(
                  "transition-opacity duration-300",
                  activeTab === feature.id ? "opacity-100" : "opacity-0 hidden"
                )}
                role="tabpanel"
                aria-labelledby={feature.id}
              >
                <Image
                  src={feature.preview}
                  alt={`${feature.title} interface preview`}
                  width={1000}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Productivity Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Boost Your <span className="text-[#4a5ced]">Productivity</span>.
          </h2>
          <h2 className="text-4xl font-bold mb-8">
            Promote Your Professional Presence.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16">
            From personal branded profile page, personalized booking link, the most intuitive calendar view
            to AI Scheduling assistant, Dailybee has it ALL.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Card 1 */}
            <div className="bg-white rounded-xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,199,75,0.3)] border group">
              <div className="flex justify-center mb-6">
                <Pin className="w-12 h-12 text-[#4a5ced] transition-all duration-300 group-hover:text-[#ffc74b] group-hover:rotate-45" />
              </div>
              <h3 className="text-xl font-bold mb-4">Dailybee Will Be Your Pinned Tab</h3>
              <p className="text-gray-600">
                Dailybee integrates <span className="font-medium">all the functionalities</span> you need{" "}
                <span className="font-medium">into one platform</span>, so you can manage your time, 
                your productivity, and your brand growth.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,199,75,0.3)] border group">
              <div className="flex justify-center mb-6">
                <Calendar className="w-12 h-12 text-[#4a5ced] transition-all duration-300 group-hover:text-[#ffc74b] group-hover:rotate-45" />
              </div>
              <h3 className="text-xl font-bold mb-4">It's Not Only About Your Meetings</h3>
              <p className="text-gray-600">
                Create  and manage various <span className="font-medium">event types</span>, like appointments, 
                tasks, and special  events, all in one place. Your DailyBee account will be your  whole work identity.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,199,75,0.3)] border group">
              <div className="flex justify-center mb-6">
                <LightbulbIcon className="w-12 h-12 text-[#4a5ced] transition-all duration-300 group-hover:text-[#ffc74b] group-hover:rotate-45" />
              </div>
              <h3 className="text-xl font-bold mb-4">Be As Fast as AI, But Smarter</h3>
              <p className="text-gray-600">
                Next Tuesday is No-Meeting Day? Set it and forget it. Dailybee will auto-schedule your pre-booked 
                events to the next appropriate slot using the <span className="font-medium">AI scheduling</span> assistant.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,199,75,0.3)] border group">
              <div className="flex justify-center mb-6">
                <Cog className="w-12 h-12 text-[#4a5ced] transition-all duration-300 group-hover:text-[#ffc74b] group-hover:rotate-45" />
              </div>
              <h3 className="text-xl font-bold mb-4">Automate Your Bookings</h3>
              <p className="text-gray-600">
                Eliminate the pain of back-and-forth of scheduling meetings, by sharing your{" "}
                <span className="font-medium">unique booking link</span> and availability with your clients and teams.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-white rounded-xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,199,75,0.3)] border group">
              <div className="flex justify-center mb-6">
                <Timer className="w-12 h-12 text-[#4a5ced] transition-all duration-300 group-hover:text-[#ffc74b] group-hover:rotate-45" />
              </div>
              <h3 className="text-xl font-bold mb-4">Value Your Time</h3>
              <p className="text-gray-600">
                Book your meetings flexibly with built-in personalized booking times and controls 
                so you can smoothly fill your calendar with awesome meeting etiquette.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-white rounded-xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,199,75,0.3)] border group">
              <div className="flex justify-center mb-6">
                <Medal className="w-12 h-12 text-[#4a5ced] transition-all duration-300 group-hover:text-[#ffc74b] group-hover:rotate-45" />
              </div>
              <h3 className="text-xl font-bold mb-4">Brand Yourself Like An Expert</h3>
              <p className="text-gray-600">
                Showcase your services and availability with a professional,{" "}
                <span className="font-medium">customizable profile page</span> tailored to your brand. 
                It's like building your own free landing page.
              </p>
            </div>
          </div>

          <Button className="bg-[#4a5ced] hover:bg-[#4a5ced]/90 text-white text-lg px-6 py-3 h-auto rounded-full swish-button">
            Bee A Do-er Today!
          </Button>
        </div>
      </section>

      {/* Customizable Profile Page Section */}
      <section className="py-24 px-4" id="customizable-profile">
        <div className="container mx-auto text-center">
          <div className="space-y-8 max-w-4xl mx-auto">
            <p className="text-[#4a5ced] font-medium">Customizable Profile Page</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Put The{" "}
              <span className="text-[#4a5ced]">Spotlight</span>{" "}
              On Your{" "}
              <span className="text-[#ffc74b]">Brand</span>!
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The most intuitive landing page builder, easily position yourself with customizable templates,
              personalised profile URL and audience engagement.
            </p>
            <div>
              <Button 
                className="bg-[#4a5ced] hover:bg-[#4a5ced]/90 text-white text-lg px-6 py-3 h-auto rounded-full swish-button"
              >
                Claim Your Profile Today!
              </Button>
            </div>
            <div className="mt-16">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SARA-3-fHXC24P0p2WsAZBsSadrIVcWN2SePB.gif"
                alt="Profile page builder interface demonstration"
                width={1200}
                height={600}
                className="rounded-lg shadow-2xl mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Branding Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <p className="text-[#4a5ced] font-medium">Customizable Profile Page</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Create Your Strong{" "}
                <span className="block">Personal Brand Presence</span>
              </h2>
              
              <div className="space-y-6 max-w-3xl">
                <div className="flex flex-nowrap justify-between gap-4 overflow-x-auto pb-2 md:pb-0">
                  {[
                    { id: "create", label: "Create Your Brand" },
                    { id: "showcase", label: "Showcase Your Uniqueness" },
                    { id: "personalize", label: "Personalize Your Profile URL" }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveBrandingTab(tab.id)}
                      className={`relative pb-2 transition-colors text-sm md:text-base whitespace-nowrap ${
                        activeBrandingTab === tab.id 
                          ? "text-[#4a5ced] font-bold" 
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {tab.label}
                      <span 
                        className={`absolute bottom-0 left-0 w-full h-0.5 transition-transform duration-300 ${
                          activeBrandingTab === tab.id 
                            ? "bg-[#4a5ced] scale-x-100" 
                            : "bg-transparent scale-x-0"
                        }`} 
                      />
                    </button>
                  ))}
                </div>
                
                <div className="flex flex-col justify-between h-[180px]">
                  <div className="transition-all duration-300">
                    <p 
                      className="text-gray-600 max-w-xl"
                      dangerouslySetInnerHTML={{ __html: tabContents[activeBrandingTab].description }}
                    />
                  </div>

                  <div className="mt-2">
                    <Button 
                      className="bg-[#4a5ced] text-white rounded-full px-8 py-3 h-auto text-lg hover:bg-[#4a5ced]/90"
                    >
                      Join Now For Free!
                    </Button>
                  </div>
                </div>

              </div>
            </div>

            <div className="relative w-full overflow-visible">
              <div className="absolute -right-16 -top-16 -bottom-16 -left-16 bg-[#fff5e5]/30 rounded-[3rem] -z-10 transform rotate-6" />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mYwkkkv7rtOrF9lhsCyWa9QJa6XI4t.png"
                width={400}
                height={300}
                alt="Dashboard analytics interface showing charts, statistics and progress bars"
                className="rounded-xl shadow-lg w-full max-w-[400px] h-auto object-contain ml-auto"
              />
              <div className="absolute -bottom-8 -right-16 left-0 h-32 bg-[#fff7e6] rounded-xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute -left-1/4 -bottom-1/4 w-3/4 h-[150%] bg-[#EEF4FF]/50 rounded-[100px] rotate-12 transform -z-10" />

        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            <div className="relative col-span-1">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RO10RpkE8Rgem89LypUdBzXK0D4gyV.png"
                width={400}
                height={300}
                alt="Analytics dashboard showing performance metrics and charts"
                className="rounded-xl shadow-lg w-full h-auto object-contain"
              />
            </div>

            <div className="space-y-8 col-span-2">
              <p className="text-[#4a5ced] font-medium">Analytics</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Growth Insights in one place
              </h2>

              <div className="space-y-6 max-w-3xl">
                <div className="flex flex-nowrap justify-start gap-6 overflow-x-auto pb-2 md:pb-0">
                  {[
                    { id: "monitor", label: "Monitor Your Activities" },
                    { id: "track", label: "Track Your Growth" },
                    { id: "feedback", label: "Get Client Feedback" }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveAnalyticsTab(tab.id)}
                      className={`relative pb-2 transition-colors text-sm md:text-base whitespace-nowrap ${
                        activeAnalyticsTab === tab.id 
                          ? "text-[#4a5ced] font-bold" 
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {tab.label}
                      <span 
                        className={`absolute bottom-0 left-0 w-full h-0.5 transition-transform duration-300 ${
                          activeAnalyticsTab === tab.id 
                            ? "bg-[#4a5ced] scale-x-100" 
                            : "bg-transparent scale-x-0"
                        }`} 
                      />
                    </button>
                  ))}
                </div>
                <div className="space-y-6 flex flex-col h-[200px]">
                  <div className="flex-grow">
                    {activeAnalyticsTab === "monitor" && (
                      <p className="text-gray-600 text-lg">
                        Access detailed <span className="font-bold">Performance Insights</span> to monitor and optimize your booking performance, so you can identify areas of improvement and become your own mentor.
                      </p>
                    )}
                    {activeAnalyticsTab === "track" && (
                      <p className="text-gray-600 text-lg">
                        Monitor your growing Dailybee wallet , Allow yourself to dig deep into <span className="font-bold">Revenue And Goal Tracking</span> and analyse which services are performing the best and causing the up-most profitability.
                      </p>
                    )}
                    {activeAnalyticsTab === "feedback" && (
                      <p className="text-gray-600 text-lg">
                        Access your client's feedback to highlight your successes and entice your new clients with <span className="font-bold">Client﻿ Testimonials</span>. Start building a portfolio for yourself today!
                      </p>
                    )}
                  </div>
                  <div>
                    <Button
                      className="bg-[#4a5ced] text-white rounded-full px-8 py-3 h-auto text-lg hover:bg-[#4a5ced]/90"
                    >
                      Your Time Starts Now!
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar View Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute -right-1/4 -top-1/4 w-3/4 h-[150%] bg-[#EEF4FF]/50 rounded-[100px] -rotate-12 transform -z-10" />

        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="space-y-8 lg:col-span-8">
              <p className="text-[#4a5ced] font-medium">Calendar View</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Challenge Yourself To{" "}
                <span className="block">Find A Better Calendar</span>
              </h2>

              <div className="flex flex-nowrap justify-start gap-6 overflow-x-auto pb-2 md:pb-0">
                {[
                  { id: "connect", label: "Connect your calendars" },
                  { id: "customize", label: "Customize your availability" },
                  { id: "ai", label: "Use AI as a personal assistant" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCalendarTab(tab.id)}
                    className={`relative pb-2 transition-colors text-sm md:text-base whitespace-nowrap ${
                      tab.id === activeCalendarTab ? "text-[#4a5ced] font-bold" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {tab.label}
                    <span 
                      className={`absolute bottom-0 left-0 w-full h-0.5 transition-transform duration-300 ${
                        tab.id === activeCalendarTab ? "bg-[#4a5ced] scale-x-100" : "bg-transparent scale-x-0"
                      }`} 
                    />
                  </button>
                ))}
              </div>

              <div className="space-y-6 flex flex-col h-[200px]">
                <div className="flex-grow">
                  <p className="text-gray-600 text-lg">
                    {activeCalendarTab === "connect" && (
                      <>Our <span className="font-bold">Integrated Calendar Connection</span> view allows you to sync seamlessly with Google, Outlook, and Apple calendars to keep all your appointments in one cohesive view. Say hi to the RIGHT way to be organized.</>
                    )}
                    {activeCalendarTab === "customize" && (
                      <>Have all the freedom in our <span className="font-bold">Custom Availability Settings</span> by setting your availability for different types of appointments, ensuring clients book ONLY when you're free.</>
                    )}
                    {activeCalendarTab === "ai" && (
                      <>You just hired your new personal assistant, our <span className="font-bold">AI Scheduling</span> assistant reschedules your appointments, tasks, and bookings when you are no longer available to the best next meeting.</>
                    )}
                  </p>
                </div>
                <div>
                  <Button className="bg-[#4a5ced] text-white rounded-full px-8 py-3 h-auto text-lg hover:bg-[#4a5ced]/90">
                    Get Started Today!
                  </Button>
                </div>
              </div>
            </div>

            <div className="relative lg:col-span-4">
              <div className="relative bg-white rounded-2xl shadow-xl p-2">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-uycsWo3ILJ9BLUO5rKl81Kiis3R3Lr.png"
                  alt="Calendar dashboard interface showing analytics and scheduling"
                  width={600}
                  height={400}
                  className="rounded-xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Task Management Section */}
      <section className="py-24 px-4 relative overflow-hidden bg-[#FFF5F5]/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="relative order-2 lg:order-1 lg:col-span-4">
              <div className="relative bg-white rounded-2xl shadow-xl p-2">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-uycsWo3ILJ9BLUO5rKl81Kiis3R3Lr.png"
                  alt="Task management dashboard showing productivity charts and task lists"
                  width={600}
                  height={400}
                  className="rounded-xl w-full h-auto"
                />
              </div>
            </div>

            <div className="space-y-8 order-1 lg:order-2 lg:col-span-8">
              <p className="text-[#4a5ced] font-medium">Task Management</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Be Ahead Of Your To-Do List
              </h2>

              <div className="flex flex-nowrap justify-start gap-6 overflow-x-auto pb-2 md:pb-0">
                {[
                  { id: "prioritize", label: "Prioritize your work" },
                  { id: "manage", label: "Manage your Tasks" },
                  { id: "deadline", label: "Never miss a deadline" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTaskTab(tab.id)}
                    className={`relative pb-2 transition-colors text-sm md:text-base whitespace-nowrap ${
                      tab.id === activeTaskTab ? "text-[#4a5ced] font-bold" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {tab.label}
                    <span 
                      className={`absolute bottom-0 left-0 w-full h-0.5 transition-transform duration-300 ${
                        tab.id === activeTaskTab ? "bg-[#4a5ced] scale-x-100" : "bg-transparent scale-x-0"
                      }`} 
                    />
                  </button>
                ))}
              </div>

              <div className="space-y-6 flex flex-col h-[200px]">
                <div className="flex-grow">
                  <p className="text-gray-600 text-lg">
                    {activeTaskTab === "prioritize" && (
                      <>Streamline and organize your tasks and productivity with our <span className="font-bold">Prioritization Filters</span>, ensuring your focus on what's most important first.</>
                    )}
                    {activeTaskTab === "manage" && (
                      <>Enjoy our intuitive <span className="font-bold">Board View</span>, which is visually enabling easy tracking of progress. With statuses like To-do, In-progress and complete, you will be able to not only track your tasks history, present and future.</>
                    )}
                    {activeTaskTab === "deadline" && (
                      <>Stop freaking out 5 minutes before the meetings. Ensure proper <span className="font-bold">Due Date Tracking</span> with notifications that will guarantee you never miss a deadline.</>
                    )}
                  </p>
                </div>
                <div>
                  <Button className="bg-[#4a5ced] text-white rounded-full px-8 py-3 h-auto text-lg hover:bg-[#4a5ced]/90"><Thinking>



The large text attachment appears to be a complex React component for a landing page. It includes various sections such as a hero, features, productivity, customizable profile, branding, analytics, calendar view, task management, bookings, testimonials, FAQ, pricing, and a footer. The component uses various UI elements like buttons, cards, carousels, and images. It also includes state management for different tabs and sections.

Given the nature of this content, the most appropriate code block type would be the React Component code block. This will allow for proper syntax highlighting and structure for the React code.



</Thinking>

To implement this landing page component, I'll use the React Component code block. Here's the implementation:

```tsx project="Dailybee Landing Page" file="landing-page.tsx" type="react"
'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users, Calendar, BookOpen, LineChart, ListTodo, Cable, Clock, Award, Zap, Pin, LightbulbIcon, Cog, Timer, Medal, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import useEmblaCarousel from 'embla-carousel-react'
import dynamic from 'next/dynamic'

const FAQSection = dynamic(() => import('./faq-section'), { ssr: false })

interface FAQItem {
  id: string
  question: string
  answer: string
}

const features = [
  {
    id: "public-profile",
    title: "Public profile",
    icon: Users,
    preview: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner-shape-image-02-K6BgZcNfazcKPG1hDkCKLsEa49h3mV.png",
  },
  {
    id: "calendar",
    title: "Calendar",
    icon: Calendar,
    preview: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Pasted%20Graphic-OFWbUsn09IjUhcbkPFyqI0Unwp3ooU.png",
  },
  {
    id: "bookings",
    title: "Bookings",
    icon: BookOpen,
    preview: "/placeholder.svg?height=600&width=1000",
  },
  {
    id: "analytics",
    title: "Analytics",
    icon: LineChart,
    preview: "/placeholder.svg?height=600&width=1000",
  },
  {
    id: "task-management",
    title: "Task management",
    icon: ListTodo,
    preview: "/placeholder.svg?height=600&width=1000",
  },
  {
    id: "integration",
    title: "Integration",
    icon: Cable,
    preview: "/placeholder.svg?height=600&width=1000",
  },
]

const tabContents: Record<string, { description: string }> = {
  "create": {
    description: "Spotlight your personal & professional brand , our <span style=\"color: black; font-weight: bold;\">Customizable Templates</span> allow you to create a striking profile that reflects your brand's personality and style."
  },
  "showcase": {
    description: "Showcase <span style=\"color: black; font-weight: bold;\">your services</span>, availability, and testimonials on your dedicated landing page, acting as your marketing best friend."
  },
  "personalize": {
    description: "Enjoy the ease of building your free landing page and add the cherry on top by <span style=\"color: black; font-weight: bold;\">personalizing your profile URL</span>. Impress your clients. Bee Unique."
  }
}

const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

const TickIcon = ({ isPopular }: { isPopular?: boolean }) => (
  <div className={`w-6 h-6 rounded-full ${isPopular ? 'bg-yellow-400/20' : 'bg-gray-200'} flex items-center justify-center flex-shrink-0`}>
    <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M1 4L4.5 7.5L11 1" 
        stroke={isPopular ? "#F59E0B" : "#1A1A1A"} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  </div>
)

interface PlanProps {
  name: string;
  price: number | string;
  yearlyPrice: number | string;
  features: string[];
  isPopular?: boolean;
  isEnterprise?: boolean;
  className?: string;
}

const PricingCard = ({ name, price, yearlyPrice, features, isPopular, isEnterprise, className = "" }: PlanProps) => {
  const [isMonthly, setIsMonthly] = useState(true)
  
  return (
    <div className={`relative flex flex-col justify-between items-start p-8 w-[391px] h-[650px] rounded-3xl transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg ${
      isPopular ? 'bg-[#4a5ced] text-white' : 'bg-white border-2 border-[#EDEDED]'
    } ${className}`}>
      {isPopular && (
        <div className="absolute top-6 right-6 bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-medium">
          Popular
        </div>
      )}
      <div className="flex flex-col items-start gap-8">
        <h2 className={`text-4xl font-semibold ${isPopular ? 'text-white' : 'text-[#1A1A1A]'}`}>{name}</h2>
        <div className="flex items-end gap-3">
          {isEnterprise ? (
            <span className="text-4xl font-bold text-[#1A1A1A]">Contact us</span>
          ) : (
            <>
              <span className={`text-4xl font-bold ${isPopular ? 'text-white' : 'text-[#1A1A1A]'}`}>
                ${isMonthly ? price : yearlyPrice}
              </span>
              <span className={`text-xl ${isPopular ? 'text-white/90' : 'text-[#1A1A1A]'}`}>
                /month
              </span>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col items-start gap-5 w-full flex-grow">
        <ul className="space-y-5">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-4">
              <TickIcon isPopular={isPopular} />
              <span className={`text-xl font-medium ${isPopular ? 'text-white' : 'text-[#1A1A1A]'}`}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3 w-full mt-4">
          <Plus className={`w-6 h-6 ${isPopular ? 'text-white' : 'text-[#1A1A1A]'}`} />
          <span className={`text-xl underline ${isPopular ? 'text-white' : 'text-[#1A1A1A]'}`}>
            15 more
          </span>
        </div>
      </div>

      <div className="w-full mt-auto pt-8">
        <button 
          className={`w-full py-4 px-7 text-xl font-semibold rounded-full transition-colors duration-300 
            ${isPopular 
              ? 'bg-white text-[#4a5ced] border-2 border-white hover:bg-transparent hover:text-white' 
              : isEnterprise 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'text-[#4a5ced] bg-white border border-[#4a5ced] hover:bg-[#4a5ced] hover:text-white'
            }`}
          disabled={isEnterprise}
        >
          {isEnterprise ? 'Coming Soon' : 'Choose'}
        </button>
      </div>
    </div>
  )
}

interface Testimonial {
  content: string
  author: string
  role: string
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    content: "An amazing mentor! Vassilena really took the time to research our brand beforehand and give us more An amazing mentor! Vassilena really took the time to research our brand beforehand and give us more",
    author: "Sara S",
    role: "Founder of Awesomeux Technology",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/T055L196VDF-U07NTR07VQC-e14476afbac0-512-JLgcDy8rbOqM5XxBLnes0atDBDeoZ4.png"
  },
  {
    content: "The team went above and beyond our expectations. Their attention to detail and commitment to excellence is unmatched.",
    author: "Sarah Johnson",
    role: "CEO of Digital Innovations",
    avatar: "/placeholder.svg?height=80&width=80"
  },
  {
    content: "Working with them transformed our business. The results speak for themselves - our efficiency increased by 200%.",
    author: "Michael Chen",
    role: "Director of Operations",
    avatar: "/placeholder.svg?height=80&width=80"
  }
]

export default function Component() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState("public-profile")
  const [activeBrandingTab, setActiveBrandingTab] = useState("create")
  const [activeAnalyticsTab, setActiveAnalyticsTab] = useState("monitor")
  const [isMonthly, setIsMonthly] = useState(true)
  const [emblaRef, emblaApi] = useEmblaCarousel()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [activeCalendarTab, setActiveCalendarTab] = useState("connect")
  const [activeTaskTab, setActiveTaskTab] = useState("prioritize")
  const [activeBookingTab, setActiveBookingTab] = useState("setup")
  const [openId, setOpenId] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        setSelectedIndex(emblaApi.selectedScrollSnap())
      })
    }
  }, [emblaApi])

  const baseFeatures = [
    "Basic Calendar",
    "Basic Booking",
    "Basic Profile Page",
    "Basic Analytics",
    "Chat Support"
  ]

  const proFeatures = [
    "Everything on basic plan",
    "Unlimited Booking with Payment Availability",
    "Connect your Domain",
    "Advanced Analytics",
    "AI Rescheduling",
    "Reminder"
  ]

  const enterpriseFeatures = [
    "Everything on basic plan",
    "Company Profile Page",
    "Client Booking Calls",
    "Security Compliance"
  ]

  const faqs: FAQItem[] = [
    {
      id: '01',
      question: 'Our current email open rate and how can we improve our email marketing strategy.',
      answer: 'Our email marketing strategy has shown consistent improvement with current open rates averaging above industry standards. We continuously optimize subject lines, personalization, and sending times while maintaining high-quality, relevant content to engage our subscribers effectively.',
    },
    {
      id: '02',
      question: "Improving our website's user experience to increase conversions.",
      answer: 'We focus on streamlining the user journey, optimizing page load times, and implementing clear calls-to-action. Regular A/B testing and user feedback help us make data-driven improvements to enhance conversion rates.',
    },
    {
      id: '03',
      question: 'The most popular products or services we offer and how do they contribute to our revenue.',
      answer: 'Our premium subscription plans and enterprise solutions consistently drive the majority of our revenue. We continuously analyze usage patterns and customer feedback to enhance these offerings and maintain their market leadership.',
    },
    {
      id: '04',
      question: 'The most common reasons why customers contact our customer support team and how can we improve.',
      answer: 'Common support inquiries often relate to account setup and advanced feature usage. We\'re continuously expanding our self-service resources and improving product documentation to enhance the user experience and reduce support needs.',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Navigation */}
      <header className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-6xl transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}>
        <div className="rounded-full border bg-white/50 backdrop-blur-md px-4 py-2">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DailybeeLogo-semFm3AgNrzbtABSJmBN4KyqiJEERD.png"
                alt="Dailybee Logo"
                width={120}
                height={30}
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden md:flex items-center space-x-6">
              {["Features", "Pricing", "How it works", "FAQ"].map((item) => (
                item === "Features" ? (
                  <Link
                    key="Features"
                    href="#features"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('customizable-profile');
                    }}
                    className="text-sm relative group"
                  >
                    <span className="relative z-10 transition-colors duration-200 text-[#b6d8f1] group-hover:text-[#4a5ced] group-focus:text-[#4a5ced] group-focus:font-bold">
                      Features
                    </span>
                    <span className="absolute inset-0 -top-1 -bottom-1 bg-[#4a5ced] opacity-0 group-hover:opacity-5 rounded-full transition-all duration-200 transform scale-x-0 group-hover:scale-x-100" />
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ffc74b] transform scale-x-0 transition-transform duration-200 group-focus:scale-x-100" />
                  </Link>
                ) : (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm relative group"
                  >
                    <span className="relative z-10 transition-colors duration-200 text-[#b6d8f1] group-hover:text-[#4a5ced] group-focus:text-[#4a5ced] group-focus:font-bold">
                      {item}
                    </span>
                    <span className="absolute inset-0 -top-1 -bottom-1 bg-[#4a5ced] opacity-0 group-hover:opacity-5 rounded-full transition-all duration-200 transform scale-x-0 group-hover:scale-x-100" />
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ffc74b] transform scale-x-0 transition-transform duration-200 group-focus:scale-x-100" />
                  </Link>
                )
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" className="text-sm">Login</Button>
              <Button className="bg-[#4a5ced] hover:bg-[#4a5ced]/90 text-white rounded-full px-4 py-2 swish-button">Get Started</Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            AI For{" "}
            <span className="text-[#4a5ced]">Scheduling</span>,{" "}
            <span className="text-[#ffc74b]">Branding</span> &{" "}
            <span className="text-[#4a5ced]">Growth</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            All-In-One AI Calendar To Manage & Grow Day By Day For YOU
          </p>
          <div className="relative inline-block">
            <div className="absolute -top-3 -right-3 bg-[#ffc74b] text-black text-xs font-bold px-2 py-1 rounded-lg transform rotate-12 shadow-md">
              FREE
            </div>
            <Button className="bg-[#4a5ced] hover:bg-white hover:text-[#4a5ced] hover:border-[#4a5ced] hover:border-2 text-white text-lg px-4 py-2 h-auto transition-all rounded-full swish-button">
              Dive In Today
            </Button>
          </div>
          {/* Dashboard Preview */}
          <div className="mt-16 flex justify-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Pasted%20Graphic-SjI62O5WJjD9qipn4XYmyZFzG93vS1.png"
              alt="Dailybee Dashboard Interface showing calendar view and upcoming meetings"
              width={1000}
              height={600}
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4" id="features">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-16">
            Unlock Your Door To{" "}
            <span className="text-[#4a5ced]">Effortless</span> Scheduling with
            Dailybee!
          </h2>

          {/* Feature Tabs */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {features.map((feature) => {
              const isActive = activeTab === feature.id
              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveTab(feature.id)}
                  className={cn(
                    "group flex flex-col items-center focus:outline-none focus:ring-2 focus:ring-[#4a5ced] focus:ring-offset-2 rounded-lg p-2",
                    "transition-all duration-300 ease-in-out transform hover:-translate-y-2"
                  )}
                  aria-selected={isActive}
                  role="tab"
                >
                  <div className="relative transition-all duration-300 ease-in-out group-hover:-translate-y-1">
                    <feature.icon
                      className={cn(
                        "w-12 h-12 mb-2 transition-colors",
                        isActive ? "text-[#4a5ced]" : "text-gray-400 group-hover:text-[#4a5ced]"
                      )}
                    />
                  </div>
                  <span
                    className={cn(
                      "text-sm font-medium transition-colors",
                      isActive ? "text-[#4a5ced]" : "text-gray-600 group-hover:text-[#4a5ced]",
                      "transition-all duration-300 ease-in-out group-hover:-translate-y-1"
                    )}
                  >
                    {feature.title}
                  </span>
                  {/* Yellow underline for active tab */}
                  <div
                    className={cn(
                      "h-0.5 w-full mt-2 transition-all",
                      isActive ? "bg-[#ffc74b]" : "bg-transparent group-hover:bg-[#ffc74b]"
                    )}
                  />
                </button>
              )
            })}
          </div>

          {/* Preview Area */}
          <div className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-white">
            {features.map((feature) => (
              <div
                key={feature.id}
                className={cn(
                  "transition-opacity duration-300",
                  activeTab === feature.id ? "opacity-100" : "opacity-0 hidden"
                )}
                role="tabpanel"
                aria-labelledby={feature.id}
              >
                <Image
                  src={feature.preview}
                  alt={`${feature.title} interface preview`}
                  width={1000}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Productivity Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Boost Your <span className="text-[#4a5ced]">Productivity</span>.
          </h2>
          <h2 className="text-4xl font-bold mb-8">
            Promote Your Professional Presence.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16">
            From personal branded profile page, personalized booking link, the most intuitive calendar view
            to AI Scheduling assistant, Dailybee has it ALL.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Card 1 */}
            <div className="bg-white rounded-xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,199,75,0.3)] border group">
              <div className="flex justify-center mb-6">
                <Pin className="w-12 h-12 text-[#4a5ced] transition-all duration-300 group-hover:text-[#ffc74b] group-hover:rotate-45" />
              </div>
              <h3 className="text-xl font-bold mb-4">Dailybee Will Be Your Pinned Tab</h3>
              <p className="text-gray-600">
                Dailybee integrates <span className="font-medium">all the functionalities</span> you need{" "}
                <span className="font-medium">into one platform</span>, so you can manage your time, 
                your productivity, and your brand growth.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,199,75,0.3)] border group">
              <div className="flex justify-center mb-6">
                <Calendar className="w-12 h-12 text-[#4a5ced] transition-all duration-300 group-hover:text-[#ffc74b] group-hover:rotate-45" />
              </div>
              <h3 className="text-xl font-bold mb-4">It's Not Only About Your Meetings</h3>
              <p className="text-gray-600">
                Create  and manage various <span className="font-medium">event types</span>, like appointments, 
                tasks, and special  events, all in one place. Your DailyBee account will be your  whole work identity.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,199,75,0.3)] border group">
              <div className="flex justify-center mb-6">
                <LightbulbIcon className="w-12 h-12 text-[#4a5ced] transition-all duration-300 group-hover:text-[#ffc74b] group-hover:rotate-45" />
              </div>
              <h3 className="text-xl font-bold mb-4">Be As Fast as AI, But Smarter</h3>
              <p className="text-gray-600">
                Next Tuesday is No-Meeting Day? Set it and forget it. Dailybee will auto-schedule your pre-booked 
                events to the next appropriate slot using the <span className="font-medium">AI scheduling</span> assistant.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,199,75,0.3)] border group">
              <div className="flex justify-center mb-6">
                <Cog className="w-12 h-12 text-[#4a5ced] transition-all duration-300 group-hover:text-[#ffc74b] group-hover:rotate-45" />
              </div>
              <h3 className="text-xl font-bold mb-4">Automate Your Bookings</h3>
              <p className="text-gray-600">
                Eliminate the pain of back-and-forth of scheduling meetings, by sharing your{" "}
                <span className="font-medium">unique booking link</span> and availability with your clients and teams.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-white rounded-xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,199,75,0.3)] border group">
              <div className="flex justify-center mb-6">
                <Timer className="w-12 h-12 text-[#4a5ced] transition-all duration-300 group-hover:text-[#ffc74b] group-hover:rotate-45" />
              </div>
              <h3 className="text-xl font-bold mb-4">Value Your Time</h3>
              <p className="text-gray-600">
                Book your meetings flexibly with built-in personalized booking times and controls 
                so you can smoothly fill your calendar with awesome meeting etiquette.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-white rounded-xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,199,75,0.3)] border group">
              <div className="flex justify-center mb-6">
                <Medal className="w-12 h-12 text-[#4a5ced] transition-all duration-300 group-hover:text-[#ffc74b] group-hover:rotate-45" />
              </div>
              <h3 className="text-xl font-bold mb-4">Brand Yourself Like An Expert</h3>
              <p className="text-gray-600">
                Showcase your services and availability with a professional,{" "}
                <span className="font-medium">customizable profile page</span> tailored to your brand. 
                It's like building your own free landing page.
              </p>
            </div>
          </div>

          <Button className="bg-[#4a5ced] hover:bg-[#4a5ced]/90 text-white text-lg px-6 py-3 h-auto rounded-full swish-button">
            Bee A Do-er Today!
          </Button>
        </div>
      </section>

      {/* Customizable Profile Page Section */}
      <section className="py-24 px-4" id="customizable-profile">
        <div className="container mx-auto text-center">
          <div className="space-y-8 max-w-4xl mx-auto">
            <p className="text-[#4a5ced] font-medium">Customizable Profile Page</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Put The{" "}
              <span className="text-[#4a5ced]">Spotlight</span>{" "}
              On Your{" "}
              <span className="text-[#ffc74b]">Brand</span>!
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The most intuitive landing page builder, easily position yourself with customizable templates,
              personalised profile URL and audience engagement.
            </p>
            <div>
              <Button 
                className="bg-[#4a5ced] hover:bg-[#4a5ced]/90 text-white text-lg px-6 py-3 h-auto rounded-full swish-button"
              >
                Claim Your Profile Today!
              </Button>
            </div>
            <div className="mt-16">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SARA-3-fHXC24P0p2WsAZBsSadrIVcWN2SePB.gif"
                alt="Profile page builder interface demonstration"
                width={1200}
                height={600}
                className="rounded-lg shadow-2xl mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Branding Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <p className="text-[#4a5ced] font<Thinking>




The large text attachment appears to be a complex React component for a landing page. It includes various sections such as a hero, features, productivity, customizable profile, branding, analytics, calendar view, task management, bookings, testimonials, FAQ, pricing, and a footer. The component uses various UI elements like buttons, cards, carousels, and images. It also includes state management for different tabs and sections.

Given the nature of this content, the most appropriate code block type would be the React Component code block. This will allow for proper syntax highlighting and structure for the React code.




</Thinking>

To implement this landing page component, I'll use the React Component code block. Here's the implementation:

```tsx project="Dailybee Landing Page" file="landing-page.tsx" type="react"
'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users, Calendar, BookOpen, LineChart, ListTodo, Cable, Clock, Award, Zap, Pin, LightbulbIcon, Cog, Timer, Medal, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import useEmblaCarousel from 'embla-carousel-react'
import dynamic from 'next/dynamic'

const FAQSection = dynamic(() => import('./faq-section'), { ssr: false })

interface FAQItem {
  id: string
  question: string
  answer: string
}

const features = [
  {
    id: "public-profile",
    title: "Public profile",
    icon: Users,
    preview: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner-shape-image-02-K6BgZcNfazcKPG1hDkCKLsEa49h3mV.png",
  },
  {
    id: "calendar",
    title: "Calendar",
    icon: Calendar,
    preview: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Pasted%20Graphic-OFWbUsn09IjUhcbkPFyqI0Unwp3ooU.png",
  },
  {
    id: "bookings",
    title: "Bookings",
    icon: BookOpen,
    preview: "/placeholder.svg?height=600&width=1000",
  },
  {
    id: "analytics",
    title: "Analytics",
    icon: LineChart,
    preview: "/placeholder.svg?height=600&width=1000",
  },
  {
    id: "task-management",
    title: "Task management",
    icon: ListTodo,
    preview: "/placeholder.svg?height=600&width=1000",
  },
  {
    id: "integration",
    title: "Integration",
    icon: Cable,
    preview: "/placeholder.svg?height=600&width=1000",
  },
]

const tabContents: Record<string, { description: string }> = {
  "create": {
    description: "Spotlight your personal & professional brand , our <span style=\"color: black; font-weight: bold;\">Customizable Templates</span> allow you to create a striking profile that reflects your brand's personality and style."
  },
  "showcase": {
    description: "Showcase <span style=\"color: black; font-weight: bold;\">your services</span>, availability, and testimonials on your dedicated landing page, acting as your marketing best friend."
  },
  "personalize": {
    description: "Enjoy the ease of building your free landing page and add the cherry on top by <span style=\"color: black; font-weight: bold;\">personalizing your profile URL</span>. Impress your clients. Bee Unique."
  }
}

const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

const TickIcon = ({ isPopular }: { isPopular?: boolean }) => (
  <div className={`w-6 h-6 rounded-full ${isPopular ? 'bg-yellow-400/20' : 'bg-gray-200'} flex items-center justify-center flex-shrink-0`}>
    <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M1 4L4.5 7.5L11 1" 
        stroke={isPopular ? "#F59E0B" : "#1A1A1A"} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  </div>
)

interface PlanProps {
  name: string;
  price: number | string;
  yearlyPrice: number | string;
  features: string[];
  isPopular?: boolean;
  isEnterprise?: boolean;
  className?: string;
}

const PricingCard = ({ name, price, yearlyPrice, features, isPopular, isEnterprise, className = "" }: PlanProps) => {
  const [isMonthly, setIsMonthly] = useState(true)
  
  return (
    <div className={`relative flex flex-col justify-between items-start p-8 w-[391px] h-[650px] rounded-3xl transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg ${
      isPopular ? 'bg-[#4a5ced] text-white' : 'bg-white border-2 border-[#EDEDED]'
    } ${className}`}>
      {isPopular && (
        <div className="absolute top-6 right-6 bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-medium">
          Popular
        </div>
      )}
      <div className="flex flex-col items-start gap-8">
        <h2 className={`text-4xl font-semibold ${isPopular ? 'text-white' : 'text-[#1A1A1A]'}`}>{name}</h2>
        <div className="flex items-end gap-3">
          {isEnterprise ? (
            <span className="text-4xl font-bold text-[#1A1A1A]">Contact us</span>
          ) : (
            <>
              <span className={`text-4xl font-bold ${isPopular ? 'text-white' : 'text-[#1A1A1A]'}`}>
                ${isMonthly ? price : yearlyPrice}
              </span>
              <span className={`text-xl ${isPopular ? 'text-white/90' : 'text-[#1A1A1A]'}`}>
                /month
              </span>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col items-start gap-5 w-full flex-grow">
        <ul className="space-y-5">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-4">
              <TickIcon isPopular={isPopular} />
              <span className={`text-xl font-medium ${isPopular ? 'text-white' : 'text-[#1A1A1A]'}`}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3 w-full mt-4">
          <Plus className={`w-6 h-6 ${isPopular ? 'text-white' : 'text-[#1A1A1A]'}`} />
          <span className={`text-xl underline ${isPopular ? 'text-white' : 'text-[#1A1A1A]'}`}>
            15 more
          </span>
        </div>
      </div>

      <div className="w-full mt-auto pt-8">
        <button 
          className={`w-full py-4 px-7 text-xl font-semibold rounded-full transition-colors duration-300 
            ${isPopular 
              ? 'bg-white text-[#4a5ced] border-2 border-white hover:bg-transparent hover:text-white' 
              : isEnterprise 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'text-[#4a5ced] bg-white border border-[#4a5ced] hover:bg-[#4a5ced] hover:text-white'
            }`}
          disabled={isEnterprise}
        >
          {isEnterprise ? 'Coming Soon' : 'Choose'}
        </button>
      </div>
    </div>
  )
}

interface Testimonial {
  content: string
  author: string
  role: string
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    content: "An amazing mentor! Vassilena really took the time to research our brand beforehand and give us more An amazing mentor! Vassilena really took the time to research our brand beforehand and give us more",
    author: "Sara S",
    role: "Founder of Awesomeux Technology",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/T055L196VDF-U07NTR07VQC-e14476afbac0-512-JLgcDy8rbOqM5XxBLnes0atDBDeoZ4.png"
  },
  {
    content: "The team went above and beyond our expectations. Their attention to detail and commitment to excellence is unmatched.",
    author: "Sarah Johnson",
    role: "CEO of Digital Innovations",
    avatar: "/placeholder.svg?height=80&width=80"
  },
  {
    content: "Working with them transformed our business. The results speak for themselves - our efficiency increased by 200%.",
    author: "Michael Chen",
    role: "Director of Operations",
    avatar: "/placeholder.svg?height=80&width=80"
  }
]

export default function Component() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState("public-profile")
  const [activeBrandingTab, setActiveBrandingTab] = useState("create")
  const [activeAnalyticsTab, setActiveAnalyticsTab] = useState("monitor")
  const [isMonthly, setIsMonthly] = useState(true)
  const [emblaRef, emblaApi] = useEmblaCarousel()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [activeCalendarTab, setActiveCalendarTab] = useState("connect")
  const [activeTaskTab, setActiveTaskTab] = useState("prioritize")
  const [activeBookingTab, setActiveBookingTab] = useState("setup")
  const [openId, setOpenId] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        setSelectedIndex(emblaApi.selectedScrollSnap())
      })
    }
  }, [emblaApi])

  const baseFeatures = [
    "Basic Calendar",
    "Basic Booking",
    "Basic Profile Page",
    "Basic Analytics",
    "Chat Support"
  ]

  const proFeatures = [
    "Everything on basic plan",
    "Unlimited Booking with Payment Availability",
    "Connect your Domain",
    "Advanced Analytics",
    "AI Rescheduling",
    "Reminder"
  ]

  const enterpriseFeatures = [
    "Everything on basic plan",
    "Company Profile Page",
    "Client Booking Calls",
    "Security Compliance"
  ]

  const faqs: FAQItem[] = [
    {
      id: '01',
      question: 'Our current email open rate and how can we improve our email marketing strategy.',
      answer: 'Our email marketing strategy has shown consistent improvement with current open rates averaging above industry standards. We continuously optimize subject lines, personalization, and sending times while maintaining high-quality, relevant content to engage our subscribers effectively.',
    },
    {
      id: '02',
      question: "Improving our website's user experience to increase conversions.",
      answer: 'We focus on streamlining the user journey, optimizing page load times, and implementing clear calls-to-action. Regular A/B testing and user feedback help us make data-driven improvements to enhance conversion rates.',
    },
    {
      id: '03',
      question: 'The most popular products or services we offer and how do they contribute to our revenue.',
      answer: 'Our premium subscription plans and enterprise solutions consistently drive the majority of our revenue. We continuously analyze usage patterns and customer feedback to enhance these offerings and maintain their market leadership.',
    },
    {
      id: '04',
      question: 'The most common reasons why customers contact our customer support team and how can we improve.',
      answer: 'Common support inquiries often relate to account setup and advanced feature usage. We\'re continuously expanding our self-service resources and improving product documentation to enhance the user experience and reduce support needs.',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Navigation */}
      <header className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-6xl transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}>
        <div className="rounded-full border bg-white/50 backdrop-blur-md px-4 py-2">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DailybeeLogo-semFm3AgNrzbtABSJmBN4KyqiJEERD.png"
                alt="Dailybee Logo"
                width={120}
                height={30}
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden md:flex items-center space-x-6">
              {["Features", "Pricing", "How it works", "FAQ"].map((item) => (
                item === "Features" ? (
                  <Link
                    key="Features"
                    href="#features"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('customizable-profile');
                    }}
                    className="text-sm relative group"
                  >
                    <span className="relative z-10 transition-colors duration-200 text-[#b6d8f1] group-hover:text-[#4a5ced] group-focus:text-[#4a5ced] group-focus:font-bold">
                      Features
                    </span>
                    <span className="absolute inset-0 -top-1 -bottom-1 bg-[#4a5ced] opacity-0 group-hover:opacity-5 rounded-full transition-all duration-200 transform scale-x-0 group-hover:scale-x-100" />
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ffc74b] transform scale-x-0 transition-transform duration-200 group-focus:scale-x-100" />
                  </Link>
                ) : (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm relative group"
                  >
                    <span className="relative z-10 transition-colors duration-200 text-[#b6d8f1] group-hover:text-[#4a5ced] group-focus:text-[#4a5ced] group-focus:font-bold">
                      {item}
                    </span>
                    <span className="absolute inset-0 -top-1 -bottom-1 bg-[#4a5ced] opacity-0 group-hover:opacity-5 rounded-full transition-all duration-200 transform scale-x-0 group-hover:scale-x-100" />
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ffc74b] transform scale-x-0 transition-transform duration-200 group-focus:scale-x-100" />
                  </Link>
                )
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" className="text-sm">Login</Button>
              <Button className="bg-[#4a5ced] hover:bg-[#4a5ced]/90 text-white rounded-full px-4 py-2 swish-button">Get Started</Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            AI For{" "}
            <span className="text-[#4a5ced]">Scheduling</span>,{" "}
            <span className="text-[#ffc74b]">Branding</span> &{" "}
            <span className="text-[#4a5ced]">Growth</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            All-In-One AI Calendar To Manage & Grow Day By Day For YOU
          </p>
          <div className="relative inline-block">
            <div className="absolute -top-3 -right-3 bg-[#ffc74b] text-black text-xs font-bold px-2 py-1 rounded-lg transform rotate-12 shadow-md">
              FREE
            </div>
            <Button className="bg-[#4a5ced] hover:bg-white hover:text-[#4a5ced] hover:border-[#4a5ced] hover:border-2 text-white text-lg px-4 py-2 h-auto transition-all rounded-full swish-button">
              Dive In Today
            </Button>
          </div>
          {/* Dashboard Preview */}
          <div className="mt-16 flex justify-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Pasted%20Graphic-SjI62O5WJjD9qipn4XYmyZFzG93vS1.png"
              alt="Dailybee Dashboard Interface showing calendar view and upcoming meetings"
              width={1000}
              height={600}
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4" id="features">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-16">
            Unlock Your Door To{" "}
            <span className="text-[#4a5ced]">Effortless</span> Scheduling with
            Dailybee!
          </h2>

          {/* Feature Tabs */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {features.map((feature) => {
              const isActive = activeTab === feature.id
              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveTab(feature.id)}
                  className={cn(
                    "group flex flex-col items-center focus:outline-none focus:ring-2 focus:ring-[#4a5ced] focus:ring-offset-2 rounded-lg p-2",
                    "transition-all duration-300 ease-in-out transform hover:-translate-y-2"
                  )}
                  aria-selected={isActive}
                  role="tab"
                >
                  <div className="relative transition-all duration-300 ease-in-out group-hover:-translate-y-1">
                    <feature.icon
                      className={cn(
                        "w-12 h-12 mb-2 transition-colors",
                        isActive ? "text-[#4a5ced]" : "text-gray-400 group-hover:text-[#4a5ced]"
                      )}
                    />
                  </div>
                  <span
                    className={cn(
                      "text-sm font-medium transition-colors",
                      isActive ? "text-[#4a5ced]" : "text-gray-600 group-hover:text-[#4a5ced]",
                      "transition-all duration-300 ease-in-out group-hover:-translate-y-1"
                    )}
                  >
                    {feature.title}
                  </span>
                  {/* Yellow underline for active tab */}
                  <div
                    className={cn(
                      "h-0.5 w-full mt-2 transition-all",
                      isActive ? "bg-[#ffc74b]" : "bg-transparent group-hover:bg-[#ffc74b]"
                    )}
                  />
                </button>
              )
            })}
          </div>

          {/* Preview Area */}
          <div className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-white">
            {features.map((feature) => (
              <div
                key={feature.id}
                className={cn(
                  "transition-opacity duration-300",
                  activeTab === feature.id ? "opacity-100" : "opacity-0 hidden"
                )}
                role="tabpanel"
                aria-labelledby={feature.id}
              >
                <Image
                  src={feature.preview}
                  alt={`${feature.title} interface preview`}
                  width={1000}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Productivity Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Boost Your <span className="text-[#4a5ced]">Productivity</span>.
          </h2>
          <h2 className="text-4xl font-bold mb-8">
            Promote Your Professional Presence.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16">
            From personal branded profile page, personalized booking link, the most intuitive calendar view
            to AI Scheduling assistant, Dailybee has it ALL.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Card 1 */}
            <div className="bg-white rounded-xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,199,75,0.3)] border group">
              <div className="flex justify-center mb-6">
                <Pin className="w-12 h-12 text-[#4a5ced] transition-all duration-300 group-hover:text-[#ffc74b] group-hover:rotate-45" />
              </div>
              <h3 className="text-xl font-bold mb-4">Dailybee Will Be Your Pinned Tab</h3>
              <p className="text-gray-600">
                Dailybee integrates <span className="font-medium">all the functionalities</span> you need{" "}
                <span className="font-medium">into one platform</span>, so you can manage your time, 
                your productivity, and your brand growth.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,199,75,0.3)] border group">
              <div className="flex justify-center mb-6">
                <Calendar className="w-12 h-12 text-[#4a5ced] transition-all duration-300 group-hover:text-[#ffc74b] group-hover:rotate-45" />
              </div>
              <h3 className="text-xl font-bold mb-4">It's Not Only About Your Meetings</h3>
              <p className="text-gray-600">
                Create  and manage various <span className="font-medium">event types</span>, like appointments, 
                tasks, and special  events, all in one place. Your DailyBee account will be your  whole work identity.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,199,75,0.3)] border group">
              <div className="flex justify-center mb-6">
                <LightbulbIcon className="w-12 h-12 text-[#4a5ced] transition-all duration-300 group-hover:text-[#ffc74b] group-hover:rotate-45" />
              </div>
              <h3 className="text-xl font-bold mb-4">Be As Fast as AI, But Smarter</h3>
              <p className="text-gray-600">
                Next Tuesday is No-Meeting Day? Set it and forget it. Dailybee will auto-schedule your pre-booked 
                events to the next appropriate slot using the <span className="font-medium">AI scheduling</span> assistant.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,199,75,0.3)] border group">
              <div className="flex justify-center mb-6">
                <Cog className="w-12 h-12 text-[#4a5ced] transition-all duration-300 group-hover:text-[#ffc74b] group-hover:rotate-45" />
              </div>
              <h3 className="text-xl font-bold mb-4">Automate Your Bookings</h3>
              <p className="text-gray-600">
                Eliminate the pain of back-and-forth of scheduling meetings, by sharing your{" "}
                <span className="font-medium">unique booking link</span> and availability with your clients and teams.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-white rounded-xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,199,75,0.3)] border group">
              <div className="flex justify-center mb-6">
                <Timer className="w-12 h-12 text-[#4a5ced] transition-all duration-300 group-hover:text-[#ffc74b] group-hover:rotate-45" />
              </div>
              <h3 className="text-xl font-bold mb-4">Value Your Time</h3>
              <p className="text-gray-600">
                Book your meetings flexibly with built-in personalized booking times and controls 
                so you can smoothly fill your calendar with awesome meeting etiquette.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-white rounded-xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,199,75,0.3)] border group">
              <div className="flex justify-center mb-6">
                <Medal className="w-12 h-12 text-[#4a5ced] transition-all duration-300 group-hover:text-[#ffc74b] group-hover:rotate-45" />
              </div>
              <h3 className="text-xl font-bold mb-4">Brand Yourself Like An Expert</h3>
              <p className="text-gray-600">
                Showcase your services and availability with a professional,{" "}
                <span className="font-medium">customizable profile page</span> tailored to your brand. 
                It's like building your own free landing page.
              </p>
            </div>
          </div>

          <Button className="bg-[#4a5ced] hover:bg-[#4a5ced]/90 text-white text-lg px-6 py-3 h-auto rounded-full swish-button">
            Bee A Do-er Today!
          </Button>
        </div>
      </section>

      {/* Customizable Profile Page Section */}
      <section className="py-24 px-4" id="customizable-profile">
        <div className="container mx-auto text-center">
          <div className="space-y-8 max-w-4xl mx-auto">
            <p className="text-[#4a5ced] font-medium">Customizable Profile Page</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Put The{" "}
              <span className="text-[#4a5ced]">Spotlight</span>{" "}
              On Your{" "}
              <span className="text-[#ffc74b]">Brand</span>!
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The most intuitive landing page builder, easily position yourself with customizable templates,
              personalised profile URL and audience engagement.
            </p>
            <div>
              <Button 
                className="bg-[#4a5ced] hover:bg-[#4a5ced]/90 text-white text-lg px-6 py-3 h-auto rounded-full swish-button"
              >
                Claim Your Profile Today!
              </Button>
            </div>
            <div className="mt-16">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SARA-3-fHXC24P0p2WsAZBsSadrIVcWN2SePB.gif"
                alt="Profile page builder interface demonstration"
                width={1200}
                height={600}
                className="rounded-lg shadow-2xl mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Branding Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <p className="text-[#4a5ced] font-medium">Customizable Profile Page</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Create Your Strong{" "}
                <span className="block">Personal Brand Presence</span>
              </h2>
              
              <div className="space-y-6 max-w-3xl">
                <div className="flex flex-nowrap justify-between gap-4 overflow-x-auto pb-2 md:pb-0">
                  {[
                    { id: "create", label: "Create Your Brand" },
                    { id: "showcase", label: "Showcase Your Uniqueness" },
                    { id: "personalize", label: "Personalize Your Profile URL" }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveBrandingTab(tab.id)}
                      className={`relative pb-2 transition-colors text-sm md:text-base whitespace-nowrap ${
                        activeBrandingTab === tab.id 
                          ? "text-[#4a5ced] font-bold" 
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {tab.label}
                      <span 
                        className={`absolute bottom-0 left-0 w-full h-0.5 transition-transform duration-300 ${
                          activeBrandingTab === tab.id 
                            ? "bg-[#4a5ced] scale-x-100" 
                            : "bg-transparent scale-x-0"
                        }`} 
                      />
                    </button>
                  ))}
                </div>
                
                <div className="flex flex-col justify-between h-[180px]">
                  <div className="transition-all duration-300">
                    <p 
                      className="text-gray-600 max-w-xl"
                      dangerouslySetInnerHTML={{ __html: tabContents[activeBrandingTab].description }}
                    />
                  </div>

                  <div className="mt-2">
                    <Button 
                      className="bg-[#4a5ced] text-white rounded-full px-8 py-3 h-auto text-lg hover:bg-[#4a5ced]/90"
                    >
                      Join Now For Free!
                    </Button>
                  </div>
                </div>

              </div>
            </div>

            <div className="relative w-full overflow-visible">
              <div className="absolute -right-16 -top-16 -bottom-16 -left-16 bg-[#fff5e5]/30 rounded-[3rem] -z-10 transform rotate-6" />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mYwkkkv7rtOrF9lhsCyWa9QJa6XI4t.png"
                width={400}
                height={300}
                alt="Dashboard analytics interface showing charts, statistics and progress bars"
                className="rounded-xl shadow-lg w-full max-w-[400px] h-auto object-contain ml-auto"
              />
              <div className="absolute -bottom-8 -right-16 left-0 h-32 bg-[#fff7e6] rounded-xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute -left-1/4 -bottom-1/4 w-3/4 h-[150%] bg-[#EEF4FF]/50 rounded-[100px] rotate-12 transform -z-10" />

        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            <div className="relative col-span-1">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RO10RpkE8Rgem89LypUdBzXK0D4gyV.png"
                width={400}
                height={300}
                alt="Analytics dashboard showing performance metrics and charts"
                className="rounded-xl shadow-lg w-full h-auto object-contain"
              />
            </div>

            <div className="space-y-8 col-span-2">
              <p className="text-[#4a5ced] font-medium">Analytics</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Growth Insights in one place
              </h2>

              <div className="space-y-6 max-w-3xl">
                <div className="flex flex-nowrap justify-start gap-6 overflow-x-auto pb-2 md:pb-0">
                  {[
                    { id: "monitor", label: "Monitor Your Activities" },
                    { id: "track", label: "Track Your Growth" },
                    { id: "feedback", label: "Get Client Feedback" }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveAnalyticsTab(tab.id)}
                      className={`relative pb-2 transition-colors text-sm md:text-base whitespace-nowrap ${
                        activeAnalyticsTab === tab.id 
                          ? "text-[#4a5ced] font-bold" 
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {tab.label}
                      <span 
                        className={`absolute bottom-0 left-0 w-full h-0.5 transition-transform duration-300 ${
                          activeAnalyticsTab === tab.id 
                            ? "bg-[#4a5ced] scale-x-100" 
                            : "bg-transparent scale-x-0"
                        }`} 
                      />
                    </button>
                  ))}
                </div>
                <div className="space-y-6 flex flex-col h-[200px]">
                  <div className="flex-grow">
                    {activeAnalyticsTab === "monitor" && (
                      <p className="text-gray-600 text-lg">
                        Access detailed <span className="font-bold">Performance Insights</span> to monitor and optimize your booking performance, so you can identify areas of improvement and become your own mentor.
                      </p>
                    )}
                    {activeAnalyticsTab === "track" && (
                      <p className="text-gray-600 text-lg">
                        Monitor your growing Dailybee wallet , Allow yourself to dig deep into <span className="font-bold">Revenue And Goal Tracking</span> and analyse which services are performing the best and causing the up-most profitability.
                      </p>
                    )}
                    {activeAnalyticsTab === "feedback" && (
                      <p className="text-gray-600 text-lg">
                        Access your client's feedback to highlight your successes and entice your new clients with <span className="font-bold">Client﻿ Testimonials</span>. Start building a portfolio for yourself today!
                      </p>
                    )}
                  </div>
                  <div>
                    <Button
                      className="bg-[#4a5ced] text-white rounded-full px-8 py-3 h-auto text-lg hover:bg-[#4a5ced]/90"
                    >
                      Your Time Starts Now!
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar View Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute -right-1/4 -top-1/4 w-3/4 h-[150%] bg-[#EEF4FF]/50 rounded-[100px] -rotate-12 transform -z-10" />

        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="space-y-8 lg:col-span-8">
              <p className="text-[#4a5ced] font-medium">Calendar View</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Challenge Yourself To{" "}
                <span className="block">Find A Better Calendar</span>
              </h2>

              <div className="flex flex-nowrap justify-start gap-6 overflow-x-auto pb-2 md:pb-0">
                {[
                  { id: "connect", label: "Connect your calendars" },
                  { id: "customize", label: "Customize your availability" },
                  { id: "ai", label: "Use AI as a personal assistant" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCalendarTab(tab.id)}
                    className={`relative pb-2 transition-colors text-sm md:text-base whitespace-nowrap ${
                      tab.id === activeCalendarTab ? "text-[#4a5ced] font-bold" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {tab.label}
                    <span 
                      className={`absolute bottom-0 left-0 w-full h-0.5 transition-transform duration-300 ${
                        tab.id === activeCalendarTab ? "bg-[#4a5ced] scale-x-100" : "bg-transparent scale-x-0"
                      }`} 
                    />
                  </button>
                ))}
              </div>

              <div className="space-y-6 flex flex-col h-[200px]">
                <div className="flex-grow">
                  <p className="text-gray-600 text-lg">
                    {activeCalendarTab === "connect" && (
                      <>Our <span className="font-bold">Integrated Calendar Connection</span> view allows you to sync seamlessly with Google, Outlook, and Apple calendars to keep all your appointments in one cohesive view. Say hi to the RIGHT way to be organized.</>
                    )}
                    {activeCalendarTab === "customize" && (
                      <>Have all the freedom in our <span className="font-bold">Custom Availability Settings</span> by setting your availability for different types of appointments, ensuring clients book ONLY when you're free.</>
                    )}
                    {activeCalendarTab === "ai" && (
                      <>You just hired your new personal assistant, our <span className="font-bold">AI Scheduling</span> assistant reschedules your appointments, tasks, and bookings when you are no longer available to the best next meeting.</>
                    )}
                  </p>
                </div>
                <div>
                  <Button className="bg-[#4a5ced] text-white rounded-full px-8 py-3 h-auto text-lg hover:bg-[#4a5ced]/90">
                    Get Started Today!
                  </Button>
                </div>
              </div>
            </div>

            <div className="relative lg:col-span-4">
              <div className="relative bg-white rounded-2xl shadow-xl p-2">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-uycsWo3ILJ9BLUO5rKl81Kiis3R3Lr.png"
                  alt="Calendar dashboard interface showing analytics and scheduling"
                  width={600}
                  height={400}
                  className="rounded-xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Task Management Section */}
      <section className="py-24 px-4 relative overflow-hidden bg-[#FFF5F5]/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="relative order-2 lg:order-1 lg:col-span-4">
              <div className="relative bg-white rounded-2xl shadow-xl p-2">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-uycsWo3ILJ9BLUO5rKl81Kiis3R3Lr.png"
                  alt="Task management dashboard showing productivity charts and task lists"
                  width={600}
                  height={400}
                  className="rounded-xl w-full h-auto"
                />
              </div>
            </div>

            <div className="space-y-8 order-1 lg:order-2 lg:col-span-8">
              <p className="text-[#4a5ced] font-medium">Task Management</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Be Ahead Of Your To-Do List
              </h2>

              <div className="flex flex-nowrap justify-start gap-6 overflow-x-auto pb-2 md:pb-0">
                {[
                  { id: "prioritize", label: "Prioritize your work" },
                  { id: "manage", label: "Manage your Tasks" },
                  { id: "deadline", label: "Never miss a deadline" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTaskTab(tab.id)}
                    className={`relative pb-2 transition-colors text-sm md:text-base whitespace-nowrap ${
                      tab.id === activeTaskTab ? "text-[#4a5ced] font-bold" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {tab.label}
                    <span 
                      className={`absolute bottom-0 left-0 w-full h-0.5 transition-transform duration-300 ${
                        tab.id === activeTaskTab ? "bg-[#4a5ced] scale-x-100" : "bg-transparent scale-x-0"
                      }`} 
                    />
                  </button>
                ))}
              </div>

              <div className="space-y-6 flex flex-col h-[200px]">
                <div className="flex-grow">
                  <p className="text-gray-600 text-lg">
                    {activeTaskTab === "prioritize" && (
                      <>Streamline and organize your tasks and productivity with our <span className="font-bold">Prioritization Filters</span>, ensuring your focus on what's most important first.</>
                    )}
                    {activeTaskTab === "manage" && (
                      <>Enjoy our intuitive <span className="font-bold">Board View</span>, which is visually enabling easy tracking of progress. With statuses like To-do, In-progress and complete, you will be able to not only track your tasks history, present and future.</>
                    )}
                    {activeTaskTab === "deadline" && (
                      <>Stop freaking out 5 minutes before the meetings. Ensure proper <span className="font-bold">Due Date Tracking</span> with notifications that will guarantee you never miss a deadline.</>
                    )}
                  </p>
                </div>
                <div>
                  <Button className="bg-[#4a5ced] text-white rounded-full px-8 py-3 h-auto text-lg hover:bg-[#4a5ced]/90">
                    Get Organized Today
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bookings Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute -right-1/4 -top-1/4 w-3/4 h-[150%] bg-[#EEF4FF]/50 rounded-[100px] -rotate-12 transform -z-10" />

        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="space-y-8 lg:col-span-8">
              <p className="text-[#4a5ced] font-medium">Bookings</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Grow Like A (Daily)Bee Hive
              </h2>

              <div className="flex flex-nowrap justify-start gap-6 overflow-x-auto pb-2 md:pb-0">
                {[
                  { id: "setup", label: "Set Up In Minutes" },
                  { id: "prep", label: "Prep For Your Call" },
                  { id: "generate", label: "Generate Bu﻿siness" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveBookingTab(tab.id)}
                    className={`relative pb-2 transition-colors text-sm md:text-base whitespace-nowrap ${
                      tab.id === activeBookingTab ? "text-[#4a5ced] font-bold" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {tab.label}
                    <span 
                      className={`absolute bottom-0 left-0 w-full h-0.5 transition-transform duration-300 ${
                        tab.id === activeBookingTab ? "bg-[#4a5ced] scale-x-100" : "bg-transparent scale-x-0"
                      }`} 
                    />
                  </button>
                ))}
              </div>

              <div className="space-y-6 flex flex-col h-[200px]">
                <div className="flex-grow">
                  <p className="text-gray-600 text-lg">
                    {activeBookingTab === "setup" && (
                      <>Invest your time in what matters, with our <span className="font-bold">Easy Booking Process</span>, It will take you less then a few minutes to setup your profile and have clients book slots convenient to you.</>
                    )}
                    {activeBookingTab === "prep" && (
                      <>Be ready for any meeting by adding <span className="font-bold">Custom Surveys</span> for clients to complete during the booking process, gathering valuable insights upfront.</>
                    )}
                    {activeBookingTab === "generate" && (
                      <>Monetize your account by collecting <span className="font-bold">Payments For Bookings</span>, securely and efficiently. Wake up to new opportunities, your <span className="font-bold">time</span> is your new <span className="font-bold">investment</span>.</>
                    )}
                  </p>
                </div>
                <div>
                  <Button className="bg-[#4a5ced] text-white rounded-full px-8 py-3 h-auto text-lg hover:bg-[#4a5ced]/90">
                    Start Now!
                  </Button>
                </div>
              </div>
            </div>

            <div className="relative lg:col-span-4">
              <div className="relative bg-white rounded-2xl shadow-xl p-2">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-uycsWo3ILJ9BLUO5rKl81Kiis3R3Lr.png"
                  alt="Booking interface showing calendar and available time slots"
                  width={600}
                  height={400}
                  className="rounded-xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Section: Bee ORGANIZED with DailyBee */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4 mb-16">
            <div className="w-[878px] h-[87px] mx-auto overflow-hidden">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Flow%2040@1x-25fps-WOC9WYgX2HauCEezsI25X1DQ35TnG0.gif"
                alt="Bee ORGANIZED with DailyBee"
                width={878}
                height={87}
                className="object-cover"
              />
            </div>
            <p className="text-xl text-gray-600">Even Lazy Susan Can Do It!</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute -left-4 -top-4 w-12 h-12 bg-[#4a5ced] rounded-full flex items-center justify-center text-white text-xl font-bold z-10">
                1
              </div>
              <div className="bg-[#FFF8E7] rounded-2xl p-6 h-full">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-PAVRDK9uHESjV3QcVuKQZADTDdkX63.png"
                  alt="Registration interface"
                  width={400}
                  height={300}
                  className="w-full h-auto rounded-xl mb-4"
                />
                <h3 className="text-xl font-bold text-center">Register</h3>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute -left-4 -top-4 w-12 h-12 bg-[#4a5ced] rounded-full flex items-center justify-center text-white text-xl font-bold z-10">
                2
              </div>
              <div className="bg-[#FFF8E7] rounded-2xl p-6 h-full">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-PAVRDK9uHESjV3QcVuKQZADTDdkX63.png"
                  alt="Personalization interface"
                  width={400}
                  height={300}
                  className="w-full h-auto rounded-xl mb-4"
                />
                <h3 className="text-xl font-bold text-center">Personalise</h3>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="absolute -left-4 -top-4 w-12 h-12 bg-[#4a5ced] rounded-full flex items-center justify-center text-white text-xl font-bold z-10">
                3
              </div>
              <div className="bg-[#FFF8E7] rounded-2xl p-6 h-full">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-PAVRDK9uHESjV3QcVuKQZADTDdkX63.png"
                  alt="Dashboard interface"
                  width={400}
                  height={300}
                  className="w-full h-auto rounded-xl mb-4"
                />
                <h3 className="text-xl font-bold text-center">Bee Productive</h3>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button className="bg-[#4a5ced] hover:bg-[#4a5ced]/90 text-white text-lg px-8 py-6 h-auto rounded-full">
              Start Free Trial Now!
            </Button>
          </div>
        </div>
      </section>

      {/* New Logo Section */}
      <section className="w-full min-h-[120vh] relative overflow-hidden bg-white">
        {/* Background GIF */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20(5)-xISUBLGIjGtvqTcyO6hOiylcN6Cdq3.gif"
            alt="Animated background"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 min-h-screen flex flex-col items-center justify-center">
          <div className="text-center max-w-4xl mx-auto mb-8">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Dailybee Integrates with{" "}
              <span className="text-[#4a5ced]">YOUR</span>{" "}
              favorite tools!
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Say Bye To Multiple Tabs Open, DailyBee Will Be Your ONLY Pinned Tab
            </p>
            <Button 
              className="bg-[#4a5ced] hover:bg-[#4a5ced]/90 text-white text-lg px-8 py-3 h-auto rounded-full"
            >
              Join Now For Free!
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full bg-[#4a5ced] py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-white text-center mb-16">
            Testimonials
          </h2>

          <div className="max-w-4xl mx-auto relative">
            <Carousel
              opts={{
                align: 'center',
                loop: true,
              }}
              className="w-full"
              ref={emblaRef}
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index}>
                    <Card className="border-none shadow-lg mx-4">
                      <CardContent className="p-12">
                        <div className="relative">
                          <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-tjAxTVzmZn1vcSALGVODmsg5h9lED6.png" alt="Opening quote" className="absolute -top-8 -left-2 w-12 h-12" />
                          <blockquote className="text-center px-8 text-lg text-gray-800 mt-8 mb-8">
                            {testimonial.content.replace(/\n/g, ' ')}
                          </blockquote>
                          <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-NwB8qxjUZhkFOlLHcFwWXhgGfuH8Ap.png" alt="Closing quote" className="w-12 h-12 ml-auto mb-4" />
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100">
                              <img
                                src={testimonial.avatar}
                                alt={testimonial.author}
                                className="w-full h-full object-cover object-center"
                              />
                            </div>
                            <cite className="not-italic font-medium text-gray-900">
                              {testimonial.author}
                            </cite>
                            <p className="text-gray-600">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className="absolute -left-12 bg-white/10 hover:bg-white/20 border-none text-white" />
              <CarouselNext className="absolute -right-12 bg-white/10 hover:bg-white/20 border-none text-white" />
            </Carousel>

            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === selectedIndex ? 'bg-yellow-400' : 'bg-white'
                  }`}
                  onClick={() => emblaApi?.scrollTo(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4" id="faq">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              STILL HAVE QUESTIONS?
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold">
              EXPLORE OUR <span className="text-[#4a5ced]">FAQS</span>
              <span className="text-[#ffc74b]">.</span>
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="hidden md:block">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VcPEwCezHGKNQmmowChbgqmf6hAowg.png"
                alt="FAQ Illustration"
                width={500}
                height={500}
                className="w-full h-auto"
              />
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="border rounded-lg overflow-hidden transition-all duration-200 hover:border-[#4a5ced]"
                >
                  <button
                    onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <div className="flex gap-4 pr-4">
                      <span className="text-[#4a5ced] opacity-50 font-medium">
                        {faq.id}
                      </span>
                      <h3 className="font-medium text-xl">{faq.question}</h3>
                    </div>
                    <Plus
                      className={cn(
                        "flex-shrink-0 h-6 w-6 text-[#4a5ced] transition-transform duration-200",
                        openId === faq.id && "rotate-45"
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-200",
                      openId === faq.id
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="p-6 pt-0 text-gray-600">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="bg-[#EEF4FF] rounded-3xl p-12 flex items-center justify-between">
            <div className="flex items-center gap-12">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qoyWcy9dcCdxRl2YczzKsDjMmCsrtc.png"
                alt="Person working with laptop"
                width={200}
                height={200}
                className="w-auto h-auto"
              />
              <div>
                <h2 className="text-4xl font-bold mb-4">Be Effort-Free with DailyBee!</h2>
                <p className="text-xl text-gray-600">Still have some questions for us? Feel free to reach out!</p>
              </div>
            </div>
            <Button className="bg-[#4a5ced] hover:bg-[#4a5ced]/90 text-white text-lg px-8 py-3 h-auto rounded-full">
              Get Started
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-5xl font-bold text-[#1A1A1A]">Simple, transparent pricing</h1>
            <p className="text-xl text-gray-600">No contracts. No surprise fees.</p>
          </div>

          <div className="flex justify-center items-center gap-4 mb-16">
            <div className="flex justify-center items-center w-[250px] h-[44px] bg-[#FAFAFA] rounded-[50px] p-[0px_4px]">
              <div className="flex w-full h-[38px] relative">
                <div
                  className={`absolute top-0 left-0 w-1/2 h-full bg-[#4a5ced] rounded-[50px] transition-transform duration-300 ease-in-out ${
                    isMonthly ? 'translate-x-0' : 'translate-x-full'
                  }`}
                ></div>
                <button
                  onClick={() => setIsMonthly(true)}
                  className={`flex-1 z-10 font-inter text-sm leading-[140%] ${
                    isMonthly ? 'text-white' : 'text-[#1A1A1A] opacity-50'
                  }`}
                >
                  MONTHLY
                </button>
                <button
                  onClick={() => setIsMonthly(false)}
                  className={`flex-1 z-10 font-inter text-sm leading-[140%] ${
                    !isMonthly ? 'text-white' : 'text-[#1A1A1A] opacity-50'
                  }`}
                >
                  YEARLY
                </button>
              </div>
            </div>
            {!isMonthly && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600">Save 65%</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="rotate-45">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <PricingCard
              name="Base"
              price={7}
              yearlyPrice={70}
              features={baseFeatures}
            />
            <PricingCard
              name="Pro"
              price={10}
              yearlyPrice={120}
              features={proFeatures}
              isPopular={true}
            />
            <PricingCard
              name="Enterprise"
              price="Contact us"
              yearlyPrice="Contact us"
              features={enterpriseFeatures}
              isEnterprise={true}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#4a5ced] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Colors%20(4)-5DInpzlviRnAgRQJ5Db2joa4f9jLf5.png"
                  alt="Dailybee Logo"
                  width={120}
                  height={30}
                  className="h-8 w-auto"
                />
              </div>
              <p className="text-sm opacity-80">
                © 2024 Dailybee. All rights reserved.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Features</a></li>
                <li><a href="#" className="hover:underline">Pricing</a></li>
                <li><a href="#" className="hover:underline">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">About Us</a></li>
                <li><a href="#" className="hover:underline">Careers</a></li>
                <li><a href="#" className="hover:underline">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Blog</a></li>
                <li><a href="#" className="hover:underline">Help Center</a></li>
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}