import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { FeaturedServicesSection } from "@/components/featured-services-section"
import { ServicesSection } from "@/components/services-section"
import { ResultsSection } from "@/components/results-section"
import { FeaturesSection } from "@/components/features-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import { BlogPreviewSection } from "@/components/blog-preview-section"
import { InstagramSection } from "@/components/instagram-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturedServicesSection />
      <ServicesSection />
      <ResultsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <BlogPreviewSection />
      <InstagramSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
