import React, { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Home,
  Wrench,
  Droplet,
  Zap,
  Wind,
  Paintbrush,
  CheckCircle,
  Users,
  Shield,
  TrendingUp,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Smartphone,
  Rocket,
  Star,
  Clock,
  IndianRupee,
  Award,
  Menu,
  X,
  Tv,
  Refrigerator,
  Flame,
  Waves,
  Sparkles,
  Settings,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner@2.0.3";

interface HapproWebsiteProps {
  whatsappNumber?: string;
}

export function HapproWebsite({
  whatsappNumber = "919876543210",
}: HapproWebsiteProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    pincode: "",
    service: "",
    message: "",
    pricingNeeded: false,
  });

  const serviceCategories = [
    {
      name: "Repair Services",
      icon: Wrench,
      gradient: "from-red-500 to-orange-500",
      services: [
        "Air Cooler Repair",
        "Home Theater Repair",
        "Microwave Oven Repair",
        "Refrigerator Repair",
        "Chimney Repair",
        "Water Dispenser Repair",
      ],
    },
    {
      name: "Installation Services",
      icon: Settings,
      gradient: "from-blue-500 to-cyan-500",
      services: [
        "TV Wall Mount Installation",
        "Home Theater Installation",
        "Electric Chimney Installation",
        "Geyser & Heater Installation",
        "Water Dispenser Installation",
        "Washing Machine Installation",
      ],
    },
    {
      name: "Service & Maintenance",
      icon: Sparkles,
      gradient: "from-green-500 to-emerald-500",
      services: [
        "Gas Geyser Service",
        "Dishwasher Service",
        "Refrigerator Service",
        "AC Service & Maintenance",
      ],
    },
  ];

  const allServices = serviceCategories.flatMap(
    (cat) => cat.services,
  );

  const howItWorks = [
    {
      step: "1",
      title: "Connect With Us",
      description:
        "Call or WhatsApp us to discuss your service needs",
      icon: MessageCircle,
      color: "from-purple-500 to-pink-500",
    },
    {
      step: "2",
      title: "Book a Service",
      description: "We'll schedule a convenient time for you",
      icon: Clock,
      color: "from-blue-500 to-cyan-500",
    },
    {
      step: "3",
      title: "Get it Done",
      description: "Our verified technician completes the work",
      icon: CheckCircle,
      color: "from-green-500 to-emerald-500",
    },
    {
      step: "4",
      title: "Pay & Review",
      description: "Secure payment and share your experience",
      icon: Star,
      color: "from-orange-500 to-yellow-500",
    },
  ];

  const whyChooseUs = [
    {
      icon: Shield,
      title: "Verified Professionals",
      description: "All technicians are background verified",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      icon: Award,
      title: "Quality Service",
      description: "Trained experts with proven track record",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Clock,
      title: "On-Time Service",
      description: "Punctual professionals, every time",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: IndianRupee,
      title: "Transparent Pricing",
      description: "No hidden charges, upfront quotes",
      gradient: "from-green-500 to-teal-500",
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const handleWhatsAppClick = () => {
    window.open(
      `https://wa.me/${whatsappNumber}?text=Hi, I'm interested in Happro services`,
      "_blank",
    );
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `New Booking Request:\nName: ${bookingForm.name}\nPhone: ${bookingForm.phone}\nPIN: ${bookingForm.pincode}\nService: ${bookingForm.service}\nMessage: ${bookingForm.message}\nPricing Needed: ${bookingForm.pricingNeeded ? "Yes" : "No"}`;
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  const handlePartnerInquiry = () => {
    window.open(
      `https://wa.me/${whatsappNumber}?text=Hi, I'm interested in becoming a Happro partner`,
      "_blank",
    );
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#22F458] to-[#1BC945] flex items-center justify-center shadow-lg shadow-[#22F458]/20">
                <Home className="w-7 h-7 text-white" />
              </div>
              <div>
                <span
                  className="text-2xl"
                  style={{ color: "#22F458" }}
                >
                  Happro
                </span>
                <p className="text-xs text-gray-600">
                  Now Serving Thiruvallur
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => scrollToSection("services")}
                className="text-gray-700 hover:text-[#22F458] transition-all hover:scale-105"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-gray-700 hover:text-[#22F458] transition-all hover:scale-105"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-gray-700 hover:text-[#22F458] transition-all hover:scale-105"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("partner")}
                className="text-gray-700 hover:text-[#22F458] transition-all hover:scale-105"
              >
                Partner
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-gray-700 hover:text-[#22F458] transition-all hover:scale-105"
              >
                Contact
              </button>
              <Button
                onClick={handleWhatsAppClick}
                className="bg-gradient-to-r from-[#22F458] to-[#1BC945] hover:shadow-lg hover:shadow-[#22F458]/30 text-gray-900 transition-all hover:scale-105"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Us
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 space-y-2 border-t border-gray-200 pt-4">
              <button
                onClick={() => scrollToSection("services")}
                className="block w-full text-left py-3 px-4 text-gray-700 hover:bg-[#22F458]/10 rounded-lg transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="block w-full text-left py-3 px-4 text-gray-700 hover:bg-[#22F458]/10 rounded-lg transition-colors"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="block w-full text-left py-3 px-4 text-gray-700 hover:bg-[#22F458]/10 rounded-lg transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("partner")}
                className="block w-full text-left py-3 px-4 text-gray-700 hover:bg-[#22F458]/10 rounded-lg transition-colors"
              >
                Partner
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left py-3 px-4 text-gray-700 hover:bg-[#22F458]/10 rounded-lg transition-colors"
              >
                Contact
              </button>
              <Button
                onClick={handleWhatsAppClick}
                className="w-full bg-gradient-to-r from-[#22F458] to-[#1BC945] text-gray-900 mt-2"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Us
              </Button>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section with Booking Form */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 md:py-20 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#22F458] rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#22F458] rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Location Badge */}
            <div className="flex justify-center mb-4">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 text-white shadow-xl">
                <MapPin className="w-4 h-4 text-[#22F458]" />
                <span>Now Serving Thiruvallur</span>
              </div>
            </div>

            {/* Main Heading */}
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-6xl text-white mb-4 leading-tight">
                Your Home Appliances,
                <span className="block bg-gradient-to-r from-[#22F458] to-[#1BC945] bg-clip-text text-transparent">
                  Fixed & Installed
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-6">
                Professional repair & installation in
                Thiruvallur. Same-day service, 100% tips to
                techs.
              </p>
            </div>

            {/* Compact Booking Form - Horizontal Layout */}
            <Card className="p-6 backdrop-blur-xl bg-white/95 border-2 border-white/20 shadow-2xl max-w-5xl mx-auto rounded-2xl mb-6">
              <form onSubmit={handleBookingSubmit}>
                <div className="grid md:grid-cols-5 gap-3 mb-3">
                  <Input
                    placeholder="Name *"
                    value={bookingForm.name}
                    onChange={(e) =>
                      setBookingForm({
                        ...bookingForm,
                        name: e.target.value,
                      })
                    }
                    required
                    className="h-11"
                  />
                  <Input
                    type="tel"
                    placeholder="Phone *"
                    value={bookingForm.phone}
                    onChange={(e) =>
                      setBookingForm({
                        ...bookingForm,
                        phone: e.target.value,
                      })
                    }
                    required
                    className="h-11"
                  />
                  <Input
                    placeholder="PIN *"
                    value={bookingForm.pincode}
                    onChange={(e) =>
                      setBookingForm({
                        ...bookingForm,
                        pincode: e.target.value,
                      })
                    }
                    required
                    className="h-11"
                  />
                  <Select
                    value={bookingForm.service}
                    onValueChange={(value) =>
                      setBookingForm({
                        ...bookingForm,
                        service: value,
                      })
                    }
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Service *" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceCategories.map(
                        (category, catIndex) => (
                          <React.Fragment key={catIndex}>
                            <div className="px-2 py-2 text-sm font-semibold text-gray-900 bg-gray-100">
                              {category.name}
                            </div>
                            {category.services.map(
                              (service, svcIndex) => (
                                <SelectItem
                                  key={`${catIndex}-${svcIndex}`}
                                  value={service}
                                >
                                  {service}
                                </SelectItem>
                              ),
                            )}
                          </React.Fragment>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  <Button
                    type="submit"
                    className="h-11 bg-gradient-to-r from-[#22F458] to-[#1BC945] hover:shadow-lg text-gray-900 transition-all hover:scale-105"
                  >
                    <ArrowRight className="w-4 h-4 mr-1" />
                    Book Now
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <Input
                    placeholder="Describe your issue (optional)"
                    value={bookingForm.message}
                    onChange={(e) =>
                      setBookingForm({
                        ...bookingForm,
                        message: e.target.value,
                      })
                    }
                    className="h-9 flex-1"
                  />
                </div>
              </form>
            </Card>

            {/* Trust Badges - Compact */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <CheckCircle className="w-4 h-4 text-[#22F458]" />
                <span>Verified Techs</span>
              </div>
              <div className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <CheckCircle className="w-4 h-4 text-[#22F458]" />
                <span>Same-Day Service</span>
              </div>
              <div className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <CheckCircle className="w-4 h-4 text-[#22F458]" />
                <span>100% Tips to Techs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Modern Cards */}
      <section
        id="services"
        className="py-24 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-[#22F458]/10 text-[#22F458] rounded-full text-sm">
                Our Services
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl text-gray-900 mb-6">
              Home Appliance Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Expert repair, installation, and maintenance for
              all your home appliances
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {serviceCategories.map((category, index) => (
              <Card
                key={index}
                className="group p-8 hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-[#22F458] rounded-2xl bg-white hover:-translate-y-2"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}
                >
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl text-gray-900 mb-6">
                  {category.name}
                </h3>
                <ul className="space-y-3">
                  {category.services.map((service, sIndex) => (
                    <li
                      key={sIndex}
                      className="flex items-start gap-3 text-gray-700 group/item hover:text-[#22F458] transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-[#22F458] mt-0.5 flex-shrink-0 group-hover/item:translate-x-1 transition-transform" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Compact Horizontal Cards */}
      <section
        id="how-it-works"
        className="py-16 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-[#22F458] rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-10 right-10 w-64 h-64 bg-purple-500 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block mb-3">
              <span className="px-4 py-1.5 bg-[#22F458]/20 text-[#22F458] rounded-full text-sm border border-[#22F458]/30">
                Simple Process
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl text-white mb-3">
              How It Works
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              From booking to completion in 4 simple steps
            </p>
          </div>

          {/* Horizontal Cards Grid */}
          <div className="grid md:grid-cols-4 gap-4 max-w-6xl mx-auto mb-8">
            {howItWorks.map((item, index) => (
              <Card
                key={index}
                className="p-6 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-2xl hover:bg-white/20 transition-all hover:scale-105 group relative"
              >
                {/* Step Number Badge */}
                <div className="absolute -top-3 -right-3">
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-xl ring-4 ring-gray-900`}
                  >
                    <span className="text-white">
                      {item.step}
                    </span>
                  </div>
                </div>

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}
                >
                  <item.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl text-white mb-2 text-center">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-300 text-center leading-relaxed">
                  {item.description}
                </p>

                {/* Arrow connector for desktop */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-5 h-5 text-[#22F458]" />
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button
              onClick={handleWhatsAppClick}
              className="bg-gradient-to-r from-[#22F458] to-[#1BC945] hover:shadow-xl hover:shadow-[#22F458]/40 text-gray-900 px-8 h-12 transition-all hover:scale-105"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Get Started Now
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Feature Grid */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-[#22F458]/10 text-[#22F458] rounded-full text-sm">
                Why Choose Us
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl text-gray-900 mb-6">
              The Happro Advantage
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to delivering the best service
              experience
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            {whyChooseUs.map((item, index) => (
              <Card
                key={index}
                className="p-8 text-center border-2 border-gray-100 hover:border-[#22F458] transition-all hover:shadow-xl rounded-2xl group hover:-translate-y-2"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg`}
                >
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>

          {/* 5-Star Guarantee Section */}
          <div className="max-w-4xl mx-auto mt-16">
            <Card className="p-10 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-3xl shadow-xl">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-2xl">
                    <Star className="w-14 h-14 text-white fill-white" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                    <h3 className="text-3xl md:text-4xl text-gray-900">
                      Top Rated
                    </h3>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="w-6 h-6 text-yellow-500 fill-yellow-500"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xl text-gray-700 leading-relaxed">
                    If we don't deserve 5 stars, let us know,
                    and we'll do everything in our power to make
                    it right.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Button
                    onClick={handleWhatsAppClick}
                    size="lg"
                    className="bg-gradient-to-r from-[#22F458] to-[#1BC945] hover:shadow-xl text-gray-900 px-8 h-14 transition-all hover:scale-105"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Share Feedback
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#22F458]/20 to-transparent rounded-3xl transform rotate-3" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1732395805034-e0bf859665e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBzZXJ2aWNlJTIwdGVjaG5pY2lhbiUyMHNtaWxpbmd8ZW58MXx8fHwxNzY0OTA2MzY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Professional service technician"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </div>
            <div className="space-y-6">
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-[#22F458]/10 text-[#22F458] rounded-full text-sm">
                  About Happro
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl text-gray-900">
                Revolutionizing Home Services in India
              </h2>
              <p className="text-xl text-gray-600">
                Happro is Thiruvallur's premier home appliance
                service marketplace, connecting homeowners with
                skilled, verified professionals.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-[#22F458]/10 to-transparent rounded-xl">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#22F458] to-[#1BC945] flex items-center justify-center flex-shrink-0">
                    <IndianRupee className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 mb-1">
                      100% Tips to Technicians
                    </h4>
                    <p className="text-gray-600">
                      No platform cut - every rupee goes to your
                      technician
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-500/10 to-transparent rounded-xl">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 mb-1">
                      Local Focus - Thiruvallur
                    </h4>
                    <p className="text-gray-600">
                      Dedicated service coverage across
                      Thiruvallur area
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-500/10 to-transparent rounded-xl">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 mb-1">
                      India-First Platform
                    </h4>
                    <p className="text-gray-600">
                      Built specifically for Indian homes and
                      service needs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Partner Section */}
      <section
        id="partner"
        className="py-28 bg-gradient-to-br from-[#22F458] via-[#1BC945] to-[#16A83A] relative overflow-hidden"
      >
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-20 right-20 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Hero-style Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-2 mb-6">
                <Users className="w-4 h-4 text-gray-900" />
                <span className="text-gray-900 text-sm font-medium">
                  Join Our Network
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Grow Your Business
                <span className="block text-white mt-2">
                  With Happro
                </span>
              </h2>
              <p className="text-lg md:text-xl text-gray-800 max-w-2xl mx-auto">
                Join hundreds of skilled professionals earning
                more, working smarter, and building their
                reputation
              </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              {/* Left Side - 100% Tips Feature */}
              <div className="space-y-8">
                {/* Big 100% Tips Card */}
                <Card className="p-8 bg-white border-0 shadow-2xl rounded-3xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#22F458] to-[#1BC945] flex items-center justify-center shadow-xl">
                      <IndianRupee className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-gray-900">
                        100%
                      </div>
                      <div className="text-lg text-gray-700 font-medium">
                        Tips to You
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-[#22F458]/10 to-transparent p-5 rounded-xl border-l-4 border-[#22F458]">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      <strong className="font-semibold">
                        We don't take a single rupee from your
                        tips.
                      </strong>{" "}
                      Every tip goes directly to you. Build
                      customer relationships and increase your
                      earnings without any platform commission.
                    </p>
                  </div>
                </Card>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-6">
                  <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-xl text-center">
                    <div className="text-4xl font-bold text-[#22F458] mb-3">
                      500+
                    </div>
                    <div className="text-sm text-gray-700 font-medium">
                      Active Partners
                    </div>
                  </Card>
                  <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-xl text-center">
                    <div className="text-4xl font-bold text-[#22F458] mb-3">
                      1000+
                    </div>
                    <div className="text-sm text-gray-700 font-medium">
                      Jobs Monthly
                    </div>
                  </Card>
                </div>
              </div>

              {/* Right Side - Image */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl transform rotate-3" />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1745847768380-2caeadbb3b71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kc2hha2UlMjBwYXJ0bmVyc2hpcCUyMGJ1c2luZXNzfGVufDF8fHx8MTc2NDkwNjcyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Partnership handshake"
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <Card className="p-8 bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl hover:scale-105 transition-all group">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  More Customers
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Get connected to thousands of customers
                  looking for services in Thiruvallur
                </p>
              </Card>

              <Card className="p-8 bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl hover:scale-105 transition-all group">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Trust Badge
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Get verified status and build customer
                  confidence in your services
                </p>
              </Card>

              <Card className="p-8 bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl hover:scale-105 transition-all group">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Partner App
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Manage all your bookings, earnings, and
                  schedules in one place
                </p>
              </Card>

              <Card className="p-8 bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-2xl hover:scale-105 transition-all group">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Build Reputation
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Earn reviews and ratings to grow your
                  professional brand
                </p>
              </Card>
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <Card className="inline-block p-10 bg-white border-0 shadow-2xl rounded-3xl">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Ready to Join?
                </h3>
                <p className="text-gray-700 text-lg mb-10 max-w-md mx-auto leading-relaxed">
                  Start your partnership journey with Happro
                  today and unlock new opportunities
                </p>
                <Button
                  size="lg"
                  onClick={handlePartnerInquiry}
                  className="bg-gradient-to-r from-[#22F458] to-[#1BC945] hover:shadow-2xl hover:shadow-[#22F458]/40 text-gray-900 text-xl px-12 h-14 transition-all hover:scale-105 font-semibold"
                >
                  <MessageCircle className="w-6 h-6 mr-2" />
                  Inquire on WhatsApp
                </Button>
                <p className="text-sm text-gray-600 mt-5">
                  Quick response in 24 hours
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-[#22F458] rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-20 right-20 w-96 h-96 bg-[#22F458] rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-[#22F458]/20 text-[#22F458] rounded-full text-sm border border-[#22F458]/30">
                  Get in Touch
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                We're Here to Help
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Connect with us through your preferred channel.
                We're always ready to assist you.
              </p>
            </div>

            {/* Main Contact Grid */}
            <div className="grid lg:grid-cols-3 gap-12 mb-16">
              {/* Contact Cards */}
              <Card className="p-10 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl hover:bg-white/20 transition-all hover:scale-105 group">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform shadow-2xl">
                    <Phone className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    Call Us
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Available 24/7 for emergencies
                  </p>
                  <a
                    href="tel:+919876543210"
                    className="text-[#22F458] hover:text-[#1BC945] text-xl font-medium transition-colors"
                  >
                    +91 98765 43210
                  </a>
                </div>
              </Card>

              <Card className="p-10 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl hover:bg-white/20 transition-all hover:scale-105 group">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform shadow-2xl">
                    <Mail className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    Email Us
                  </h3>
                  <p className="text-gray-300 mb-6">
                    We'll respond within 24 hours
                  </p>
                  <a
                    href="mailto:hello@happro.in"
                    className="text-[#22F458] hover:text-[#1BC945] text-xl font-medium transition-colors"
                  >
                    hello@happro.in
                  </a>
                </div>
              </Card>

              <Card className="p-10 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl hover:bg-white/20 transition-all hover:scale-105 group">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform shadow-2xl">
                    <MessageCircle className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    WhatsApp
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Instant messaging support
                  </p>
                  <button
                    onClick={handleWhatsAppClick}
                    className="text-[#22F458] hover:text-[#1BC945] text-xl font-medium transition-colors"
                  >
                    Chat with us now →
                  </button>
                </div>
              </Card>
            </div>

            {/* Location & CTA Section */}
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Location Card */}
              <Card className="p-8 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-xl">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Visit Our Office
                    </h3>
                    <p className="text-gray-300 text-base leading-relaxed mb-4">
                      Kakkalur Industrial Area,
                      <br />
                      Tiruvallur-602003,
                      <br />
                      Tamil Nadu, India
                    </p>
                    <div className="flex items-center gap-2 text-[#22F458]">
                      <Clock className="w-5 h-5" />
                      <span className="text-gray-300 text-sm">
                        Mon - Sat: 9:00 AM - 7:00 PM
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* WhatsApp CTA Card */}
              <Card className="p-8 bg-gradient-to-br from-[#22F458] to-[#1BC945] border-0 shadow-2xl rounded-3xl">
                <div className="text-center h-full flex flex-col justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
                    <MessageCircle className="w-10 h-10 text-gray-900" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Need Immediate Help?
                  </h3>
                  <p className="text-gray-800 text-base mb-6 leading-relaxed">
                    Get instant support on WhatsApp. Our team is
                    ready to assist you!
                  </p>
                  <Button
                    onClick={handleWhatsAppClick}
                    size="lg"
                    className="bg-gray-900 hover:bg-gray-800 text-white h-12 px-8 text-base shadow-xl hover:scale-105 transition-all mx-auto font-semibold"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Start WhatsApp Chat
                  </Button>
                </div>
              </Card>
            </div>

            {/* Social Proof / Stats */}
            <div className="grid md:grid-cols-3 gap-12 mt-12">
              <Card className="p-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-center">
                <div className="text-3xl font-bold text-[#22F458] mb-2">
                  24/7
                </div>
                <div className="text-gray-300 text-sm">
                  Support Available
                </div>
              </Card>
              <Card className="p-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-center">
                <div className="text-3xl font-bold text-[#22F458] mb-2">
                  &lt; 2 hrs
                </div>
                <div className="text-gray-300 text-sm">
                  Average Response
                </div>
              </Card>
              <Card className="p-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-center">
                <div className="text-3xl font-bold text-[#22F458] mb-2">
                  100%
                </div>
                <div className="text-gray-300 text-sm">
                  Customer Satisfaction
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App Coming Soon */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 bg-[#22F458] rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-8">
              <Rocket className="w-6 h-6 text-[#22F458]" />
              <span className="text-white text-lg">
                Coming Soon
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl text-white mb-8 leading-tight">
              The Happro Mobile App is Almost Here! 🚀
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
              We're crafting an amazing mobile app experience
              for both Android & iOS. Book services, track
              technicians in real-time, and manage everything
              from your phone!
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="p-6 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl hover:bg-white/20 transition-all">
                <Smartphone className="w-14 h-14 text-[#22F458] mx-auto mb-4" />
                <h3 className="text-xl text-white mb-2">
                  Android & iOS
                </h3>
                <p className="text-gray-300">
                  Launching for both platforms soon
                </p>
              </Card>
              <Card className="p-6 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl hover:bg-white/20 transition-all">
                <Star className="w-14 h-14 text-[#22F458] mx-auto mb-4" />
                <h3 className="text-xl text-white mb-2">
                  Seamless Booking
                </h3>
                <p className="text-gray-300">
                  Book services in under 60 seconds
                </p>
              </Card>
              <Card className="p-6 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl hover:bg-white/20 transition-all">
                <MapPin className="w-14 h-14 text-[#22F458] mx-auto mb-4" />
                <h3 className="text-xl text-white mb-2">
                  Live Tracking
                </h3>
                <p className="text-gray-300">
                  Know exactly when your tech arrives
                </p>
              </Card>
            </div>
            <div className="bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-10 max-w-md mx-auto">
              <p className="text-2xl text-white mb-6">
                In the meantime, reach us on WhatsApp!
              </p>
              <Button
                onClick={handleWhatsAppClick}
                className="w-full bg-gradient-to-r from-[#22F458] to-[#1BC945] hover:shadow-2xl hover:shadow-[#22F458]/30 text-gray-900 h-16 text-xl transition-all hover:scale-105"
              >
                <MessageCircle className="w-6 h-6 mr-3" />
                Book via WhatsApp Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#22F458] to-[#1BC945] flex items-center justify-center shadow-lg">
                  <Home className="w-7 h-7 text-white" />
                </div>
                <div>
                  <span
                    className="text-2xl"
                    style={{ color: "#22F458" }}
                  >
                    Happro
                  </span>
                  <p className="text-xs text-gray-400">
                    Now Serving Thiruvallur
                  </p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Thiruvallur's trusted home appliance service
                marketplace
              </p>
            </div>
            <div>
              <h4 className="text-white mb-6 text-lg">
                Quick Links
              </h4>
              <div className="space-y-3">
                <button
                  onClick={() => scrollToSection("services")}
                  className="block text-gray-400 hover:text-[#22F458] transition-colors"
                >
                  Services
                </button>
                <button
                  onClick={() =>
                    scrollToSection("how-it-works")
                  }
                  className="block text-gray-400 hover:text-[#22F458] transition-colors"
                >
                  How It Works
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="block text-gray-400 hover:text-[#22F458] transition-colors"
                >
                  About Us
                </button>
              </div>
            </div>
            <div>
              <h4 className="text-white mb-6 text-lg">
                For Partners
              </h4>
              <div className="space-y-3">
                <button
                  onClick={() => scrollToSection("partner")}
                  className="block text-gray-400 hover:text-[#22F458] transition-colors"
                >
                  Become a Partner
                </button>
                <button
                  onClick={handlePartnerInquiry}
                  className="block text-gray-400 hover:text-[#22F458] transition-colors"
                >
                  Partner Benefits
                </button>
                <p className="text-[#22F458] text-sm">
                  100% Tips to Techs
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-white mb-6 text-lg">
                Contact Us
              </h4>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#22F458] mt-1 flex-shrink-0" />
                  <p className="leading-relaxed">
                    Kakkalur Industrial Area,
                    <br />
                    Tiruvallur-602003,
                    <br />
                    Tamil Nadu, India
                  </p>
                </div>
                <p className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#22F458]" />
                  +91 98765 43210
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#22F458]" />
                  hello@happro.in
                </p>
                <button
                  onClick={handleWhatsAppClick}
                  className="flex items-center gap-3 text-[#22F458] hover:text-[#1BC945] transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Us
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Happro. All
              rights reserved. Proudly serving Thiruvallur.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-r from-[#25D366] to-[#20BA5A] hover:shadow-2xl hover:shadow-green-500/50 text-white flex items-center justify-center z-50 transition-all hover:scale-110 animate-pulse"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
      </button>
    </div>
  );
}