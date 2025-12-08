import React, { useState } from 'react';
import { Download, Check, Users, Shield, Zap, Clock, Star, Heart, MapPin, LogIn, CheckCircle, IndianRupee, Instagram, Youtube, Facebook, Linkedin, Menu, X as XIcon } from 'lucide-react';
import { Logo } from './brand/Logo';
import { Button } from './ui/button';
import { MobileAppMockup } from './ui/mobile-app-mockup';
import { CustomerAppPreview } from './landing/CustomerAppPreview';
import { PartnerAppPreview } from './landing/PartnerAppPreview';
import { ImageWithFallback } from './figma/ImageWithFallback';
import multiPhoneHero from 'figma:asset/658c2a5598110c5c0a30a028e83169e29a8d95c6.png';

interface LandingPageProps {
  onNavigateToApps?: () => void;
}

export function LandingPage({ onNavigateToApps }: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <nav className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Logo size={36} />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-sm hover:text-primary transition-colors">Services</a>
              <a href="#how-it-works" className="text-sm hover:text-primary transition-colors">How It Works</a>
              <a href="#about" className="text-sm hover:text-primary transition-colors">About</a>
              <a href="#contact" className="text-sm hover:text-primary transition-colors">Contact</a>
              <a href="#partner" className="text-sm hover:text-primary transition-colors">Become a Partner</a>
            </div>

            <div className="flex items-center gap-4">
              {onNavigateToApps && (
                <Button 
                  variant="outline" 
                  onClick={onNavigateToApps}
                  className="gap-2 hidden md:flex"
                >
                  <LogIn className="w-4 h-4" />
                  Access Apps
                </Button>
              )}
              
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <XIcon className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pt-4 pb-2 space-y-3 border-t border-border mt-4">
              <a href="#services" className="block text-sm hover:text-primary transition-colors">Services</a>
              <a href="#how-it-works" className="block text-sm hover:text-primary transition-colors">How It Works</a>
              <a href="#about" className="block text-sm hover:text-primary transition-colors">About</a>
              <a href="#contact" className="block text-sm hover:text-primary transition-colors">Contact</a>
              <a href="#partner" className="block text-sm hover:text-primary transition-colors">Become a Partner</a>
              {onNavigateToApps && (
                <Button 
                  variant="outline" 
                  onClick={onNavigateToApps}
                  className="gap-2 w-full"
                >
                  <LogIn className="w-4 h-4" />
                  Access Apps
                </Button>
              )}
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Collage */}
        <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 gap-0">
          <div className="relative h-full">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1649949895070-7b6dd3b07cd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwYXBwbGlhbmNlcyUyMGtpdGNoZW4lMjByZXBhaXJ8ZW58MXx8fHwxNzU5OTc4OTkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Home appliances"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative h-full">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1758488438758-5e2eedf769ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwYXBwbGlhbmNlcyUyMHJlZnJpZ2VyYXRvcnxlbnwxfHx8fDE3NjAwMjI0ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Kitchen appliances"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative h-full">
            <ImageWithFallback 
              src="https://images.unsplash.com/flagged/photo-1585772311853-3c823ba89097?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXIlMjBjb25kaXRpb25pbmclMjBpbnN0YWxsYXRpb24lMjBob21lfGVufDF8fHx8MTc1OTk3ODk5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="AC installation"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative h-full">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1686998424100-bdfb15c0079c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBQyUyMHNlcnZpY2UlMjBmb2FtJTIwY2xlYW5pbmd8ZW58MXx8fHwxNzYwMDIyNDgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="AC foam cleaning service"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
        
        <div className="relative container mx-auto px-4 lg:px-8 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-6 lg:space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight text-white">
                  Home Services Made
                  <span className="block text-primary">Simple & Reliable</span>
                </h1>
                <p className="text-lg md:text-xl text-white/90 max-w-xl mx-auto lg:mx-0">
                  Book trusted home service professionals in minutes. From plumbing to cleaning, we've got you covered across India.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-primary hover:bg-primary/90 gap-2 text-lg px-8 py-6">
                  <Download className="w-5 h-5" />
                  Download for Android
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 border-white/30 text-white hover:bg-white/20">
                  Learn More
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 text-sm text-white">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>50K+ Customers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary fill-primary" />
                  <span>4.8 Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>200+ Cities</span>
                </div>
              </div>
            </div>

            {/* Right - Multi-Phone Hero Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-xl">
                <img 
                  src={multiPhoneHero} 
                  alt="Happro mobile apps" 
                  className="w-full h-auto drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl mb-4">Why Choose Happro?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the best home services platform designed for India
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl">Verified Professionals</h3>
              <p className="text-muted-foreground">
                Every service partner is background verified and trained
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <IndianRupee className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl">Transparent Pricing</h3>
              <p className="text-muted-foreground">
                Clear upfront pricing with no hidden charges
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl">On-Time Service</h3>
              <p className="text-muted-foreground">
                Real-time tracking and guaranteed on-time arrival
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl">100% Tips to Technicians</h3>
              <p className="text-muted-foreground">
                Your tips go directly to service providers, no platform cut
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer App Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center order-2 lg:order-1">
              <MobileAppMockup screenshot={<CustomerAppPreview />} />
            </div>

            <div className="space-y-6 order-1 lg:order-2">
              <div className="space-y-4">
                <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
                  <span className="text-sm font-medium text-primary">FOR CUSTOMERS</span>
                </div>
                <h2 className="text-3xl md:text-4xl">
                  Book Services in Minutes
                </h2>
                <p className="text-lg text-muted-foreground">
                  Download the Happro app to access 50+ home services. Book instantly, track in real-time, and pay securely.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="mb-1">Wide Range of Services</h4>
                    <p className="text-sm text-muted-foreground">
                      Plumbing, electrical, cleaning, AC repair, pest control, and more
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="mb-1">Instant Booking</h4>
                    <p className="text-sm text-muted-foreground">
                      Select service, choose slot, and book in under 60 seconds
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="mb-1">Flexible Payment Options</h4>
                    <p className="text-sm text-muted-foreground">
                      Pay online, cash on delivery, or choose pay later options
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 gap-2">
                  <Download className="w-5 h-5" />
                  Get Customer App
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner App Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
                  <span className="text-sm font-medium text-primary">FOR PARTNERS</span>
                </div>
                <h2 className="text-3xl md:text-4xl">
                  Grow Your Business with Happro
                </h2>
                <p className="text-lg text-muted-foreground">
                  Join thousands of service professionals and businesses earning more with our partner platform.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="mb-1">More Customers, More Revenue</h4>
                    <p className="text-sm text-muted-foreground">
                      Access thousands of customers actively looking for your services
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="mb-1">Easy Business Management</h4>
                    <p className="text-sm text-muted-foreground">
                      Manage bookings, team, schedules, and earnings from one app
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="mb-1">Quick Payouts</h4>
                    <p className="text-sm text-muted-foreground">
                      Get paid fast with automated payouts directly to your bank
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 gap-2">
                  <Users className="w-5 h-5" />
                  Join as Partner
                </Button>
              </div>
            </div>

            <div className="flex justify-center">
              <MobileAppMockup screenshot={<PartnerAppPreview />} />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-primary text-primary-foreground py-12 md:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl mb-2">50K+</div>
              <div className="text-sm md:text-base opacity-90">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl mb-2">5K+</div>
              <div className="text-sm md:text-base opacity-90">Service Partners</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl mb-2">100K+</div>
              <div className="text-sm md:text-base opacity-90">Services Completed</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl mb-2">200+</div>
              <div className="text-sm md:text-base opacity-90">Cities Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl">
                Ready to Get Started?
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                Download the Happro app for Android and experience hassle-free home services
              </p>
              <p className="text-sm text-muted-foreground">
                iOS app coming in 2026
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 gap-2 text-lg px-8 py-6">
                <Download className="w-5 h-5" />
                Download for Android
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary border-t border-border py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <Logo size={32} />
              <p className="text-sm text-muted-foreground">
                India's most trusted home services marketplace. Quality service at your doorstep.
              </p>
              
              {/* Social Media Links */}
              <div className="flex items-center gap-4 pt-2">
                <a 
                  href="https://instagram.com/happro" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-background hover:bg-primary/10 flex items-center justify-center transition-colors group"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
                <a 
                  href="https://x.com/happro" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-background hover:bg-primary/10 flex items-center justify-center transition-colors group"
                  aria-label="X (formerly Twitter)"
                >
                  <svg 
                    viewBox="0 0 24 24" 
                    className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors fill-current"
                    aria-hidden="true"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a 
                  href="https://youtube.com/@happro" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-background hover:bg-primary/10 flex items-center justify-center transition-colors group"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
                <a 
                  href="https://facebook.com/happro" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-background hover:bg-primary/10 flex items-center justify-center transition-colors group"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
                <a 
                  href="https://linkedin.com/company/happro" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-background hover:bg-primary/10 flex items-center justify-center transition-colors group"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Plumbing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Electrical</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">AC Repair</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Home Cleaning</a></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Refund Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Happro. All rights reserved. Made with ❤️ for India.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
