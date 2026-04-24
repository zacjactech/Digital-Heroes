import {
  Navbar,
  HeroSection,
  HowItWorks,
  PrizeTiers,
  CharitySpotlight,
  DrawCountdown,
  FinalCTA,
  Footer,
} from '@/components/landing'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorks />
        <PrizeTiers />
        <CharitySpotlight />
        <DrawCountdown />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}

