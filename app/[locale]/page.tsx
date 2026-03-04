import dynamic from "next/dynamic"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Footer } from "@/components/footer"
import { FloatingSocialButtons } from "@/components/floating-social-buttons"
import { ScrollRevealInit } from "@/components/scroll-reveal-init"
import { ScrollToTop } from "@/components/scroll-to-top"
import { CursorGlow } from "@/components/cursor-glow"

const ServicePillars = dynamic(() => import("@/components/service-pillars").then(m => ({ default: m.ServicePillars })))
const AboutUsPreview = dynamic(() => import("@/components/about-us-preview").then(m => ({ default: m.AboutUsPreview })))
const CaseStudies = dynamic(() => import("@/components/case-studies").then(m => ({ default: m.CaseStudies })))
const TestimonialsSection = dynamic(() => import("@/components/testimonials-section").then(m => ({ default: m.TestimonialsSection })))
const HomeFaq = dynamic(() => import("@/components/home-faq").then(m => ({ default: m.HomeFaq })))
const FinalCTA = dynamic(() => import("@/components/final-cta").then(m => ({ default: m.FinalCTA })))
const GlobalModals = dynamic(() => import("@/components/global-modals").then(m => ({ default: m.GlobalModals })))

export default function Home() {
  return (
    <main id="main-content" className="relative min-h-screen animate-page-in">
      {/* Cosmic space background */}
      <div className="cosmic-bg" aria-hidden="true">
        <div className="cosmic-bg-base" />
        <div className="cosmic-stars" />
        <div className="cosmic-nebula-1" />
        <div className="cosmic-nebula-2" />
        <div className="cosmic-nebula-3" />
      </div>

      <ScrollRevealInit />
      <CursorGlow />

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <div className="section-divider-gradient" />
        <ServicePillars />
        <div className="section-divider-gradient" />
        <AboutUsPreview />
        <div className="section-divider-gradient" />
        <CaseStudies />
        <div className="section-divider-gradient" />
        <TestimonialsSection />
        <div className="section-divider-gradient" />
        <HomeFaq />
        <FinalCTA />
        <Footer />
      </div>
      <FloatingSocialButtons />
      <GlobalModals />
      <ScrollToTop />
    </main>
  )
}
